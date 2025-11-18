---
id: 43
slug: css-variables
title: 'Comment fonctionnent les variables CSS (Custom Properties) ?'
category: css
difficulty: easy
tags: ['variables', 'custom-properties', 'css', 'theming']
---

# Comment fonctionnent les variables CSS (Custom Properties) ?

Les variables CSS (ou Custom Properties) permettent de stocker et réutiliser des valeurs dans vos styles.

## Syntaxe

### Définition

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --spacing-unit: 8px;
  --font-size-large: 1.5rem;
}
```

**Convention** : Préfixe `--` obligatoire.

### Utilisation

```css
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
  font-size: var(--font-size-large);
}
```

## Portée (Scope)

### Globale (:root)

```css
:root {
  --color: blue;
}

/* Disponible partout */
.element { color: var(--color); }
```

### Locale

```css
.card {
  --card-padding: 20px;
}

.card .title {
  padding: var(--card-padding); /* Fonctionne */
}

.other {
  padding: var(--card-padding); /* Ne fonctionne pas */
}
```

## Valeur par Défaut

```css
.element {
  /* Si --color n'existe pas, utilise blue */
  color: var(--color, blue);

  /* Fallback multiple */
  color: var(--primary, var(--secondary, black));
}
```

## Exemples Pratiques

### Thème (Dark Mode)

```css
:root {
  --bg-color: white;
  --text-color: black;
  --border-color: #ddd;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: white;
  --border-color: #444;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.card {
  border: 1px solid var(--border-color);
}
```

```javascript
// Toggle theme
document.documentElement.setAttribute('data-theme', 'dark');
```

### Espacement Cohérent

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

.button {
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.section {
  padding: var(--spacing-xl);
}
```

### Palette de Couleurs

```css
:root {
  /* Couleurs primaires */
  --primary-50: #e3f2fd;
  --primary-500: #2196f3;
  --primary-700: #1976d2;

  /* Couleurs sémantiques */
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
}

.button-primary {
  background: var(--primary-500);
}

.button-primary:hover {
  background: var(--primary-700);
}
```

### Typographie

```css
:root {
  --font-family-base: 'Inter', sans-serif;
  --font-family-heading: 'Poppins', sans-serif;

  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
}

h1 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}
```

## Manipulation JavaScript

### Lire

```javascript
// Depuis :root
const root = document.documentElement;
const primaryColor = getComputedStyle(root)
  .getPropertyValue('--primary-color');
console.log(primaryColor); // "#007bff"
```

### Écrire

```javascript
// Modifier variable globale
document.documentElement.style
  .setProperty('--primary-color', '#ff0000');

// Modifier variable locale
const card = document.querySelector('.card');
card.style.setProperty('--card-padding', '30px');
```

### Exemple Interactif

```html
<input type="color" id="colorPicker" value="#007bff">
<button class="btn">Mon Bouton</button>
```

```javascript
const picker = document.getElementById('colorPicker');
picker.addEventListener('input', (e) => {
  document.documentElement.style
    .setProperty('--primary-color', e.target.value);
});
```

```css
.btn {
  background: var(--primary-color);
}
```

## Calculs avec calc()

```css
:root {
  --base-size: 16px;
  --scale: 1.5;
}

.large {
  font-size: calc(var(--base-size) * var(--scale));
  /* = 24px */
}

.container {
  --padding: 20px;
  width: calc(100% - var(--padding) * 2);
}
```

## Responsive Variables

```css
:root {
  --container-width: 100%;
  --grid-columns: 1;
}

@media (min-width: 768px) {
  :root {
    --container-width: 750px;
    --grid-columns: 2;
  }
}

@media (min-width: 1200px) {
  :root {
    --container-width: 1140px;
    --grid-columns: 3;
  }
}

.container {
  max-width: var(--container-width);
}

.grid {
  grid-template-columns: repeat(var(--grid-columns), 1fr);
}
```

## Avantages

✅ **Réutilisabilité** : Définir une fois, utiliser partout
✅ **Maintenance** : Changer en un seul endroit
✅ **Theming** : Dark mode, multi-thèmes faciles
✅ **JavaScript** : Manipulation dynamique
✅ **Cascade** : Héritent normalement
✅ **Performance** : Natif, pas de preprocessing

## Limitations

❌ **Pas dans media queries** :
```css
/* ❌ Ne fonctionne pas */
@media (min-width: var(--breakpoint-md)) { }
```

❌ **Pas dans propriétés** :
```css
/* ❌ Ne fonctionne pas */
.element {
  var(--property-name): value;
}
```

❌ **Support navigateur** :
- IE11 ne supporte pas
- Tous les navigateurs modernes ✅

## Comparaison avec Preprocesseurs

### Variables CSS

```css
:root {
  --color: blue;
}

.element {
  color: var(--color);
}

/* Changement dynamique possible */
```

**✅ Avantages** :
- Dynamique (modifiable avec JS)
- Cascade normale
- Natif (pas de build)

### Variables Sass/Less

```scss
$color: blue;

.element {
  color: $color;
}

/* Compilé en : */
.element {
  color: blue;
}
```

**✅ Avantages** :
- Utilisable dans media queries
- Compile-time, plus de possibilités

## Design System Exemple

```css
:root {
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Colors */
  --gray-100: #f7fafc;
  --gray-200: #edf2f7;
  --gray-500: #a0aec0;
  --gray-900: #1a202c;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);

  /* Borders */
  --border-radius-sm: 0.125rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;

  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
}

.card {
  padding: var(--space-4);
  background: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

## Résumé

**Définition** :
```css
--nom-variable: valeur;
```

**Utilisation** :
```css
property: var(--nom-variable);
property: var(--nom, fallback);
```

**Portée** :
- `:root` pour global
- Sélecteur spécifique pour local

**Usages** :
- Theming (dark mode)
- Design systems
- Valeurs réutilisables
- Manipulation JavaScript

**Avantage** : Dynamique, modifiable au runtime, natif.
