# E2E Tests - JS Interview Prep

Tests end-to-end avec Playwright couvrant les 8 user stories de l'application.

## 📁 Structure des Tests

```
tests/e2e/
├── 01-browse-questions.spec.ts      # US1: Navigation et découverte
├── 02-answer-reveal-and-progress.spec.ts  # US2-US3: Révélation et progression
├── 03-favorites-and-filters.spec.ts       # US4-US5: Favoris et filtres
├── 04-quiz-mode.spec.ts                   # US6: Mode quiz
└── 05-i18n-and-dark-mode.spec.ts          # US7-US8: i18n et dark mode
```

## 🎯 Couverture

### User Story 1 : Browse and Discover Questions
- ✅ Affichage de la homepage avec toutes les questions
- ✅ Badges de difficulté avec couleurs correctes
- ✅ Affichage des tags de questions
- ✅ Navigation vers les pages de détail
- ✅ Section des statistiques
- ✅ Tri des questions par ID
- ✅ Gestion de l'état vide

### User Story 2-3 : Answer Reveal & Progress Tracking
- ✅ Bouton de révélation de réponse
- ✅ Raccourci clavier spacebar
- ✅ Marquage automatique "vu"
- ✅ Toggle "Maîtrisé"
- ✅ Barre de progression
- ✅ Persistance de la progression
- ✅ Tracking du temps de révélation
- ✅ Calcul des pourcentages

### User Story 4-5 : Favorites & Advanced Filtering
- ✅ Toggle statut favori
- ✅ Filtre par favoris
- ✅ Recherche textuelle (avec debounce)
- ✅ Filtre par difficulté (multi-select)
- ✅ Filtre par statut de progression
- ✅ Filtres combinés (logique AND)
- ✅ Synchronisation URL
- ✅ Reset des filtres
- ✅ Badge de compteur de filtres actifs
- ✅ Message "aucun résultat"
- ✅ Caractères spéciaux dans la recherche
- ✅ Persistance des favoris

### User Story 6 : Quiz Mode
- ✅ Toggle mode quiz
- ✅ Timer 30 secondes
- ✅ Auto-révélation au timer=0
- ✅ Désactivation du raccourci spacebar
- ✅ Arrêt du timer à révélation manuelle
- ✅ Format d'affichage du timer
- ✅ Persistance de la préférence
- ✅ Indicateur de mode quiz

### User Story 7-8 : i18n & Dark Mode
- ✅ Switch FR/EN
- ✅ Traductions UI
- ✅ Navigation sur page équivalente
- ✅ Persistance de la langue
- ✅ Contenu dans la langue sélectionnée
- ✅ Toggle dark mode
- ✅ Persistance du dark mode
- ✅ Contraste des couleurs
- ✅ Dark mode sur tous les composants
- ✅ Combinaison langue + dark mode

## 🚀 Exécution des Tests

### Tous les tests
```bash
npm run test:e2e
```

### Tests avec UI interactive
```bash
npm run test:e2e:ui
```

### Tests en mode debug
```bash
npm run test:e2e:debug
```

### Tests spécifiques
```bash
# User Story 1 uniquement
npx playwright test 01-browse

# User Stories 2-3
npx playwright test 02-answer

# Avec un navigateur spécifique
npx playwright test --project=chromium

# En mode headed (voir le navigateur)
npx playwright test --headed
```

## 📊 Rapports

Après l'exécution, un rapport HTML est généré :

```bash
npx playwright show-report
```

## 🛠️ Configuration

La configuration se trouve dans `playwright.config.ts` :

- **baseURL** : `http://localhost:3000`
- **Navigateurs** : Chromium par défaut
- **Timeout** : 30s par test (60s pour le test du timer)
- **Retry** : 2 fois en CI, 0 en local
- **WebServer** : Lance automatiquement `npm run dev`

## 📝 Conventions de Tests

### Sélecteurs
- Privilégier les sélecteurs textuels : `hasText: /pattern/i`
- Utiliser les attributs ARIA quand disponibles
- Fallback sur les classes/data-attributes

### Assertions
- Toujours utiliser `await expect()` pour Playwright
- Console.log pour tracer l'exécution
- Timeouts adaptés au contexte (debounce, animations)

### Gestion des Erreurs
- Tests gracefully dégradés (⚠ warning si élément absent)
- Pas de fail strict sur éléments UI optionnels
- Focus sur les flows critiques

## 🔄 Maintenance

### Ajout de Nouveaux Tests
1. Créer un fichier `0X-feature-name.spec.ts`
2. Suivre la structure existante (describe > beforeEach > tests)
3. Ajouter la couverture dans ce README
4. Mettre à jour tasks.md

### Debugging
```bash
# Voir les traces
npx playwright test --trace on

# Mode debug avec breakpoints
npx playwright test --debug

# Slow-mo pour voir les actions
npx playwright test --headed --slow-mo 1000
```

## ✅ Checklist Avant Commit

- [ ] Tous les tests passent localement
- [ ] Tests couvrent les cas d'erreur
- [ ] Console.log informatifs (pas de spam)
- [ ] Timeouts appropriés (pas de waitForTimeout excessifs)
- [ ] README mis à jour si nouvelle feature

## 📚 Ressources

- [Playwright Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Spec du projet](../../specs/001-project-documentation/spec.md)
- [Tasks](../../specs/001-project-documentation/tasks.md)
