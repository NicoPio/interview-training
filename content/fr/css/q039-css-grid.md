---
id: 39
slug: css-grid
title: 'Comment fonctionne CSS Grid Layout ?'
category: css
difficulty: medium
tags: ['grid', 'layout', 'responsive', 'columns']
---

# Comment fonctionne CSS Grid Layout ?

CSS Grid est un système de mise en page bidimensionnel (lignes et colonnes) pour créer des layouts complexes.

## Concepts de Base

```css
.container {
  display: grid;
}
```

**Terminologie** :
- **Grid Container** : Parent avec `display: grid`
- **Grid Items** : Enfants directs
- **Grid Lines** : Lignes de séparation
- **Grid Tracks** : Lignes ou colonnes
- **Grid Cell** : Intersection ligne/colonne
- **Grid Area** : Zone rectangulaire

## Propriétés du Container

### grid-template-columns/rows

```css
.container {
  /* 3 colonnes fixes */
  grid-template-columns: 200px 200px 200px;

  /* Unité fr (fraction) */
  grid-template-columns: 1fr 2fr 1fr; /* 25% 50% 25% */

  /* repeat() */
  grid-template-columns: repeat(3, 1fr);

  /* auto-fill/auto-fit */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  /* Lignes */
  grid-template-rows: 100px auto 50px;
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

### grid-template-areas

```css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

### justify-items / align-items

```css
.container {
  /* Alignement horizontal des items */
  justify-items: start | end | center | stretch;

  /* Alignement vertical des items */
  align-items: start | end | center | stretch;

  /* Raccourci */
  place-items: center center;
}
```

### justify-content / align-content

```css
.container {
  /* Alignement de la grille entière (si plus petit que container) */
  justify-content: start | end | center | space-between | space-around;
  align-content: start | end | center | space-between | space-around;

  /* Raccourci */
  place-content: center center;
}
```

## Propriétés des Items

### grid-column / grid-row

```css
.item {
  /* Colonne de la ligne 1 à 3 */
  grid-column: 1 / 3;
  /* ou */
  grid-column-start: 1;
  grid-column-end: 3;

  /* Span (s'étend sur 2 colonnes) */
  grid-column: span 2;

  /* Ligne */
  grid-row: 1 / 3;
  grid-row: span 2;
}
```

### justify-self / align-self

```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;

  /* Raccourci */
  place-self: center center;
}
```

## Exemples Pratiques

### Layout Simple (3 colonnes)

```html
<div class="grid">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

### Layout Responsive (auto-fit)

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

**Comportement** : Colonnes s'ajustent automatiquement selon la largeur.

### Layout avec Areas

```html
<div class="layout">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main Content</main>
  <footer>Footer</footer>
</div>
```

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 1rem;
  min-height: 100vh;
}

header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }

/* Mobile */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}
```

### Cards avec Span

```html
<div class="cards">
  <div class="card featured">Featured (large)</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>
```

```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.featured {
  grid-column: span 2; /* Prend 2 colonnes */
  grid-row: span 2;    /* Prend 2 lignes */
}
```

### Grid Imbriquées

```css
.outer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.inner-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

## Grid vs Flexbox

| Critère | Grid | Flexbox |
|---------|------|---------|
| **Dimension** | 2D (lignes + colonnes) | 1D (ligne ou colonne) |
| **Usage** | Layouts complexes | Composants simples |
| **Alignement** | Items et grille | Items uniquement |
| **Ordre** | Visuel (areas, span) | Séquentiel (order) |

**Règle** : Grid pour layouts de page, Flexbox pour composants.

## Fonctions Utiles

### minmax()

```css
grid-template-columns: minmax(200px, 1fr); /* Min 200px, Max 1fr */
```

### repeat()

```css
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(auto-fit, 200px);
```

### auto-fill vs auto-fit

```css
/* auto-fill : Crée colonnes vides */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit : Collapse colonnes vides */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

## Résumé

**Container** :
- `display: grid`
- `grid-template-columns` : Définir colonnes
- `grid-template-rows` : Définir lignes
- `grid-template-areas` : Layout nommé
- `gap` : Espacement

**Items** :
- `grid-column` / `grid-row` : Positionnement
- `grid-area` : Zone nommée
- `span` : Étendre sur plusieurs cellules

**Usage** : Layouts de page, dashboards, grilles responsives.
