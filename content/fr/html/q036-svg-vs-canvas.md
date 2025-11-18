---
id: 36
slug: svg-vs-canvas
title: 'Quelle est la différence entre SVG et Canvas ?'
category: html
difficulty: medium
tags: ['svg', 'canvas', 'graphics', 'performance']
---

# Quelle est la différence entre SVG et Canvas ?

SVG et Canvas sont deux technologies pour créer des graphiques dans le navigateur, mais avec des approches fondamentalement différentes.

## SVG (Scalable Vector Graphics)

### Caractéristiques

- **Basé sur XML** : Markup déclaratif
- **Vectoriel** : Qualité indépendante de la résolution
- **DOM** : Chaque élément est un nœud DOM
- **Événements** : Événements sur chaque forme

### Syntaxe

```html
<svg width="200" height="200">
  <!-- Cercle -->
  <circle cx="100" cy="100" r="50" fill="blue" />

  <!-- Rectangle -->
  <rect x="20" y="20" width="60" height="40" fill="red" />

  <!-- Ligne -->
  <line x1="0" y1="0" x2="200" y2="200" stroke="black" stroke-width="2" />

  <!-- Polygone -->
  <polygon points="100,10 40,198 190,78 10,78 160,198" fill="green" />

  <!-- Texte -->
  <text x="100" y="100" text-anchor="middle" fill="white">Texte</text>
</svg>
```

### Manipulation JavaScript

```javascript
// Créer un cercle
const svg = document.querySelector('svg');
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '50');
circle.setAttribute('fill', 'blue');
svg.appendChild(circle);

// Événements
circle.addEventListener('click', () => {
  circle.setAttribute('fill', 'red');
});

// Animation CSS
circle.style.transition = 'all 0.3s';
circle.style.transform = 'scale(1.2)';
```

## Canvas

### Caractéristiques

- **Basé sur JavaScript** : API impérative
- **Pixel/Raster** : Dessine pixel par pixel
- **Pas de DOM** : Tout dans un seul élément `<canvas>`
- **Pas d'événements** : Gestion manuelle des interactions

### Syntaxe

```html
<canvas id="myCanvas" width="200" height="200"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Cercle
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

// Rectangle
ctx.fillStyle = 'red';
ctx.fillRect(20, 20, 60, 40);

// Ligne
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 200);
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.stroke();

// Texte
ctx.font = '20px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.fillText('Texte', 100, 100);
</script>
```

## Comparaison

| Critère | SVG | Canvas |
|---------|-----|--------|
| **Type** | Vectoriel (XML/DOM) | Raster (Pixels) |
| **Scalabilité** | ✅ Parfaite | ❌ Pixelisé au zoom |
| **Performance** | ❌ Lente (beaucoup d'objets) | ✅ Rapide |
| **DOM** | ✅ Chaque élément | ❌ Un seul élément |
| **Événements** | ✅ Natifs sur formes | ❌ Manuels |
| **Animations** | ✅ CSS/SMIL | ⚠️ JavaScript requis |
| **Accessibilité** | ✅ Screen readers | ❌ Difficile |
| **Modification** | ✅ Facile (setAttribute) | ❌ Redessiner tout |
| **Résolution** | ✅ Indépendante | ⚠️ Dépend du canvas |

## Cas d'Usage

### SVG - Quand l'utiliser

✅ **Icônes et logos**
```html
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="gold"/>
</svg>
```

✅ **Graphiques interactifs**
```html
<svg>
  <g class="bar" data-value="75">
    <rect x="10" y="25" width="30" height="75" fill="blue"/>
    <text x="25" y="110">75%</text>
  </g>
</svg>

<style>
.bar:hover rect { fill: darkblue; }
</style>
```

✅ **Animations CSS**
```html
<svg>
  <circle class="pulse" cx="50" cy="50" r="20"/>
</svg>

<style>
@keyframes pulse {
  0%, 100% { r: 20; }
  50% { r: 30; }
}
.pulse { animation: pulse 2s infinite; }
</style>
```

### Canvas - Quand l'utiliser

✅ **Jeux vidéo**
```javascript
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner fond
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dessiner joueur
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, 20, 20);

  requestAnimationFrame(gameLoop);
}
```

✅ **Manipulation d'images**
```javascript
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0);

  // Appliquer filtre (grayscale)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const gray = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
    imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = gray;
  }
  ctx.putImageData(imageData, 0, 0);
};
img.src = 'photo.jpg';
```

✅ **Visualisations complexes (milliers d'objets)**
```javascript
// Dessiner 10000 particules
for (let i = 0; i < 10000; i++) {
  ctx.fillStyle = `hsl(${i % 360}, 100%, 50%)`;
  ctx.fillRect(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    2, 2
  );
}
```

## Performance

### SVG

```html
<!-- ❌ Lent : 1000+ éléments DOM -->
<svg>
  <circle cx="10" cy="10" r="5"/>
  <circle cx="20" cy="20" r="5"/>
  <!-- ... 1000 cercles ... -->
</svg>
```

**Limite** : ~1000 éléments avant ralentissement.

### Canvas

```javascript
// ✅ Rapide : 10000+ objets
for (let i = 0; i < 10000; i++) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
}
```

**Limite** : Dépend du GPU, peut gérer des millions de pixels.

## Accessibilité

### SVG

```html
<svg role="img" aria-labelledby="chart-title">
  <title id="chart-title">Graphique des ventes 2025</title>
  <desc>Ce graphique montre une augmentation de 25%</desc>
  <!-- Éléments -->
</svg>
```

✅ Screen readers peuvent lire le contenu.

### Canvas

```html
<canvas aria-label="Graphique des ventes 2025">
  <!-- Fallback texte -->
  Ce graphique montre une augmentation de 25%
</canvas>
```

⚠️ Nécessite fallback textuel.

## Résumé

**SVG** :
- ✅ Vectoriel, scalable
- ✅ DOM, événements faciles
- ✅ CSS animations
- ❌ Performance limitée (<1000 objets)
- **Usage** : Icônes, logos, UI, graphiques simples

**Canvas** :
- ✅ Haute performance (>10000 objets)
- ✅ Manipulation pixels
- ❌ Pixelisé au zoom
- ❌ Pas de DOM ni événements natifs
- **Usage** : Jeux, visualisations complexes, édition images

**Règle** : SVG pour UI et graphiques statiques, Canvas pour animations complexes et jeux.
