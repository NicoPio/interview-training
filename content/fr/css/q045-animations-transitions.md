---
id: 45
slug: animations-transitions
title: 'Quelle est la différence entre transitions et animations CSS ?'
category: css
difficulty: medium
tags: ['animations', 'transitions', 'keyframes', 'transform']
---

# Quelle est la différence entre transitions et animations CSS ?

Les transitions et animations permettent de créer des effets visuels, mais avec des approches différentes.

## Transitions

**Définition** : Interpolation entre deux états lors d'un changement.

### Syntaxe

```css
.element {
  transition: property duration timing-function delay;
}
```

### Exemple Simple

```css
.button {
  background: blue;
  transition: background 0.3s ease;
}

.button:hover {
  background: darkblue;
}
```

### Propriétés

```css
.element {
  /* Propriété à animer */
  transition-property: background-color;

  /* Durée */
  transition-duration: 0.3s;

  /* Fonction de timing */
  transition-timing-function: ease;

  /* Délai */
  transition-delay: 0.1s;
}

/* Raccourci */
.element {
  transition: background-color 0.3s ease 0.1s;
}

/* Multiples propriétés */
.element {
  transition:
    background 0.3s ease,
    transform 0.2s ease-in-out,
    opacity 0.5s linear;
}

/* Toutes propriétés */
.element {
  transition: all 0.3s ease;
}
```

### Timing Functions

```css
.element {
  /* Prédéfinies */
  transition-timing-function: linear;        /* Vitesse constante */
  transition-timing-function: ease;          /* Lent-rapide-lent (défaut) */
  transition-timing-function: ease-in;       /* Lent au début */
  transition-timing-function: ease-out;      /* Lent à la fin */
  transition-timing-function: ease-in-out;   /* Lent début et fin */

  /* Cubic-bezier personnalisé */
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

  /* Steps */
  transition-timing-function: steps(4, end); /* 4 étapes */
}
```

### Exemples

```css
/* Bouton hover */
.button {
  background: blue;
  transform: scale(1);
  transition: all 0.2s ease;
}

.button:hover {
  background: darkblue;
  transform: scale(1.05);
}

/* Input focus */
input {
  border: 1px solid #ddd;
  transition: border-color 0.2s;
}

input:focus {
  border-color: blue;
}

/* Card hover */
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
```

## Animations

**Définition** : Séquence d'états définie avec `@keyframes`.

### Syntaxe

```css
@keyframes nom-animation {
  from { /* État initial */ }
  to { /* État final */ }
}

/* Ou avec pourcentages */
@keyframes nom-animation {
  0% { }
  50% { }
  100% { }
}

.element {
  animation: nom-animation duration timing-function delay iteration-count direction fill-mode;
}
```

### Exemple Simple

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 1s ease;
}
```

### Propriétés

```css
.element {
  /* Nom de l'animation */
  animation-name: fadeIn;

  /* Durée */
  animation-duration: 1s;

  /* Fonction de timing */
  animation-timing-function: ease;

  /* Délai */
  animation-delay: 0.5s;

  /* Nombre d'itérations */
  animation-iteration-count: 3;      /* Nombre */
  animation-iteration-count: infinite; /* Infini */

  /* Direction */
  animation-direction: normal;        /* Normal */
  animation-direction: reverse;       /* Inverse */
  animation-direction: alternate;     /* Aller-retour */
  animation-direction: alternate-reverse;

  /* Fill mode */
  animation-fill-mode: none;          /* Défaut */
  animation-fill-mode: forwards;      /* Garde état final */
  animation-fill-mode: backwards;     /* Applique état initial pendant delay */
  animation-fill-mode: both;          /* forwards + backwards */

  /* Play state */
  animation-play-state: running;      /* En cours */
  animation-play-state: paused;       /* En pause */
}

/* Raccourci */
.element {
  animation: fadeIn 1s ease 0.5s infinite alternate both;
}
```

### Exemples d'Animations

#### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}
```

#### Spin (Loader)

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loader {
  animation: spin 1s linear infinite;
}
```

#### Pulse

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

#### Shake

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.5s;
}
```

#### Bounce

```css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}

.bounce {
  animation: bounce 1s;
}
```

#### Slide In

```css
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideInRight 0.5s ease-out;
}
```

## Comparaison

| Critère | Transition | Animation |
|---------|------------|-----------|
| **Déclenchement** | Changement état | Automatique |
| **Keyframes** | Non | Oui |
| **Étapes** | 2 (début/fin) | Multiple |
| **Loop** | Non | Oui (infinite) |
| **Pause** | Non | Oui |
| **Direction** | Une seule | Bidirectionnel |
| **Complexité** | Simple | Complexe |

## Propriétés Animables

### Transform

```css
.element {
  /* Translate */
  transform: translateX(100px);
  transform: translateY(50px);
  transform: translate(100px, 50px);

  /* Scale */
  transform: scale(1.5);
  transform: scaleX(2);

  /* Rotate */
  transform: rotate(45deg);

  /* Skew */
  transform: skew(10deg);

  /* Multiple */
  transform: translateX(50px) rotate(45deg) scale(1.2);
}
```

### Opacity

```css
.element {
  opacity: 0; /* Transparent */
  opacity: 1; /* Opaque */
}
```

### Colors

```css
.element {
  background-color: blue;
  color: white;
  border-color: red;
}
```

## Performance

### ✅ Performant (GPU)

```css
/* Transform */
transform: translate(), scale(), rotate();

/* Opacity */
opacity: 0.5;
```

### ❌ Lent (CPU)

```css
/* Position */
top, right, bottom, left

/* Dimensions */
width, height

/* Margin/Padding */
margin, padding
```

**Règle** : Privilégier `transform` et `opacity`.

## Bonnes Pratiques

### Will-change

```css
.element {
  will-change: transform, opacity;
}

/* Ou au hover */
.element:hover {
  will-change: transform;
}
```

**⚠️ Attention** : N'utilisez que pour animations complexes.

### Préférence Réduite

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Raccourcis

```css
/* ❌ Verbeux */
.element {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
}

/* ✅ Concis */
.element {
  transition: all 0.3s ease;
}
```

## JavaScript Control

```javascript
// Détecter fin animation
element.addEventListener('animationend', () => {
  console.log('Animation terminée');
});

// Détecter fin transition
element.addEventListener('transitionend', () => {
  console.log('Transition terminée');
});

// Pause/Resume
element.style.animationPlayState = 'paused';
element.style.animationPlayState = 'running';
```

## Résumé

**Transitions** :
- Changement d'état (hover, focus)
- 2 états (début → fin)
- Déclencheur requis
- Simple et rapide

**Animations** :
- Séquence avec @keyframes
- Multiple étapes
- Automatique
- Loop et direction

**Performance** :
- ✅ `transform` et `opacity`
- ❌ `width`, `height`, `top`, `left`

**Usage** :
- **Transition** : Hover, focus, états
- **Animation** : Loaders, onboarding, effets complexes
