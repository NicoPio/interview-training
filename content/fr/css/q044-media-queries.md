---
id: 44
slug: media-queries
title: 'Comment fonctionnent les media queries en CSS ?'
category: css
difficulty: medium
tags: ['media-queries', 'responsive', 'breakpoints', 'mobile-first']
---

# Comment fonctionnent les media queries en CSS ?

Les media queries permettent d'appliquer des styles CSS en fonction des caractéristiques du device (taille d'écran, orientation, etc.).

## Syntaxe

```css
@media (condition) {
  /* Styles */
}
```

## Breakpoints Communs

```css
/* Mobile (défaut) */
body { font-size: 14px; }

/* Tablet */
@media (min-width: 768px) {
  body { font-size: 16px; }
}

/* Desktop */
@media (min-width: 1024px) {
  body { font-size: 18px; }
}

/* Large Desktop */
@media (min-width: 1280px) {
  body { font-size: 20px; }
}
```

## Types de Media

```css
/* Screen (défaut pour web) */
@media screen { }

/* Print */
@media print {
  .no-print { display: none; }
  body { color: black; background: white; }
}

/* All (screen + print) */
@media all { }
```

## Features Communes

### Width

```css
/* Largeur minimale */
@media (min-width: 768px) { }

/* Largeur maximale */
@media (max-width: 767px) { }

/* Plage */
@media (min-width: 768px) and (max-width: 1023px) { }
```

### Height

```css
@media (min-height: 600px) { }
@media (max-height: 400px) { }
```

### Orientation

```css
/* Portrait (hauteur > largeur) */
@media (orientation: portrait) {
  .layout { flex-direction: column; }
}

/* Paysage (largeur > hauteur) */
@media (orientation: landscape) {
  .layout { flex-direction: row; }
}
```

### Aspect Ratio

```css
/* Ratio 16:9 */
@media (aspect-ratio: 16/9) { }

/* Ratio minimum */
@media (min-aspect-ratio: 16/9) { }
```

### Hover

```css
/* Device avec hover (souris) */
@media (hover: hover) {
  .button:hover { background: blue; }
}

/* Device sans hover (touch) */
@media (hover: none) {
  .button:active { background: blue; }
}
```

### Pointer

```css
/* Pointeur précis (souris) */
@media (pointer: fine) { }

/* Pointeur imprécis (doigt) */
@media (pointer: coarse) {
  .button { padding: 12px 24px; /* Plus grand */ }
}
```

### Prefers

```css
/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: white;
  }
}

/* Réduction animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Contraste élevé */
@media (prefers-contrast: high) {
  body { font-weight: 600; }
}
```

## Opérateurs Logiques

### AND

```css
/* Tablet en paysage */
@media (min-width: 768px) and (orientation: landscape) { }
```

### OR (virgule)

```css
/* Tablet OU Desktop */
@media (min-width: 768px), (min-width: 1024px) { }
```

### NOT

```css
/* Pas un écran */
@media not screen { }
```

## Approches Responsive

### Mobile-First (Recommandé)

```css
/* Mobile (défaut) */
.container {
  padding: 10px;
  font-size: 14px;
}

/* Tablet et plus */
@media (min-width: 768px) {
  .container {
    padding: 20px;
    font-size: 16px;
  }
}

/* Desktop et plus */
@media (min-width: 1024px) {
  .container {
    padding: 30px;
    font-size: 18px;
  }
}
```

**Avantages** :
- Performance mobile
- Progressive enhancement
- Plus simple

### Desktop-First

```css
/* Desktop (défaut) */
.sidebar {
  width: 300px;
  float: left;
}

/* Tablet */
@media (max-width: 1023px) {
  .sidebar { width: 250px; }
}

/* Mobile */
@media (max-width: 767px) {
  .sidebar {
    width: 100%;
    float: none;
  }
}
```

## Exemples Pratiques

### Navigation Responsive

```css
/* Mobile : Menu burger */
.nav-toggle {
  display: block;
}

.nav-menu {
  display: none;
}

.nav-menu.active {
  display: block;
}

/* Desktop : Menu horizontal */
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }

  .nav-menu {
    display: flex;
  }
}
```

### Grid Responsive

```css
.grid {
  display: grid;
  gap: 1rem;
}

/* Mobile : 1 colonne */
.grid {
  grid-template-columns: 1fr;
}

/* Tablet : 2 colonnes */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop : 3 colonnes */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Typographie Fluide

```css
body {
  font-size: 14px;
}

@media (min-width: 768px) {
  body { font-size: 16px; }
}

@media (min-width: 1024px) {
  body { font-size: 18px; }
}

/* Ou avec clamp() */
body {
  font-size: clamp(14px, 2vw, 20px);
}
```

### Images Responsives

```html
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description">
</picture>
```

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Container Queries (Nouveau)

```css
.container {
  container-type: inline-size;
}

/* Styles basés sur la taille du container */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## Print Styles

```css
@media print {
  /* Masquer navigation */
  nav, .no-print {
    display: none !important;
  }

  /* Forcer couleurs */
  body {
    color: black;
    background: white;
  }

  /* Éviter coupures */
  h2, h3 {
    page-break-after: avoid;
  }

  /* Afficher URLs */
  a[href]::after {
    content: " (" attr(href) ")";
  }
}
```

## JavaScript Detection

```javascript
// Écouter changement de breakpoint
const mediaQuery = window.matchMedia('(min-width: 768px)');

function handleBreakpoint(e) {
  if (e.matches) {
    console.log('Desktop');
  } else {
    console.log('Mobile');
  }
}

mediaQuery.addListener(handleBreakpoint);
handleBreakpoint(mediaQuery); // Check initial
```

## Bonnes Pratiques

### Breakpoints Sémantiques

```css
/* ❌ Device-specific */
@media (min-width: 320px) { /* iPhone SE */ }
@media (min-width: 375px) { /* iPhone X */ }

/* ✅ Content-based */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

### Variables CSS

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}

/* Impossible en CSS pur, utiliser avec preprocessing */
```

### Mobile-First

```css
/* ✅ min-width (mobile-first) */
@media (min-width: 768px) { }

/* ❌ max-width (desktop-first) */
@media (max-width: 767px) { }
```

## Résumé

**Syntaxe** : `@media (condition) { styles }`

**Conditions** :
- `min-width` / `max-width`
- `orientation`
- `hover` / `pointer`
- `prefers-color-scheme`
- `prefers-reduced-motion`

**Approche** : Mobile-first avec `min-width`

**Breakpoints** :
- Mobile : < 768px
- Tablet : 768px - 1023px
- Desktop : ≥ 1024px

**Usage** : Navigation, grids, typographie, images responsives.
