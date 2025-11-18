---
id: 40
slug: css-position
title: 'Quelles sont les différences entre les propriétés position en CSS ?'
category: css
difficulty: medium
tags: ['position', 'layout', 'static', 'relative', 'absolute', 'fixed', 'sticky']
---

# Quelles sont les différences entre les propriétés position en CSS ?

La propriété `position` définit comment un élément est positionné dans le document.

## Position: static (Défaut)

```css
.element {
  position: static; /* Défaut */
}
```

**Comportement** :
- Flow normal du document
- `top`, `right`, `bottom`, `left` ignorés
- `z-index` ignoré

**Usage** : Comportement par défaut, rarement déclaré explicitement.

## Position: relative

```css
.element {
  position: relative;
  top: 20px;    /* Descend de 20px */
  left: 10px;   /* Va à droite de 10px */
}
```

**Comportement** :
- Reste dans le flow (espace réservé)
- Déplacé **par rapport à sa position initiale**
- `z-index` fonctionne
- Crée un contexte de positionnement pour enfants `absolute`

**Exemple** :
```html
<div class="relative-box">
  Je suis décalé de 20px vers le bas
</div>
```

```css
.relative-box {
  position: relative;
  top: 20px;
  background: lightblue;
}
```

## Position: absolute

```css
.element {
  position: absolute;
  top: 0;
  right: 0;
}
```

**Comportement** :
- Retiré du flow (n'occupe plus d'espace)
- Positionné par rapport au **premier parent positionné** (non-static)
- Si aucun parent positionné : par rapport à `<html>`
- `z-index` fonctionne

**Exemple** :
```html
<div class="container">
  <div class="absolute-box">En haut à droite du container</div>
</div>
```

```css
.container {
  position: relative; /* Context pour absolute */
  width: 400px;
  height: 300px;
  border: 2px solid black;
}

.absolute-box {
  position: absolute;
  top: 10px;
  right: 10px;
  background: coral;
}
```

## Position: fixed

```css
.element {
  position: fixed;
  top: 0;
  right: 0;
}
```

**Comportement** :
- Retiré du flow
- Positionné par rapport au **viewport** (fenêtre)
- Reste fixe lors du scroll
- `z-index` fonctionne

**Exemple** :
```html
<button class="back-to-top">↑ Haut</button>
```

```css
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}
```

## Position: sticky

```css
.element {
  position: sticky;
  top: 0;
}
```

**Comportement** :
- Hybride `relative` + `fixed`
- Reste dans le flow jusqu'à un seuil (`top`, `bottom`)
- Devient "collé" au viewport après le seuil
- Contexte : parent scrollable

**Exemple** :
```html
<div class="container">
  <h2 class="sticky-header">Header Sticky</h2>
  <p>Contenu long...</p>
</div>
```

```css
.container {
  height: 400px;
  overflow: auto;
}

.sticky-header {
  position: sticky;
  top: 0;
  background: white;
  padding: 10px;
  border-bottom: 2px solid #ddd;
  z-index: 10;
}
```

## Tableau Comparatif

| Position | Dans le Flow | Référence | Scroll | z-index |
|----------|-------------|-----------|--------|---------|
| `static` | ✅ Oui | N/A | Scroll | ❌ Non |
| `relative` | ✅ Oui | Lui-même | Scroll | ✅ Oui |
| `absolute` | ❌ Non | Parent positionné | Scroll | ✅ Oui |
| `fixed` | ❌ Non | Viewport | Fixe | ✅ Oui |
| `sticky` | ✅ Oui (puis fixe) | Parent scrollable | Hybride | ✅ Oui |

## Propriétés de Positionnement

```css
.element {
  top: 10px;     /* Distance du haut */
  right: 20px;   /* Distance de la droite */
  bottom: 30px;  /* Distance du bas */
  left: 40px;    /* Distance de la gauche */
}
```

**Valeurs** : `px`, `%`, `em`, `rem`, `auto`

## Exemples Pratiques

### Modal Centrée (absolute)

```html
<div class="overlay">
  <div class="modal">
    <h2>Modal Centrée</h2>
    <p>Contenu...</p>
  </div>
</div>
```

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
}
```

### Badge sur Icon (absolute)

```html
<div class="icon-wrapper">
  <svg><!-- Icon --></svg>
  <span class="badge">3</span>
</div>
```

```css
.icon-wrapper {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
```

### Header Sticky

```css
header {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
}
```

### Footer Fixed en Bas

```css
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}
```

## z-index et Stacking Context

```css
.element {
  position: relative; /* Ou absolute, fixed, sticky */
  z-index: 10; /* Plus grand = dessus */
}
```

**Règles** :
- `z-index` fonctionne uniquement si `position` ≠ `static`
- Valeurs négatives possibles
- Crée un stacking context

**Exemple** :
```css
.modal-overlay {
  position: fixed;
  z-index: 1000; /* Au-dessus du contenu */
}

.tooltip {
  position: absolute;
  z-index: 9999; /* Au-dessus de la modal */
}
```

## Résumé

**static** :
- Défaut, flow normal
- Pas de positionnement

**relative** :
- Décalage par rapport à soi
- Reste dans le flow
- Context pour absolute

**absolute** :
- Retiré du flow
- Par rapport au parent positionné
- Overlays, tooltips

**fixed** :
- Par rapport au viewport
- Fixe au scroll
- Headers, footers, boutons flottants

**sticky** :
- Hybride relative + fixed
- Colle au scroll
- Headers de sections

**Astuce** : Utilisez `relative` sur le parent pour contrôler le contexte des enfants `absolute`.
