---
id: 35
slug: script-defer-async
title: 'Quelle est la différence entre defer et async pour les scripts ?'
category: html
difficulty: medium
tags: ['script', 'defer', 'async', 'performance']
---

# Quelle est la différence entre defer et async pour les scripts ?

Les attributs `defer` et `async` contrôlent comment les scripts externes sont chargés et exécutés, impactant les performances.

## Sans attribut (Comportement par défaut)

```html
<script src="script.js"></script>
```

**Comportement** :
1. Parsing HTML **bloqué**
2. Script téléchargé
3. Script exécuté immédiatement
4. Parsing HTML reprend

**Problème** : Bloque le rendu de la page.

## Avec defer

```html
<script src="script.js" defer></script>
```

**Comportement** :
1. Parsing HTML **continue**
2. Script téléchargé **en parallèle**
3. Script exécuté **après** le parsing HTML complet
4. Avant l'événement `DOMContentLoaded`

**Ordre d'exécution** : Préservé (scripts exécutés dans l'ordre d'apparition).

## Avec async

```html
<script src="script.js" async></script>
```

**Comportement** :
1. Parsing HTML **continue**
2. Script téléchargé **en parallèle**
3. Script exécuté **dès que téléchargé** (peut bloquer le parsing)

**Ordre d'exécution** : Non garanti (exécuté dès que prêt).

## Comparaison Visuelle

```
Sans attribut:
|--HTML--|--Download--|--Execute--|--HTML--|

defer:
|--HTML + Download--|--HTML--|--Execute--|

async:
|--HTML + Download--|--Execute--|--HTML--|
```

## Tableau Comparatif

| Critère | Normal | defer | async |
|---------|--------|-------|-------|
| **Bloque parsing** | ✅ Oui | ❌ Non | ⚠️ Pendant exécution |
| **Ordre préservé** | ✅ Oui | ✅ Oui | ❌ Non |
| **Exécution** | Immédiate | Après DOM | Dès que prêt |
| **DOMContentLoaded** | Avant | Avant | Peut être après |
| **Usage** | Scripts critiques | Scripts dépendants du DOM | Scripts indépendants |

## Cas d'Usage

### defer - Scripts dépendants du DOM

```html
<!-- ✅ Manipulation du DOM -->
<script src="main.js" defer></script>
<script src="ui.js" defer></script>

<!-- Exécution : main.js puis ui.js, après le DOM -->
```

**Exemples** :
- Manipulation du DOM
- Initialisation de l'application
- Scripts qui dépendent d'autres scripts

### async - Scripts indépendants

```html
<!-- ✅ Analytics -->
<script src="analytics.js" async></script>

<!-- ✅ Widgets externes -->
<script src="chat-widget.js" async></script>
<script src="social-share.js" async></script>
```

**Exemples** :
- Analytics (Google Analytics, Plausible)
- Widgets tiers (chat, réseaux sociaux)
- Scripts sans dépendances

## Placement des Scripts

### Dans `<head>` avec defer

```html
<head>
  <title>Page</title>
  <script src="app.js" defer></script>
  <script src="utils.js" defer></script>
</head>
<body>
  <!-- Contenu -->
</body>
```

**Avantage** : Téléchargement commence tôt, exécution après DOM.

### Avant `</body>` (Alternative)

```html
<body>
  <!-- Contenu -->

  <script src="app.js"></script>
</body>
```

**Avantage** : DOM déjà chargé, pas besoin de defer.

### Module scripts (type="module")

```html
<script type="module" src="app.js"></script>
```

**Comportement** : Defer par défaut, peut ajouter `async` si besoin.

## Exemples Pratiques

### Application avec dépendances

```html
<head>
  <!-- Librairies -->
  <script src="vendor/jquery.js" defer></script>
  <script src="vendor/bootstrap.js" defer></script>

  <!-- App (dépend de jQuery et Bootstrap) -->
  <script src="app.js" defer></script>
</head>
```

**Ordre garanti** : jQuery → Bootstrap → App.

### Scripts indépendants

```html
<head>
  <!-- App principale -->
  <script src="app.js" defer></script>

  <!-- Analytics (indépendant) -->
  <script src="analytics.js" async></script>

  <!-- Chat (indépendant) -->
  <script src="chat.js" async></script>
</head>
```

**Exécution** : app.js après DOM, analytics/chat dès que prêts.

### Inline scripts avec defer

```html
<!-- ❌ Ne fonctionne pas -->
<script defer>
  console.log('Inline defer ignoré');
</script>

<!-- ✅ Alternative avec DOMContentLoaded -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM prêt');
  });
</script>
```

**Note** : `defer` et `async` fonctionnent uniquement avec `src` externe.

## Performance Best Practices

### Stratégie Recommandée

```html
<head>
  <!-- Critical CSS inline -->
  <style>/* Styles critiques */</style>

  <!-- Scripts app avec defer -->
  <script src="app.js" defer></script>

  <!-- Analytics avec async -->
  <script src="analytics.js" async></script>
</head>
```

### Préchargement (Optionnel)

```html
<head>
  <!-- Précharger pour téléchargement anticipé -->
  <link rel="preload" href="important.js" as="script">

  <!-- Script avec defer -->
  <script src="important.js" defer></script>
</head>
```

## Événements

```javascript
// DOMContentLoaded : DOM prêt, scripts defer exécutés
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM + defer scripts prêts');
});

// load : DOM + toutes ressources (images, CSS, etc.)
window.addEventListener('load', () => {
  console.log('Tout chargé');
});

// Script individuel
const script = document.createElement('script');
script.src = 'dynamic.js';
script.defer = true; // ou script.async = true
script.onload = () => console.log('Script chargé');
document.head.appendChild(script);
```

## Résumé

**defer** :
- ✅ Ne bloque pas le parsing
- ✅ Ordre préservé
- ✅ Exécuté après le DOM
- ✅ Idéal pour scripts d'application

**async** :
- ✅ Ne bloque pas le parsing
- ❌ Ordre non garanti
- ⚠️ Exécuté dès que prêt
- ✅ Idéal pour scripts indépendants

**Règle** : Utilisez **defer** par défaut, **async** uniquement pour scripts indépendants (analytics, widgets).
