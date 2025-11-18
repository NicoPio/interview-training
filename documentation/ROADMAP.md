# 📋 ROADMAP COMPLÈTE - JS Interview Training App

## Vue d'ensemble du projet

Application d'entraînement aux entretiens techniques en développement JavaScript, Vue.js, React.js avec système de fiches de révisions interactives.

**Stack technique :**

- Nuxt 4
- Nuxt Content (gestion contenus)
- Nuxt UI (composants UI)
- Motion-v (animations)
- VueUse (utilities)

---

## PHASE 0 : Audit & Architecture ✅

### État actuel détecté

- ✅ Stack technique configurée (Nuxt 4, Nuxt Content, Nuxt UI, Motion, VueUse)
- ✅ Contenu structuré par catégories (javascript, html, css)
- ✅ Système de routing dynamique par question
- ✅ Composants QuestionCard et TableOfContents
- ✅ Navigation par catégorie
- ✅ Affichage question/réponse simultané
- ✅ Layout interview avec sidebar

---

## PHASE 1 : Restructuration du contenu 🗂️

### Tâche 1.1 : Définir la structure de fichiers

**Objectif :** Créer l'arborescence des dossiers pour organiser le contenu par thématique

**Action :**

```
content/
├── javascript/
│   ├── q001-primitive-detection.md
│   ├── q002-es6-features.md
│   ├── q003-var-let-const.md
│   └── ...
├── html/
├── css/
├── vuejs/
└── reactjs/
```

**Critères de succès :**

- Dossiers créés
- Nomenclature cohérente (q001, q002...)

---

### Tâche 1.2 : Créer un script de découpage automatique

**Objectif :** Splitter automatiquement le fichier `index.md` en fichiers individuels

**Action :**

- Créer un script Node.js `scripts/split-content.js`
- Parser le markdown pour détecter les questions (pattern `### Q.X`)
- Extraire les métadonnées (titre, numéro)
- Générer les fichiers individuels avec frontmatter YAML

**Format cible :**

```markdown
---
id: 1
slug: primitive-detection
title: 'How do you detect primitive or non-primitive value types in JavaScript?'
category: javascript
difficulty: easy
tags: [types, primitives, typeof]
---

# Contenu de la question

...
```

**Critères de succès :**

- Script fonctionnel
- 26 fichiers générés dans `content/javascript/`
- Frontmatter valide

---

### Tâche 1.3 : Structurer les réponses séparément

**Objectif :** Séparer question et réponse dans chaque fichier markdown

**Action :**

- Utiliser des slots/sections MDC :

```markdown
::question
Votre question ici
::

::answer
Votre réponse détaillée ici
::
```

**Critères de succès :**

- Chaque fichier contient `::question` et `::answer`
- Facilite l'affichage conditionnel

---

## PHASE 2 : Composants UI de base 🎨

### Tâche 2.1 : Créer le composant QuestionCard

**Objectif :** Composant réutilisable pour afficher une question/réponse

**Fichier :** `app/components/QuestionCard.vue`

**Props :**

```typescript
interface Props {
  question: string
  answer: string
  title: string
  id: number
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
}
```

**Features :**

- Affichage de la question et de la réponse
- Badge de difficulté
- Badge de catégorie
- Boutons de partage (favoris, share)

**Critères de succès :**

- Composant fonctionnel
- Design avec Nuxt UI (UCard, UButton, UBadge)

---

### Tâche 2.2 : Créer le composant TableOfContents

**Objectif :** Sommaire interactif pour naviguer entre les questions

**Fichier :** `app/components/TableOfContents.vue`

**Features :**

- Liste des questions avec numéro et titre
- Indicateur visuel de la question active
- Scroll sticky
- Liens cliquables vers chaque question
- Filtres par catégorie (à venir)

**Critères de succès :**

- Navigation fonctionnelle
- Highlight de la question active
- Responsive (collapse sur mobile)

---

### Tâche 2.3 : Créer un layout pour les questions

**Objectif :** Layout avec sidebar (TOC) + zone principale (cards)

**Fichier :** `app/layouts/interview.vue`

**Structure :**

```vue
<template>
  <UApp>
    <div class="flex">
      <aside class="w-64">
        <TableOfContents />
      </aside>
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </UApp>
</template>
```

**Critères de succès :**

- Layout responsive
- Sidebar fixe au scroll
- Toggle mobile

---

## PHASE 3 : Système de routing dynamique 🛤️

### Tâche 3.1 : Configurer les routes dynamiques

**Objectif :** Chaque question a son URL

**Structure cible :**

```
/ → Liste de toutes les questions
/javascript/primitive-detection → Question #1
/javascript/es6-features → Question #2
...
```

**Actions :**

- Créer `app/pages/[category]/[slug].vue`
- Utiliser `queryContent()` ou `queryCollection()` puis filtrage par slug pour fetch la question
- Gérer les erreurs 404

**Critères de succès :**

- URLs propres et SEO-friendly
- Navigation directe possible
- Meta tags dynamiques

---

### Tâche 3.2 : Implémenter la navigation entre questions

**Objectif :** Boutons Previous/Next dans chaque card

**Actions :**

- Créer un composable `useQuestionNavigation()`
- Logique pour trouver question précédente/suivante
- Boutons avec icônes (UButton)

**Critères de succès :**

- Navigation fluide
- Gestion du début/fin de liste
- Keyboard shortcuts (optionnel : arrows)

---

### Tâche 3.3 : Améliorer la page d'accueil

**Objectif :** Transformer `app/pages/index.vue` en page d'accueil attractive

**Features :**

- Hero section
- Grid de cards par catégorie
- Stats (nombre de questions par catégorie)
- CTA "Start practicing"

**Critères de succès :**

- Design moderne
- Animations d'entrée (motion-v)
- Liens vers les catégories

---

## PHASE 4 : Fonctionnalités interactives ⚡

### Tâche 4.1 : Système de progression

**Objectif :** Tracker les questions consultées/maîtrisées

**Actions :**

- Stocker l'état dans localStorage (VueUse : `useLocalStorage`)
- États possibles : `not-seen`, `seen`, `mastered`
- Indicateurs visuels dans le TOC
- Barre de progression globale

**Critères de succès :**

- Persistance des données
- UI claire (checkmarks, colors)

---

### Tâche 4.2 : Mode "Quiz"

**Objectif :** Présenter les questions aléatoirement pour tester ses connaissances

**Actions :**

- Toggle "Quiz Mode" / "Study Mode"
- Shuffle des questions
- Masquer les réponses initialement en mode quiz
- Score final et statistiques

**Critères de succès :**

- Mode distinct du mode révision
- Logique de scoring
- Réponses masquées jusqu'à validation

---

### Tâche 4.3 : Favoris

**Objectif :** Marquer des questions comme favorites

**Actions :**

- Bouton étoile/coeur dans QuestionCard
- Filtre "Show only favorites" dans TOC
- Stockage localStorage

**Critères de succès :**

- Toggle favori instantané
- Liste persistante

---

## PHASE 5 : Recherche & Filtres 🔍

### Tâche 5.1 : Barre de recherche globale

**Objectif :** Rechercher dans titres + contenu des questions

**Actions :**

- Input de recherche dans header
- Utiliser Nuxt Content `queryContent().where()`
- Highlight des résultats
- Composant `SearchResults.vue`

**Critères de succès :**

- Recherche instantanée (debounce 300ms)
- Performance optimisée
- Affichage pertinent des résultats

---

### Tâche 5.2 : Filtres avancés

**Objectif :** Filtrer par catégorie, difficulté, tags

**Actions :**

- Multi-select pour catégories
- Radio group pour difficulté
- Tags populaires (cloud)
- URL state sync (`useRoute`, `useRouter`)

**Critères de succès :**

- Filtres combinables
- URL shareable
- Clear all filters

---

### Tâche 5.3 : Recherche full-text intelligente

**Objectif :** Recherche avancée avec scoring

**Actions :**

- Intégration de Fuse.js ou utiliser Nuxt Content search
- Fuzzy matching
- Pondération (titre > contenu)
- Suggestions "Did you mean..."

**Critères de succès :**

- Résultats pertinents même avec typos
- Performance < 100ms

---

## PHASE 6 : Expérience utilisateur avancée ✨

### Tâche 6.1 : Dark mode

**Objectif :** Thème sombre/clair

**Actions :**

- Utiliser `@nuxtjs/color-mode` (inclus dans Nuxt UI)
- Toggle dans header
- Styles adaptés pour les cards
- Préférence système par défaut

**Critères de succès :**

- Transition fluide
- Persistance du choix

---

### Tâche 6.2 : Animations avancées

**Objectif :** Microinteractions avec motion-v

**Actions :**

- Page transitions
- Card hover effects et scaling
- Smooth scrolling
- Loading states

**Critères de succès :**

- Performances maintenues (60fps)
- Pas de motion pour users avec `prefers-reduced-motion`

---

### Tâche 6.3 : Keyboard shortcuts

**Objectif :** Navigation au clavier

**Actions :**

- `Arrow Left/Right` : prev/next question
- `/` : focus search
- `Escape` : close modals
- `h` : go to home
- Help modal (`?`)

**Critères de succès :**

- Shortcuts intuitifs
- Pas de conflits avec le browser

---

### Tâche 6.4 : Partage social

**Objectif :** Partager une question

**Actions :**

- Boutons Share dans chaque card
- Copy link to clipboard
- Twitter/LinkedIn presets
- Open Graph meta tags

**Critères de succès :**

- Rich previews fonctionnels
- Feedback visuel au copy

---

## PHASE 7 : Performance & SEO 🚀

### Tâche 7.1 : Optimisation du build

**Objectif :** Static generation pour toutes les questions

**Actions :**

- Configurer `nuxt.config.ts` pour SSG
- Pre-render toutes les routes
- Optimisation des images (Nuxt Image)

**Critères de succès :**

- Build time < 2min
- Lighthouse score > 95

---

### Tâche 7.2 : SEO complet

**Objectif :** Référencement optimal

**Actions :**

- Meta tags dynamiques par question
- Sitemap.xml généré
- robots.txt
- Schema.org markup (FAQPage)
- Canonical URLs

**Critères de succès :**

- Validation schema.org
- Google Search Console indexé

---

## PHASE 8 : Contenu & Scalabilité 📚

### Tâche 8.1 : Ajouter nouvelles catégories

**Objectif :** Enrichir avec HTML, CSS, Vue.js, React

**Actions :**

- Créer les dossiers
- Rédiger/sourcer du contenu
- Valider le format markdown
- Générer les fichiers

**Critères de succès :**

- Minimum 10 questions par catégorie

---

### Tâche 8.2 : Système de contribution

**Objectif :** Permettre contributions externes (GitHub)

**Actions :**

- Template de question markdown
- Guide de contribution (CONTRIBUTING.md)
- Validation automatique (GitHub Actions)
- Pull request template

**Critères de succès :**

- Process de contribution clair
- CI valide le format

---

### Tâche 8.3 : Internationalisation (optionnel)

**Objectif :** Support multi-langues

**Actions :**

- `@nuxtjs/i18n`
- Traduire UI
- Structure contenu multilingue

---

## PHASE 9 : Tests & Qualité 🧪

### Tâche 9.1 : Tests unitaires

**Fichiers :** Composants clés (QuestionCard, TOC)

**Actions :**

- Vitest configuration
- Tests des composables
- Coverage > 70%

---

### Tâche 9.2 : Tests E2E

**Actions :**

- Playwright configuration
- Scénarios clés (navigation, search, quiz mode)

---

### Tâche 9.3 : Accessibilité

**Actions :**

- Audit avec axe DevTools
- ARIA labels
- Focus management
- Screen reader testing

**Critères de succès :**

- WCAG AA compliant

---

## PHASE 10 : Déploiement & Monitoring 🌐

### Tâche 10.1 : Intégration Nuxt Studio & Nuxt Hub

**Objectif :** Connecter le projet avec Nuxt Studio pour la gestion de contenu et Nuxt Hub pour le déploiement

**Actions :**

- **Nuxt Studio :**
  - Configurer le branchement avec Nuxt Studio
  - Activer l'édition de contenu en ligne via l'interface Studio
  - Configurer les permissions et les workflows de collaboration
  - Intégrer le live preview pour l'édition de contenu
  - Configurer le système de branches pour les contributions

- **Nuxt Hub :**
  - Configurer le déploiement sur Nuxt Hub
  - Connecter le repository GitHub avec Nuxt Hub
  - Mettre en place les déploiements automatiques (CI/CD)
  - Configurer les preview deployments pour chaque PR
  - Optimiser la configuration pour le edge computing
  - Configurer le système de cache et les assets CDN

**Critères de succès :**

- Édition de contenu en temps réel depuis Nuxt Studio
- Déploiement automatique sur commit/merge
- Preview URLs fonctionnels pour chaque branche
- Performance optimale avec edge deployment
- Workflow collaboratif fluide

---

### Tâche 10.2 : Déploiement alternatif (backup)

**Options :** Vercel / Netlify / Cloudflare Pages

**Actions :**

- Configuration domaine
- CI/CD automatique
- Preview branches

---

### Tâche 10.3 : Analytics

**Actions :**

- Plausible ou Umami (privacy-friendly)
- Tracker : questions vues, catégories populaires
- Conversion quiz mode

---

### Tâche 10.4 : Feedback utilisateur

**Actions :**

- Bouton "Was this helpful?" sur chaque question
- Form de suggestion
- Stockage (Supabase ou Firebase)

---

## 🎯 Ordre d'exécution recommandé

**Sprint 1 (MVP)** : Phases 1 + 2 + 3.1
**Sprint 2** : Phases 3.2-3.3 + 4.1
**Sprint 3** : Phase 5
**Sprint 4** : Phases 6 + 7
**Continu** : Phases 8, 9, 10

---

## 📝 Structure de fichiers cible

```
js-interview-nuxt/
├── app/
│   ├── components/
│   │   ├── QuestionCard.vue
│   │   ├── TableOfContents.vue
│   │   ├── SearchBar.vue
│   │   ├── QuestionFilters.vue
│   │   └── ProgressBar.vue
│   ├── composables/
│   │   ├── useQuestionNavigation.ts
│   │   ├── useQuestionProgress.ts
│   │   └── useQuestionSearch.ts
│   ├── layouts/
│   │   └── interview.vue
│   ├── pages/
│   │   ├── index.vue (refacto)
│   │   └── [category]/[slug].vue
│   └── utils/
│       └── markdown-parser.ts
├── content/
│   ├── javascript/
│   │   ├── q001-primitive-detection.md
│   │   ├── q002-es6-features.md
│   │   └── ...
│   ├── html/
│   ├── css/
│   ├── vuejs/
│   └── reactjs/
├── documentation/
│   └── ROADMAP.md (ce fichier)
└── scripts/
    └── split-content.js
```

---

## 📊 Métriques de succès

### Performance

- Lighthouse score > 95
- First Contentful Paint < 1s
- Time to Interactive < 2s

### Qualité

- Test coverage > 70%
- Zero accessibility issues (WCAG AA)
- ESLint : 0 errors

### Engagement

- Temps moyen par session > 5min
- Taux de complétion quiz > 60%
- Questions favorites moyennes > 5 par user

---

## 🔄 Versioning

- **v0.1** : MVP (Phases 1-3)
- **v0.5** : Beta publique (Phases 4-5)
- **v1.0** : Release stable (Phases 6-7)
- **v2.0** : Multi-catégories (Phase 8)

---

**Dernière mise à jour :** 2025-11-03
**Mainteneur :** Équipe Dev
