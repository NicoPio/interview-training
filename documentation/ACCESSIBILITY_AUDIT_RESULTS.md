# 🔍 Audit d'Accessibilité - Résultats axe-core

**Date** : 2025-11-19
**Outil** : axe-core 4.11 avec Playwright
**Pages auditées** : Homepage (/interview-training/)

---

## 📊 Résumé Global

| Métrique | Résultat |
|----------|----------|
| **Règles passées** | ✅ 41 / 44 |
| **Violations** | ❌ 3 violations |
| **Éléments affectés** | 35 éléments |
| **Score estimé** | 75-80% |
| **Objectif** | 95%+ (WCAG AA) |

---

## ❌ Violations Critiques

### 1. color-contrast (SERIOUS) 🔴

**Impact** : SERIOUS
**Éléments affectés** : 33
**Description** : Contraste insuffisant entre couleurs de texte et fond

#### Problèmes identifiés :

| Élément | FG Color | BG Color | Ratio actuel | Ratio requis | Status |
|---------|----------|----------|--------------|--------------|--------|
| Badges "easy" (success) | #00c950 | #e1faee | 2.03 | 4.5:1 | ❌ |
| Badges "medium" (warning) | #f0b100 | #fef7e0 | 1.78 | 4.5:1 | ❌ |
| Primary badge | #00c950 | #e1faee | 2.03 | 4.5:1 | ❌ |
| Stats "Not Seen" | #99a1af | #f9fafb | 2.48 | 3:1 | ❌ |
| Stats numbers (primary) | #00c950 | #ffffff | 2.23 | 3:1 | ❌ |
| Stats numbers (green) | #00c950 | #ffffff | 2.23 | 3:1 | ❌ |
| Links (success) | #ffffff | #00c950 | 2.21 | 4.5:1 | ❌ |

**Corrections nécessaires** :
- ✏️ Assombrir `success` color : `#00c950` → `#00a040` (plus foncé)
- ✏️ Assombrir `warning` color : `#f0b100` → `#d89500` (plus foncé)
- ✏️ Assombrir `gray-400` : `#99a1af` → `#6b7280` (gray-500)
- ✏️ Assombrir `primary-500` : `#00c950` → `#00a040`

---

### 2. heading-order (MODERATE) 🟡

**Impact** : MODERATE
**Éléments affectés** : 1
**Description** : L'ordre des niveaux de headings n'est pas sémantiquement correct

**Élément problématique** :
```html
<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
```

**Problème** : La page saute directement d'un `<h1>` à un `<h3>`, sans `<h2>` intermédiaire

**Correction** :
- ✏️ Changer `<h3>` → `<h2>` dans `ProgressBar.vue:23`
- ✏️ OU Ajouter un `<h2>` de section parent

---

### 3. region (MODERATE) 🟡

**Impact** : MODERATE
**Éléments affectés** : 1
**Description** : Contenu de page non contenu dans un landmark

**Élément problématique** :
```html
<div class="nuxt-devtools-panel-content nuxt-devtools-label" title="Page load time">...</div>
```

**Correction** :
- ⏭️ **Ignorable** : Ceci est un élément Nuxt DevTools qui n'apparaît qu'en dev
- ✅ N'apparaît pas en production (build)

---

## ✅ Points Forts Identifiés

1. **ARIA Labels** ✅
   - SearchBar : `aria-label`, `aria-describedby`, `aria-live="polite"`
   - QuestionCard : `aria-expanded`, `aria-controls`, `aria-pressed`
   - ProgressBar : `role="progressbar"`, tous attributs ARIA
   - LanguageSwitcher : `aria-label`

2. **Landmark** : Skip link implémenté dans `app.vue`
   - `<a href="#main-content">Aller au contenu principal</a>`
   - `<main id="main-content" tabindex="-1">`

3. **Sémantique HTML** ✅
   - Structure de page correcte
   - Headings présents (ordre à corriger)
   - Attribut `lang` dynamique sur `<html>`

4. **Keyboard Navigation** ✅
   - Shortcuts implémentés (Space, /, Arrows)
   - Focus states visibles

---

## 🎯 Plan d'Action

### Priorité 1 : Corriger contrastes (30-45 min)

**Fichier** : `tailwind.config.ts` ou créer des overrides

```typescript
// Option 1: Override dans tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        success: {
          DEFAULT: '#00a040', // Plus foncé (était #00c950)
        },
        warning: {
          DEFAULT: '#d89500', // Plus foncé (était #f0b100)
        },
      },
    },
  },
}
```

**Éléments à modifier** :
- [ ] ProgressBar.vue (lignes 76, 82, 88) : couleurs stats
- [ ] Nuxt UI theme : success, warning, primary colors
- [ ] Test avec contrast checker

### Priorité 2 : Corriger heading-order (5 min)

**Fichier** : `app/components/ProgressBar.vue:23`

```diff
- <h3 class="text-lg font-semibold...">Your Progress</h3>
+ <h2 class="text-lg font-semibold...">Your Progress</h2>
```

### Priorité 3 : Re-valider (10 min)

- [ ] Relancer audit axe-core
- [ ] Vérifier score > 95%
- [ ] Tester navigation clavier
- [ ] Tester avec screen reader (optionnel)

---

## 📈 Score Projection

| Correction | Score estimé | Status |
|------------|--------------|--------|
| **Actuel** | 75-80% | ⚠️ |
| Après contraste | 90-92% | 🟡 |
| Après heading-order | 94-96% | ✅ |
| **Objectif WCAG AA** | >95% | 🎯 |

---

## 🔗 Ressources

- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Heading Order](https://dequeuniversity.com/rules/axe/4.11/heading-order)

---

**Rapport généré automatiquement par axe-core via Playwright**
**Test file** : `tests/e2e/06-accessibility-audit.spec.ts`
