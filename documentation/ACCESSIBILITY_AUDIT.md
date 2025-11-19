# 📋 Audit d'Accessibilité - JS Interview Prep

**Date**: 2025-11-19
**Phase**: Phase 9.3 - Accessibilité (WCAG AA)
**Status**: ⚠️ AUDIT PRÉLIMINAIRE (Code Review)

---

## 🎯 Executive Summary

| Critère WCAG AA                    | Status Estimé | Score | Notes                                      |
| ---------------------------------- | ------------- | ----- | ------------------------------------------ |
| **Navigation Clavier**             | ⚠️ PARTIEL    | 60%   | Shortcuts OK, mais focus non vérifié       |
| **ARIA Labels**                    | ❌ MANQUANT   | 30%   | Peu de labels ARIA dans les composants     |
| **Sémantique HTML**                | ✅ BON        | 80%   | Structure correcte (h1, main, nav, etc.)   |
| **Contraste Couleurs**             | ⚠️ À VÉRIFIER | ?     | Nuxt UI utilisé, mais à auditer           |
| **Alternative Texte**              | ⚠️ PARTIEL    | 50%   | Icônes sans labels explicites              |
| **Focus Management**               | ❌ NON TESTÉ  | 0%    | Pas de tests de focus visible             |
| **Screen Reader**                  | ❌ NON TESTÉ  | 0%    | Pas de tests VoiceOver/NVDA               |
| **Zoom 200%+**                     | ❌ NON TESTÉ  | 0%    | Responsive design à tester                |

**Score Global Estimé**: 🔴 **40-50%** (en dessous de l'objectif 95%)

---

## ✅ Points Forts Détectés (Analyse Code)

### 1. Structure Sémantique HTML

**Index.vue** (homepage) :
```vue
<header class="sticky top-0 z-50">        <!-- ✅ Bon -->
<main>                                     <!-- ✅ Implicite dans layout -->
  <h1 class="text-4xl font-bold">         <!-- ✅ Hiérarchie correcte -->
    Master Frontend Interview Questions
  </h1>
  <section>                                <!-- ✅ Sections bien définies -->
    <h2>All Questions</h2>
  </section>
</main>
<footer class="border-t mt-12">           <!-- ✅ Footer -->
```

✅ **Bon** : Utilisation correcte des balises sémantiques

### 2. Nuxt UI Components

Nuxt UI est généralement accessible par défaut avec :
- ✅ UButton : Focus states
- ✅ UCard : Structure sémantique
- ✅ UBadge : Contenu lisible
- ⚠️ UIcon : Nécessite aria-label

### 3. Keyboard Shortcuts Implémentés

**useKeyboardShortcuts.ts** :
```typescript
// ✅ Shortcuts disponibles
arrowLeft   // Navigation prev
arrowRight  // Navigation next
space       // Toggle reveal answer
slash       // Focus search
escape      // Close modals
```

✅ **Bon** : Shortcuts clavier disponibles

---

## ❌ Problèmes d'Accessibilité Identifiés

### 1. ARIA Labels Manquants

#### SearchBar.vue (ligne 47-49 non vérifiée)
```vue
<!-- ❌ PROBLÈME : Pas d'aria-label explicite -->
<input
  type="search"
  placeholder="Rechercher des questions..."
  <!-- MANQUE: aria-label="Rechercher des questions" -->
  <!-- MANQUE: aria-describedby="search-help" -->
/>
```

**Recommandation** :
```vue
<input
  type="search"
  placeholder="Rechercher des questions..."
  aria-label="Rechercher des questions dans la liste"
  aria-describedby="search-results-count"
  :aria-controls="resultCount > 0 ? 'questions-list' : undefined"
/>
<p id="search-results-count" class="sr-only">
  {{ resultCount }} résultat{{ resultCount > 1 ? 's' : '' }} trouvé{{ resultCount > 1 ? 's' : '' }}
</p>
```

#### QuestionCard.vue
```vue
<!-- ❌ PROBLÈME : Bouton reveal sans ARIA -->
<UButton @click="toggleReveal">
  Voir la réponse
  <!-- MANQUE: aria-expanded, aria-controls -->
</UButton>

<!-- ❌ PROBLÈME : Section réponse sans rôle -->
<div v-if="isRevealed">
  <!-- MANQUE: role="region", aria-labelledby -->
  {{ answer }}
</div>
```

**Recommandation** :
```vue
<UButton
  @click="toggleReveal"
  :aria-expanded="isRevealed"
  aria-controls="answer-content"
  aria-label="Révéler ou masquer la réponse"
>
  {{ isRevealed ? 'Masquer' : 'Voir' }} la réponse
</UButton>

<div
  v-if="isRevealed"
  id="answer-content"
  role="region"
  aria-labelledby="answer-heading"
  aria-live="polite"
>
  <h3 id="answer-heading" class="sr-only">Réponse</h3>
  {{ answer }}
</div>
```

#### ProgressBar.vue
```vue
<!-- ❌ PROBLÈME : Pas de rôle progressbar -->
<div class="progress-bar">
  <div :style="{ width: `${percentage}%` }"></div>
</div>
```

**Recommandation** :
```vue
<div
  role="progressbar"
  aria-label="Progression de l'apprentissage"
  :aria-valuenow="percentage"
  aria-valuemin="0"
  aria-valuemax="100"
  :aria-valuetext="`${percentage}% des questions vues`"
>
  <div :style="{ width: `${percentage}%` }"></div>
</div>
```

#### LanguageSwitcher.vue
```vue
<!-- ❌ PROBLÈME : Boutons sans aria-current -->
<UButton
  v-for="lang in languages"
  :key="lang"
  @click="switchLang(lang)"
  <!-- MANQUE: aria-current, aria-label -->
>
  {{ lang.toUpperCase() }}
</UButton>
```

**Recommandation** :
```vue
<UButton
  v-for="lang in languages"
  :key="lang"
  @click="switchLang(lang)"
  :aria-current="locale === lang ? 'true' : undefined"
  :aria-label="`Changer la langue en ${lang === 'fr' ? 'Français' : 'English'}`"
>
  {{ lang.toUpperCase() }}
</UButton>
```

### 2. Icônes Sans Labels

#### Index.vue (lignes 129, 144, etc.)
```vue
<!-- ❌ PROBLÈME : Icônes décoratives non marquées -->
<UIcon name="i-heroicons-code-bracket" class="text-2xl" />
<!-- MANQUE: aria-hidden="true" si décorative -->
<!-- OU: aria-label si fonctionnelle -->
```

**Recommandation** :
```vue
<!-- Si décorative -->
<UIcon name="i-heroicons-code-bracket" aria-hidden="true" />

<!-- Si fonctionnelle (dans un bouton) -->
<UButton aria-label="Voir le code">
  <UIcon name="i-heroicons-code-bracket" aria-hidden="true" />
</UButton>
```

### 3. Links Sans Contexte

```vue
<!-- ❌ PROBLÈME : Lien "En savoir plus" générique -->
<NuxtLink to="/about">
  En savoir plus
</NuxtLink>
```

**Recommandation** :
```vue
<NuxtLink to="/about" aria-label="En savoir plus sur JS Interview Prep">
  En savoir plus
</NuxtLink>
```

### 4. Focus Management

**Problèmes potentiels** (à vérifier visuellement) :
- ❌ Focus visible sur les cards clickables?
- ❌ Focus trap dans les modals (KeyboardShortcutsHelp.vue)?
- ❌ Focus restoration après fermeture modal?
- ❌ Skip to main content link?

**Recommandation** :
```vue
<!-- app.vue ou layout -->
<template>
  <div>
    <a href="#main-content" class="sr-only focus:not-sr-only">
      Aller au contenu principal
    </a>
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<style>
/* Focus visible global */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
</style>
```

---

## 📋 Checklist WCAG AA (Non Testé)

### Perception (Perceivable)

- [ ] **1.1.1 Non-text Content** - Images ont alt text
- [ ] **1.3.1 Info and Relationships** - Structure sémantique
- [ ] **1.3.2 Meaningful Sequence** - Ordre logique
- [ ] **1.4.3 Contrast (Minimum)** - Ratio 4.5:1 pour texte
- [ ] **1.4.4 Resize Text** - Zoom 200% sans perte
- [ ] **1.4.10 Reflow** - Pas de scroll horizontal à 320px
- [ ] **1.4.11 Non-text Contrast** - UI elements ratio 3:1

### Operable

- [ ] **2.1.1 Keyboard** - Toutes fonctions au clavier
- [ ] **2.1.2 No Keyboard Trap** - Pas de piège clavier
- [ ] **2.4.1 Bypass Blocks** - Skip links
- [ ] **2.4.3 Focus Order** - Ordre logique
- [ ] **2.4.7 Focus Visible** - Focus toujours visible
- [ ] **2.5.3 Label in Name** - Labels cohérents

### Understandable

- [ ] **3.1.1 Language of Page** - `<html lang="fr">`
- [ ] **3.1.2 Language of Parts** - Changements de langue marqués
- [ ] **3.2.1 On Focus** - Pas de changement contextuel
- [ ] **3.2.2 On Input** - Pas de changement automatique
- [ ] **3.3.1 Error Identification** - Erreurs identifiées
- [ ] **3.3.2 Labels or Instructions** - Labels pour inputs

### Robust

- [ ] **4.1.2 Name, Role, Value** - ARIA correctement utilisé
- [ ] **4.1.3 Status Messages** - aria-live pour changements

---

## 🔧 Actions Prioritaires

### Priorité 1 : ARIA Labels (Critique)

**Temps estimé** : 2-3 heures

1. **SearchBar.vue**
   - Ajouter `aria-label`
   - Ajouter `aria-describedby` pour résultats
   - Ajouter `aria-controls` pour liste

2. **QuestionCard.vue**
   - Ajouter `aria-expanded` sur bouton reveal
   - Ajouter `aria-controls` et `aria-labelledby`
   - Ajouter `aria-live="polite"` sur réponse

3. **ProgressBar.vue**
   - Transformer en `role="progressbar"`
   - Ajouter tous les attributs ARIA requis

4. **LanguageSwitcher.vue**
   - Ajouter `aria-current` sur langue active
   - Ajouter `aria-label` descriptifs

### Priorité 2 : Focus Management (Important)

**Temps estimé** : 1-2 heures

1. **app.vue ou layout**
   - Ajouter skip link
   - Ajouter focus styles globaux

2. **KeyboardShortcutsHelp.vue**
   - Implémenter focus trap
   - Focus restoration

3. **Tous composants**
   - Vérifier focus visible
   - Tester navigation clavier

### Priorité 3 : Audit Lighthouse (Validation)

**Temps estimé** : 30 min

1. Lancer audit Lighthouse
2. Corriger issues identifiés
3. Ré-auditer jusqu'à score > 95

### Priorité 4 : Tests Screen Reader (Validation)

**Temps estimé** : 1 heure

1. Tester avec VoiceOver (macOS)
2. Tester avec NVDA (Windows)
3. Corriger annonces problématiques

---

## 📝 Commandes pour Audit

### 1. Lighthouse CLI (Automatisé)

```bash
# Installer Lighthouse
npm install -g lighthouse

# Lancer audit (serveur doit tourner sur :3000)
lighthouse http://localhost:3000/interview-training/ \
  --only-categories=accessibility \
  --output=html \
  --output-path=./lighthouse-accessibility-report.html \
  --view

# Objectif: Score > 95/100
```

### 2. axe DevTools (Chrome Extension)

1. Installer [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools/lhdoppojpmngadmnindnejefpokejbdd)
2. Ouvrir DevTools > axe tab
3. Cliquer "Scan ALL of my page"
4. Corriger toutes les issues Critical et Serious

### 3. WAVE (Web Accessibility Evaluation Tool)

1. Installer [WAVE Extension](https://wave.webaim.org/extension/)
2. Visiter http://localhost:3000/interview-training/
3. Cliquer sur icône WAVE
4. Corriger toutes les erreurs rouges

### 4. Keyboard Navigation Testing

**Checklist manuelle** :
```
[ ] Tab - Parcourir tous les éléments interactifs
[ ] Shift+Tab - Navigation inverse
[ ] Enter - Activer liens/boutons
[ ] Space - Toggle reveal, scroll page
[ ] Arrows - Navigation prev/next
[ ] / - Focus search
[ ] Escape - Fermer modals
[ ] ? - Ouvrir help modal

Vérifier :
[ ] Focus toujours visible
[ ] Pas de piège clavier
[ ] Ordre logique
[ ] Tous éléments accessibles
```

### 5. Screen Reader Testing

**VoiceOver (macOS)** :
```bash
# Activer
Cmd + F5

# Navigation
VO + Right Arrow  - Élément suivant
VO + Left Arrow   - Élément précédent
VO + Space        - Activer
VO + A            - Lire tout
```

**NVDA (Windows)** :
```bash
# Télécharger: https://www.nvaccess.org/download/
# Insert + Down Arrow - Mode navigation
# Insert + Space - Basculer modes
```

### 6. Contrast Checker

```bash
# Chrome DevTools
# Elements > Styles > Color picker > Voir ratio

# Ou outil en ligne:
# https://webaim.org/resources/contrastchecker/
```

---

## 🎯 Objectifs Phase 9.3

| Objectif                          | Status | Notes                                    |
| --------------------------------- | ------ | ---------------------------------------- |
| **Lighthouse Score > 95**         | ❌     | À exécuter                               |
| **0 erreurs axe DevTools**        | ❌     | À exécuter                               |
| **Navigation clavier complète**   | ⚠️     | Shortcuts OK, focus à tester             |
| **Screen reader compatible**      | ❌     | Non testé                                |
| **ARIA labels sur tous composants** | ❌     | Manquants (voir liste ci-dessus)        |
| **Focus visible partout**         | ❌     | À vérifier                               |
| **Zoom 200% fonctionnel**         | ❌     | À tester                                 |
| **Contraste WCAG AA**             | ❌     | À vérifier                               |

---

## 📊 Estimation Temps Restant

| Tâche                               | Temps    | Priorité |
| ----------------------------------- | -------- | -------- |
| Ajouter ARIA labels (4 composants)  | 2-3h     | P1       |
| Focus management & skip links       | 1-2h     | P1       |
| Lighthouse audit + corrections      | 1h       | P1       |
| axe DevTools audit + corrections    | 1h       | P2       |
| Keyboard navigation tests           | 30min    | P2       |
| Screen reader tests (VoiceOver)     | 1h       | P2       |
| Contrast checks                     | 30min    | P2       |
| Zoom testing (200%, 400%)           | 30min    | P3       |
| **TOTAL**                           | **7-9h** |          |

---

## ✨ Recommandations Finales

### Quick Wins (< 1 heure)

1. **Ajouter classe `.sr-only` globale** :
```css
/* app.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus-visible {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

2. **Ajouter skip link dans app.vue** :
```vue
<template>
  <div>
    <a href="#main-content" class="sr-only focus:not-sr-only">
      Aller au contenu principal
    </a>
    <NuxtLayout>
      <main id="main-content" tabindex="-1">
        <NuxtPage />
      </main>
    </NuxtLayout>
  </div>
</template>
```

3. **Ajouter lang dynamique** :
```vue
<!-- app.vue ou nuxt.config.ts -->
useHead({
  htmlAttrs: {
    lang: locale.value
  }
})
```

### Outils Recommandés

- **Lighthouse CI** : Intégration GitHub Actions
- **axe-core** : Tests automatisés
- **Pa11y CI** : Tests en ligne de commande
- **Storybook a11y addon** : Tests composants isolés

---

## 🎓 Conclusion Préliminaire

### Status Actuel : 🔴 **NON CONFORME WCAG AA**

**Pourquoi ?**
- ❌ Manque ARIA labels critiques
- ❌ Focus management non testé
- ❌ Screen reader non testé
- ❌ Lighthouse accessibility non exécuté

**Pour atteindre WCAG AA** :
1. Compléter tous les ARIA labels (Priorité 1)
2. Implémenter focus management (Priorité 1)
3. Passer audit Lighthouse > 95 (Priorité 1)
4. Tests manuels clavier + screen reader (Priorité 2)

**Temps estimé restant** : 7-9 heures de travail

---

**Génération** : 2025-11-19
**Type** : Audit préliminaire (Code Review)
**Prochaine étape** : Audit Lighthouse avec serveur actif
