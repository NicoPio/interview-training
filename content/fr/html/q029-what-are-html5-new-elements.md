---
id: 29
slug: what-are-html5-new-elements
title: 'Quels sont les nouveaux éléments introduits par HTML5 ?'
category: html
difficulty: easy
tags: ['html5', 'semantic', 'elements', 'structure']
---

# Quels sont les nouveaux éléments introduits par HTML5 ?

HTML5 a introduit de nombreux nouveaux éléments sémantiques et fonctionnels qui améliorent la structure et les capacités des documents web.

## Éléments de Structure Sémantique

### Éléments de Section

```html
<header>
  <h1>Titre du Site</h1>
  <nav>
    <ul>
      <li><a href="#home">Accueil</a></li>
      <li><a href="#about">À propos</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Titre de l'Article</h2>
    <p>Contenu de l'article...</p>
  </article>

  <aside>
    <h3>Information Complémentaire</h3>
    <p>Contenu secondaire...</p>
  </aside>
</main>

<footer>
  <p>&copy; 2025 Mon Site</p>
</footer>
```

**Éléments clés** :
- `<header>` : En-tête de page ou de section
- `<nav>` : Navigation principale
- `<main>` : Contenu principal (unique par page)
- `<article>` : Contenu autonome et réutilisable
- `<section>` : Section thématique générique
- `<aside>` : Contenu complémentaire
- `<footer>` : Pied de page

## Éléments Multimédia

### Audio et Vidéo Natifs

```html
<!-- Audio -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Votre navigateur ne supporte pas l'élément audio.
</audio>

<!-- Vidéo -->
<video width="640" height="360" controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track src="subtitles_fr.vtt" kind="subtitles" srclang="fr" label="Français">
  Votre navigateur ne supporte pas l'élément vidéo.
</video>
```

## Éléments de Contenu

### Figure et Figcaption

```html
<figure>
  <img src="diagram.png" alt="Diagramme d'architecture">
  <figcaption>Figure 1 : Architecture du système</figcaption>
</figure>
```

### Details et Summary

```html
<details>
  <summary>Cliquez pour voir plus d'informations</summary>
  <p>Contenu caché qui apparaît au clic.</p>
</details>
```

### Mark (Mise en Évidence)

```html
<p>Recherche : <mark>résultat</mark> trouvé dans le texte.</p>
```

### Time

```html
<time datetime="2025-11-18">18 novembre 2025</time>
<time datetime="2025-11-18T14:30:00">14h30</time>
```

## Éléments de Formulaire

### Nouveaux Types d'Input

```html
<form>
  <!-- Email avec validation -->
  <input type="email" name="email" placeholder="email@exemple.com">

  <!-- URL -->
  <input type="url" name="website" placeholder="https://exemple.com">

  <!-- Téléphone -->
  <input type="tel" name="phone" placeholder="+33 6 12 34 56 78">

  <!-- Nombre -->
  <input type="number" name="quantity" min="1" max="100" step="1">

  <!-- Range (curseur) -->
  <input type="range" name="volume" min="0" max="100" value="50">

  <!-- Date et Heure -->
  <input type="date" name="birthday">
  <input type="time" name="appointment">
  <input type="datetime-local" name="meeting">

  <!-- Couleur -->
  <input type="color" name="favorite-color" value="#ff0000">

  <!-- Recherche -->
  <input type="search" name="search" placeholder="Rechercher...">
</form>
```

### Datalist (Autocomplétion)

```html
<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>
```

### Progress et Meter

```html
<!-- Barre de progression -->
<progress value="70" max="100">70%</progress>

<!-- Jauge (avec min/max/optimal) -->
<meter value="0.6" min="0" max="1" low="0.3" high="0.7" optimum="0.8">60%</meter>
```

## Éléments Graphiques

### Canvas

```html
<canvas id="myCanvas" width="400" height="200">
  Votre navigateur ne supporte pas Canvas.
</canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 50);
</script>
```

### SVG Inline

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

## Éléments de Données

### Data (Attributs de données)

```html
<article data-post-id="12345" data-author="John Doe">
  <h2>Titre de l'article</h2>
</article>
```

### Output

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="number" id="a" value="0"> +
  <input type="number" id="b" value="0"> =
  <output name="result" for="a b">0</output>
</form>
```

## Avantages des Nouveaux Éléments HTML5

1. **Sémantique améliorée** : Meilleure structure et sens du contenu
2. **Accessibilité** : Facilite la navigation avec technologies d'assistance
3. **SEO** : Meilleure compréhension par les moteurs de recherche
4. **Maintenance** : Code plus lisible et maintenable
5. **Fonctionnalités natives** : Audio/vidéo sans plugins
6. **Validation** : Types d'input avec validation intégrée

## Résumé

HTML5 apporte :
- **Structure** : `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- **Multimédia** : `<audio>`, `<video>`, `<track>`
- **Contenu** : `<figure>`, `<figcaption>`, `<details>`, `<summary>`, `<mark>`, `<time>`
- **Formulaires** : Nouveaux types d'`<input>`, `<datalist>`, `<progress>`, `<meter>`, `<output>`
- **Graphiques** : `<canvas>`, `<svg>`

Ces éléments permettent de créer des applications web modernes, accessibles et sémantiquement riches.
