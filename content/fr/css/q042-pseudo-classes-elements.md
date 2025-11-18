---
id: 42
slug: pseudo-classes-elements
title: 'Quelle est la différence entre pseudo-classes et pseudo-elements ?'
category: css
difficulty: easy
tags: ['pseudo-classes', 'pseudo-elements', 'selectors', 'css']
---

# Quelle est la différence entre pseudo-classes et pseudo-elements ?

Les pseudo-classes et pseudo-elements permettent de cibler des états ou parties spécifiques d'éléments.

## Pseudo-classes (`:`)

**Définition** : Cible un **état** spécifique d'un élément.

**Syntaxe** : Un seul deux-points `:`

### États Interactifs

```css
/* Survol */
a:hover { color: blue; }

/* Focus */
input:focus { border-color: blue; }

/* Active (clic) */
button:active { transform: scale(0.98); }

/* Visité */
a:visited { color: purple; }
```

### États Structurels

```css
/* Premier enfant */
li:first-child { font-weight: bold; }

/* Dernier enfant */
li:last-child { border-bottom: none; }

/* N-ième enfant */
li:nth-child(2) { background: #f0f0f0; }
li:nth-child(odd) { background: #fff; }  /* Impairs */
li:nth-child(even) { background: #eee; } /* Pairs */
li:nth-child(3n) { color: red; }         /* 3, 6, 9... */

/* Premier du type */
p:first-of-type { margin-top: 0; }

/* Unique enfant */
p:only-child { text-align: center; }
```

### États de Formulaire

```css
/* Disabled */
input:disabled { opacity: 0.5; cursor: not-allowed; }

/* Enabled */
input:enabled { background: white; }

/* Checked */
input:checked { accent-color: blue; }

/* Required */
input:required { border-color: orange; }

/* Valide */
input:valid { border-color: green; }

/* Invalide */
input:invalid { border-color: red; }

/* Placeholder shown */
input:placeholder-shown { font-style: italic; }
```

### Autres Pseudo-classes

```css
/* Vide */
div:empty { display: none; }

/* Pas */
li:not(.active) { opacity: 0.5; }

/* Lien */
a:link { color: blue; }

/* Racine */
:root { --primary-color: blue; }
```

## Pseudo-elements (`::`)

**Définition** : Cible une **partie** spécifique d'un élément ou crée du contenu virtuel.

**Syntaxe** : Deux deux-points `::`

### ::before et ::after

```css
/* Ajoute contenu AVANT */
.icon::before {
  content: "→ ";
  color: blue;
}

/* Ajoute contenu APRÈS */
.external-link::after {
  content: " ↗";
  font-size: 0.8em;
}
```

**HTML** :
```html
<span class="icon">Texte</span>
<!-- Rendu : → Texte -->
```

### ::first-letter

```css
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  float: left;
  margin-right: 5px;
}
```

### ::first-line

```css
p::first-line {
  font-weight: bold;
  color: blue;
}
```

### ::selection

```css
::selection {
  background: yellow;
  color: black;
}
```

### ::placeholder

```css
input::placeholder {
  color: #999;
  font-style: italic;
}
```

### ::marker (listes)

```css
li::marker {
  color: red;
  font-weight: bold;
}
```

## Tableau Comparatif

| Critère | Pseudo-class | Pseudo-element |
|---------|--------------|----------------|
| **Syntaxe** | `:` | `::` |
| **Cible** | État | Partie/Contenu |
| **Exemples** | `:hover`, `:focus` | `::before`, `::after` |
| **Nombre** | Multiple | Un seul par sélecteur |
| **Contenu** | Non | Oui (`content`) |

## Exemples Pratiques

### Icônes avec ::before

```html
<button class="btn-save">Enregistrer</button>
```

```css
.btn-save::before {
  content: "💾 ";
}
```

### Badge avec ::after

```html
<a href="#" class="new-item">Article</a>
```

```css
.new-item::after {
  content: "New";
  background: red;
  color: white;
  font-size: 0.7em;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 8px;
}
```

### Tooltip Custom

```html
<button data-tooltip="Cliquez pour enregistrer">💾</button>
```

```css
[data-tooltip] {
  position: relative;
}

[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 0.875rem;
}
```

### Checkbox Stylisé

```html
<label class="checkbox">
  <input type="checkbox">
  <span>Accepter les conditions</span>
</label>
```

```css
.checkbox input {
  display: none;
}

.checkbox input + span::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  margin-right: 8px;
  vertical-align: middle;
}

.checkbox input:checked + span::before {
  content: "✓";
  background: blue;
  color: white;
  text-align: center;
  line-height: 20px;
  border-color: blue;
}
```

### Navigation avec États

```html
<nav>
  <a href="/" class="active">Accueil</a>
  <a href="/about">À propos</a>
  <a href="/contact">Contact</a>
</nav>
```

```css
nav a {
  padding: 10px 20px;
  color: black;
  text-decoration: none;
}

/* Pseudo-class : État */
nav a:hover {
  background: #f0f0f0;
}

nav a.active {
  color: blue;
  font-weight: bold;
}

/* Pseudo-element : Partie */
nav a.active::before {
  content: "→ ";
  color: blue;
}
```

### Clearfix

```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

## Combinaisons

```css
/* Pseudo-class + Pseudo-element */
a:hover::after {
  content: " →";
}

/* Multiple pseudo-classes */
input:focus:invalid {
  border-color: red;
}
```

## Limites

### Un seul ::before/::after par élément

```css
/* ❌ Ne fonctionne pas */
.element::before { content: "A"; }
.element::before { content: "B"; } /* Écrase le premier */

/* ✅ Utiliser des éléments enfants */
.element::before { content: "A"; }
.element span::before { content: "B"; }
```

### content requis

```css
/* ❌ Ne s'affiche pas */
.element::before {
  background: red;
}

/* ✅ content obligatoire */
.element::before {
  content: "";
  background: red;
  display: block;
  width: 20px;
  height: 20px;
}
```

## Résumé

**Pseudo-classes (`:`)** :
- États : `:hover`, `:focus`, `:active`
- Structure : `:first-child`, `:nth-child()`
- Formulaires : `:disabled`, `:checked`, `:valid`

**Pseudo-elements (`::`)** :
- Contenu : `::before`, `::after`
- Styling : `::first-letter`, `::first-line`
- Interaction : `::selection`, `::placeholder`

**Règle** : `:` pour états, `::` pour parties/contenu.
