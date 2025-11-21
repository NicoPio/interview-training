---
id: 38
slug: flexbox
title: Comment fonctionne Flexbox en CSS ?
category: css
difficulty: medium
tags:
  - flexbox
  - layout
  - alignment
  - responsive
---

# Comment fonctionne Flexbox en CSS ?

Flexbox (Flexible Box Layout) est un modèle de mise en page CSS qui permet d'organiser et d'aligner des éléments de manière flexible.

## Concepts de Base

```css
.container {
  display: flex; /* ou inline-flex */
}
```

**Axes** :

- **Main axis** (axe principal) : Direction des flex items
- **Cross axis** (axe transversal) : Perpendiculaire au main axis

## Propriétés du Container

### flex-direction

```css
.container {
  flex-direction: row;           /* → (défaut) */
  flex-direction: row-reverse;   /* ← */
  flex-direction: column;        /* ↓ */
  flex-direction: column-reverse; /* ↑ */
}
```

### justify-content (Main Axis)

```css
.container {
  justify-content: flex-start;    /* Début (défaut) */
  justify-content: flex-end;      /* Fin */
  justify-content: center;        /* Centre */
  justify-content: space-between; /* Espace entre items */
  justify-content: space-around;  /* Espace autour items */
  justify-content: space-evenly;  /* Espace égal partout */
}
```

### align-items (Cross Axis)

```css
.container {
  align-items: stretch;    /* Étire (défaut) */
  align-items: flex-start; /* Haut */
  align-items: flex-end;   /* Bas */
  align-items: center;     /* Centre */
  align-items: baseline;   /* Baseline de texte */
}
```

### flex-wrap

```css
.container {
  flex-wrap: nowrap;       /* Une ligne (défaut) */
  flex-wrap: wrap;         /* Plusieurs lignes */
  flex-wrap: wrap-reverse; /* Wrap inversé */
}
```

### align-content (Multi-lignes)

```css
.container {
  flex-wrap: wrap;
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
  align-content: stretch; /* Défaut */
}
```

### gap

```css
.container {
  gap: 20px;           /* row-gap + column-gap */
  row-gap: 10px;
  column-gap: 20px;
}
```

## Propriétés des Items

### flex-grow

```css
.item {
  flex-grow: 0; /* Défaut : ne grandit pas */
  flex-grow: 1; /* Grandit proportionnellement */
  flex-grow: 2; /* Grandit 2x plus que flex-grow: 1 */
}
```

### flex-shrink

```css
.item {
  flex-shrink: 1; /* Défaut : rétrécit */
  flex-shrink: 0; /* Ne rétrécit pas */
}
```

### flex-basis

```css
.item {
  flex-basis: auto;  /* Défaut : taille contenu */
  flex-basis: 200px; /* Taille de base */
  flex-basis: 50%;   /* Pourcentage */
}
```

### flex (Raccourci)

```css
.item {
  flex: 1;           /* grow: 1, shrink: 1, basis: 0 */
  flex: 0 0 200px;   /* grow: 0, shrink: 0, basis: 200px */
  flex: 1 1 auto;    /* grow: 1, shrink: 1, basis: auto */
}
```

### align-self

```css
.item {
  align-self: auto;       /* Hérite align-items */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: stretch;
}
```

### order

```css
.item {
  order: 0; /* Défaut */
}
.item-1 { order: 1; }  /* Apparaît après */
.item-2 { order: -1; } /* Apparaît avant */
```

## Exemples Pratiques

### Centrage Parfait

```html
<div class="container">
  <div class="box">Centré</div>
</div>
```

```css
.container {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
  height: 100vh;
}
```

### Navigation Responsive

```html
<nav class="nav">
  <a href="/">Logo</a>
  <ul class="menu">
    <li><a href="/about">À propos</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
  }
}
```

### Cards Responsives

```html
<div class="cards">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* Taille min 300px, grandit */
  padding: 2rem;
  border: 1px solid #ddd;
}
```

### Footer Sticky

```html
<body>
  <div class="wrapper">
    <header>Header</header>
    <main class="content">Contenu</main>
    <footer>Footer</footer>
  </div>
</body>
```

```css
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1; /* Prend tout l'espace disponible */
}
```

### Ordre Visuel

```html
<div class="container">
  <div class="sidebar">Sidebar</div>
  <div class="main">Main</div>
</div>
```

```css
.container {
  display: flex;
}

.main {
  flex: 1;
  order: 1;
}

.sidebar {
  width: 250px;
  order: 2;
}

/* Mobile: Sidebar en bas */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .main { order: 1; }
  .sidebar { order: 2; }
}
```

## Résumé

**Container** :

- `display: flex`
- `flex-direction` : Direction
- `justify-content` : Alignement main axis
- `align-items` : Alignement cross axis
- `flex-wrap` : Multi-lignes
- `gap` : Espacement

**Items** :

- `flex: 1` : Grandir/rétrécir
- `align-self` : Alignement individuel
- `order` : Ordre d'affichage

**Usage** : Navigation, grilles, centrage, layouts flexibles.
