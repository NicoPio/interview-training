---
id: 41
slug: css-specificity
title: 'Comment fonctionne la spécificité CSS ?'
category: css
difficulty: medium
tags: ['specificity', 'selectors', 'cascade', 'priority']
---

# Comment fonctionne la spécificité CSS ?

La spécificité détermine quelle règle CSS est appliquée lorsque plusieurs règles ciblent le même élément.

## Calcul de la Spécificité

Format : `(inline, ID, class/attribut/pseudo-class, élément/pseudo-element)`

### Ordre de Priorité

1. **Inline styles** : `style="..."`
2. **IDs** : `#id`
3. **Classes, attributs, pseudo-classes** : `.class`, `[type]`, `:hover`
4. **Éléments, pseudo-elements** : `div`, `::before`

### Exemples

```css
/* (0, 0, 0, 1) */
p { color: black; }

/* (0, 0, 1, 0) */
.text { color: blue; }

/* (0, 1, 0, 0) */
#header { color: red; }

/* (1, 0, 0, 0) - Inline */
<p style="color: green">Text</p>
```

## Tableau de Spécificité

| Sélecteur | Spécificité | Valeur |
|-----------|-------------|--------|
| `*` | (0,0,0,0) | 0 |
| `p` | (0,0,0,1) | 1 |
| `.class` | (0,0,1,0) | 10 |
| `:hover` | (0,0,1,0) | 10 |
| `[type]` | (0,0,1,0) | 10 |
| `#id` | (0,1,0,0) | 100 |
| `style=""` | (1,0,0,0) | 1000 |

## Exemples Détaillés

```css
/* (0,0,0,1) = 1 */
p { color: black; }

/* (0,0,1,1) = 11 */
p.text { color: blue; }

/* (0,1,0,1) = 101 */
#header p { color: red; }

/* (0,1,1,1) = 111 */
#header p.text { color: green; }

/* (0,2,1,0) = 210 */
#header #nav .link { color: purple; }
```

### Qui Gagne ?

```html
<p id="intro" class="text highlight">Hello</p>
```

```css
/* (0,0,0,1) = 1 */
p { color: black; }

/* (0,0,1,0) = 10 - Gagne */
.text { color: blue; }

/* (0,1,0,0) = 100 - Gagne */
#intro { color: red; }

/* (1,0,0,0) = 1000 - Gagne */
<p style="color: green">Hello</p>
```

**Résultat** : Inline style (`green`) gagne.

## Combinaisons

```css
/* (0,0,1,2) = 12 */
ul.nav li { ... }

/* (0,1,0,2) = 102 */
#header ul li { ... }

/* (0,1,2,1) = 121 - Gagne */
#header ul.nav li.active { ... }
```

## !important

```css
p { color: black !important; } /* Priorité maximale */
.text { color: blue; }
```

**Ordre avec !important** :
1. `!important` inline
2. `!important` stylesheet
3. Inline style
4. Spécificité normale

**⚠️ À éviter** : Difficulté de maintenance.

## Sélecteur Universel

```css
/* (0,0,0,0) = 0 - Pas de spécificité */
* { margin: 0; }
```

**Note** : Ne contribue pas à la spécificité.

## Pseudo-classes vs Pseudo-elements

```css
/* (0,0,1,0) = 10 - Pseudo-class */
a:hover { color: red; }

/* (0,0,0,1) = 1 - Pseudo-element */
p::before { content: "→ "; }
```

## Héritage

```css
body { color: black; } /* Hérité */
p { /* Hérite color: black */ }
```

**Héritage < Spécificité** : Une règle directe gagne toujours sur l'héritage.

## Cascade

Ordre d'application (si même spécificité) :
1. User agent styles (navigateur)
2. User styles
3. Author styles (votre CSS)
4. **Dernière règle** (si égalité)

```css
p { color: blue; }
p { color: red; } /* Gagne - déclarée après */
```

## Bonnes Pratiques

### ❌ À Éviter

```css
/* Trop spécifique */
html body div#container ul.nav li.item a.link { ... }

/* Abus d'!important */
.button { color: blue !important; }

/* IDs pour styling */
#button-primary { background: blue; }
```

### ✅ Recommandé

```css
/* Classes simples */
.button { background: blue; }
.button--primary { background: darkblue; }

/* BEM (Block Element Modifier) */
.card { ... }
.card__title { ... }
.card--featured { ... }

/* Spécificité faible et modulaire */
.nav-link { color: black; }
.nav-link:hover { color: blue; }
```

## Outils de Debug

### DevTools

```
Inspecter élément → Computed → Filter
```

Affiche toutes les règles appliquées par ordre de spécificité.

### Specificity Calculator

```
https://specificity.keegan.st/
```

## Stratégies

### Utiliser des Classes

```css
/* ❌ */
#header nav ul li a { ... }

/* ✅ */
.nav-link { ... }
```

### Éviter !important

```css
/* ❌ */
.button { color: blue !important; }

/* ✅ - Augmenter spécificité */
.section .button { color: blue; }
```

### Ordre CSS

```css
/* Reset/Base */
* { box-sizing: border-box; }

/* Layout */
.container { ... }

/* Components */
.button { ... }

/* Utilities */
.mt-4 { margin-top: 1rem; }

/* States */
.is-active { ... }
```

## Résumé

**Calcul** : `(inline, IDs, classes, éléments)`

**Priorité** :
1. Inline style (1000)
2. ID (100)
3. Class/pseudo-class/attribut (10)
4. Élément/pseudo-element (1)

**Règles** :
- Plus spécifique gagne
- Si égal : dernière règle gagne
- `!important` surpasse tout (éviter)

**Best Practice** : Utiliser des **classes** avec **faible spécificité** pour faciliter la maintenance.
