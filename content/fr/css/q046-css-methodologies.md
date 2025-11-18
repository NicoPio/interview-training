---
id: 46
slug: css-methodologies
title: 'Quelles sont les méthodologies CSS (BEM, OOCSS, SMACSS) ?'
category: css
difficulty: medium
tags: ['bem', 'oocss', 'smacss', 'methodologies', 'architecture']
---

# Quelles sont les méthodologies CSS (BEM, OOCSS, SMACSS) ?

Les méthodologies CSS sont des conventions d'organisation et de nommage pour écrire du CSS maintenable et scalable.

## BEM (Block Element Modifier)

**Principe** : Nommage structuré en blocs, éléments et modifiers.

### Syntaxe

```css
.block {}              /* Composant */
.block__element {}     /* Partie du bloc */
.block--modifier {}    /* Variation du bloc */
.block__element--modifier {}
```

### Exemples

```html
<!-- Card -->
<div class="card card--featured">
  <h2 class="card__title">Titre</h2>
  <p class="card__text">Contenu...</p>
  <button class="card__button card__button--primary">Action</button>
</div>
```

```css
/* Block */
.card {
  border: 1px solid #ddd;
  padding: 20px;
}

/* Modifier de block */
.card--featured {
  border-color: gold;
  background: #fff9e6;
}

/* Element */
.card__title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card__text {
  color: #666;
}

.card__button {
  padding: 10px 20px;
  border: none;
}

/* Modifier d'element */
.card__button--primary {
  background: blue;
  color: white;
}
```

### Avantages

✅ **Clarté** : Nommage explicite
✅ **Modularité** : Composants réutilisables
✅ **Pas de conflits** : Noms uniques
✅ **Maintenabilité** : Structure claire

### Navigation BEM

```html
<nav class="nav">
  <ul class="nav__list">
    <li class="nav__item nav__item--active">
      <a href="/" class="nav__link">Accueil</a>
    </li>
    <li class="nav__item">
      <a href="/about" class="nav__link">À propos</a>
    </li>
  </ul>
</nav>
```

```css
.nav {
  background: white;
  border-bottom: 1px solid #ddd;
}

.nav__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__item {
  margin-right: 20px;
}

.nav__item--active {
  font-weight: bold;
}

.nav__link {
  color: black;
  text-decoration: none;
}

.nav__link:hover {
  color: blue;
}
```

## OOCSS (Object-Oriented CSS)

**Principe** : Séparation structure/skin et contenant/contenu.

### Séparation Structure/Skin

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
```

```css
/* Structure (réutilisable) */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

/* Skin (apparence) */
.btn-primary {
  background: blue;
  color: white;
}

.btn-secondary {
  background: gray;
  color: white;
}
```

### Séparation Contenant/Contenu

```css
/* ❌ Mauvais : Dépendant du conteneur */
.sidebar h3 {
  font-size: 1.2rem;
  color: blue;
}

/* ✅ Bon : Indépendant */
.heading-small {
  font-size: 1.2rem;
  color: blue;
}
```

```html
<aside class="sidebar">
  <h3 class="heading-small">Titre</h3>
</aside>

<main>
  <h3 class="heading-small">Autre titre</h3>
</main>
```

### Layout OOCSS

```html
<div class="media">
  <img src="avatar.jpg" class="media-img">
  <div class="media-body">
    <h4>Titre</h4>
    <p>Contenu...</p>
  </div>
</div>
```

```css
.media {
  display: flex;
  align-items: flex-start;
}

.media-img {
  margin-right: 15px;
  flex-shrink: 0;
}

.media-body {
  flex: 1;
}
```

## SMACSS (Scalable and Modular Architecture for CSS)

**Principe** : Organisation en 5 catégories.

### Catégories

#### 1. Base

```css
/* Reset et éléments HTML bruts */
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

a {
  color: blue;
  text-decoration: none;
}
```

#### 2. Layout

```css
/* Structure majeure de la page */
.l-header {
  padding: 20px;
  background: white;
}

.l-sidebar {
  width: 250px;
  float: left;
}

.l-main {
  margin-left: 270px;
}

.l-footer {
  clear: both;
  padding: 20px;
}
```

#### 3. Module

```css
/* Composants réutilisables */
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.card {
  border: 1px solid #ddd;
  padding: 20px;
}

.alert {
  padding: 15px;
  border-radius: 4px;
}
```

#### 4. State

```css
/* États des modules */
.is-active {
  font-weight: bold;
  color: blue;
}

.is-hidden {
  display: none;
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.has-error {
  border-color: red;
}
```

#### 5. Theme

```css
/* Variations visuelles */
.theme-dark {
  background: #1a1a1a;
  color: white;
}

.theme-light {
  background: white;
  color: black;
}
```

### Structure Fichiers

```
styles/
├── base/
│   ├── reset.css
│   └── typography.css
├── layout/
│   ├── header.css
│   ├── sidebar.css
│   └── footer.css
├── modules/
│   ├── button.css
│   ├── card.css
│   └── form.css
├── state/
│   └── states.css
└── theme/
    └── theme.css
```

## Utility-First (Tailwind)

**Principe** : Classes utilitaires atomiques.

```html
<!-- Tailwind CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Button
</button>

<div class="flex items-center justify-between p-4 bg-white shadow-md">
  <h2 class="text-xl font-bold">Title</h2>
  <span class="text-gray-500">Info</span>
</div>
```

### Avantages

✅ Rapide
✅ Pas de nommage
✅ Pas de CSS custom

### Inconvénients

❌ HTML verbeux
❌ Difficile à maintenir (grandes équipes)

## Atomic CSS

```css
/* Classes mono-propriété */
.mt-10 { margin-top: 10px; }
.p-20 { padding: 20px; }
.text-center { text-align: center; }
.flex { display: flex; }
```

## CSS Modules

```css
/* card.module.css */
.card {
  border: 1px solid #ddd;
}

.title {
  font-size: 1.5rem;
}
```

```javascript
// React/Vue
import styles from './card.module.css';

<div className={styles.card}>
  <h2 className={styles.title}>Title</h2>
</div>
```

**Avantage** : Scoped par défaut, pas de conflits.

## CSS-in-JS

```javascript
// Styled Components (React)
const Button = styled.button`
  padding: 10px 20px;
  background: blue;
  color: white;

  &:hover {
    background: darkblue;
  }
`;

<Button>Click me</Button>
```

## Comparaison

| Méthodologie | Focus | Complexité | Usage |
|--------------|-------|------------|-------|
| **BEM** | Nommage | Moyenne | Composants |
| **OOCSS** | Réutilisabilité | Faible | Objets CSS |
| **SMACSS** | Organisation | Moyenne | Architecture |
| **Utility-First** | Rapidité | Faible | Prototypage |
| **CSS Modules** | Scoping | Moyenne | JS frameworks |
| **CSS-in-JS** | Dynamique | Élevée | React/Vue |

## Bonnes Pratiques

### Cohérence

```css
/* ✅ Choisir UNE méthodologie */
.card__title { }        /* BEM */

/* ❌ Mélanger */
.card-title { }         /* Kebab-case */
.cardTitle { }          /* camelCase */
```

### Spécificité Faible

```css
/* ❌ Haute spécificité */
div.card > ul.list > li.item { }

/* ✅ Faible spécificité */
.card__item { }
```

### Éviter !important

```css
/* ❌ */
.button { color: blue !important; }

/* ✅ Augmenter spécificité */
.section .button { color: blue; }
```

## Résumé

**BEM** :
- Nommage : `block__element--modifier`
- Composants clairs
- Maintenable

**OOCSS** :
- Séparer structure/skin
- Réutilisabilité maximale

**SMACSS** :
- 5 catégories : Base, Layout, Module, State, Theme
- Organisation fichiers

**Utility-First** :
- Classes atomiques
- Rapide mais verbeux

**Choix** : Dépend du projet, de l'équipe, et des préférences. BEM est populaire pour sa clarté.
