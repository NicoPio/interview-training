---
id: 30
slug: difference-between-id-and-class
title: 'Quelle est la différence entre id et class en HTML ?'
category: html
difficulty: easy
tags: ['attributes', 'selectors', 'css', 'id', 'class']
---

# Quelle est la différence entre id et class en HTML ?

Les attributs `id` et `class` sont utilisés pour identifier et styliser les éléments HTML, mais ils ont des objectifs et des règles d'utilisation différents.

## Attribut ID

### Caractéristiques

- **Unique** : Un `id` doit être unique dans toute la page
- **Une seule valeur** : Un élément ne peut avoir qu'un seul `id`
- **Haute spécificité CSS** : Plus spécifique qu'une classe
- **Ancres de navigation** : Peut être utilisé pour créer des liens internes

### Syntaxe

```html
<div id="header">En-tête</div>
<section id="about">À propos</section>
```

### Utilisation en CSS

```css
/* Sélecteur ID (préfixe #) */
#header {
  background-color: blue;
  padding: 20px;
}

#about {
  margin-top: 50px;
}
```

### Utilisation en JavaScript

```javascript
// Accès direct par ID (très performant)
const header = document.getElementById('header');

// ou avec querySelector
const header2 = document.querySelector('#header');
```

### Liens d'Ancre

```html
<!-- Lien vers un élément avec id -->
<a href="#section-contact">Aller au contact</a>

<!-- Élément cible -->
<section id="section-contact">
  <h2>Contactez-nous</h2>
</section>
```

## Attribut Class

### Caractéristiques

- **Réutilisable** : Peut être utilisé sur plusieurs éléments
- **Valeurs multiples** : Un élément peut avoir plusieurs classes
- **Spécificité CSS moyenne** : Moins spécifique qu'un ID
- **Stylis

ation groupée** : Idéal pour appliquer le même style à plusieurs éléments

### Syntaxe

```html
<!-- Une seule classe -->
<div class="card">Carte</div>

<!-- Plusieurs classes (séparées par des espaces) -->
<div class="card featured large">Carte mise en avant</div>
<div class="card small">Petite carte</div>
```

### Utilisation en CSS

```css
/* Sélecteur de classe (préfixe .) */
.card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.featured {
  background-color: gold;
  font-weight: bold;
}

.large {
  font-size: 1.5rem;
}

.small {
  font-size: 0.8rem;
}
```

### Utilisation en JavaScript

```javascript
// Accès par classe
const cards = document.getElementsByClassName('card'); // HTMLCollection
const cards2 = document.querySelectorAll('.card');      // NodeList

// Manipulation des classes
const element = document.querySelector('.card');
element.classList.add('featured');
element.classList.remove('small');
element.classList.toggle('active');
element.classList.contains('large'); // true/false
```

## Comparaison Directe

| Critère | ID | Class |
|---------|-----|-------|
| **Unicité** | Doit être unique dans la page | Peut être réutilisé |
| **Multiplicité** | Un seul par élément | Plusieurs par élément |
| **Spécificité CSS** | Haute (100) | Moyenne (10) |
| **Syntaxe CSS** | `#nom` | `.nom` |
| **Usage principal** | Identifier un élément unique | Styliser un groupe d'éléments |
| **Navigation** | Liens d'ancre (`href="#id"`) | Non utilisé pour navigation |
| **Performance JS** | Très rapide (`getElementById`) | Plus lent (recherche dans le DOM) |

## Spécificité CSS

```css
/* Spécificité : 0-0-1-0 (classe) */
.card { color: blue; }

/* Spécificité : 0-1-0-0 (ID) - Gagne */
#header { color: red; }
```

Ordre de priorité (du plus spécifique au moins spécifique) :
1. Inline styles (`style="..."`)
2. IDs (`#id`)
3. Classes, pseudo-classes, attributs (`.class`, `:hover`, `[type]`)
4. Éléments et pseudo-éléments (`div`, `::before`)

## Bonnes Pratiques

### Quand utiliser un ID

✅ **À faire** :
```html
<!-- Éléments uniques de la page -->
<header id="main-header"></header>
<nav id="primary-nav"></nav>
<main id="content"></main>
<footer id="page-footer"></footer>

<!-- Ancres de navigation -->
<a href="#section-pricing">Tarifs</a>
<section id="section-pricing">...</section>

<!-- Cibles JavaScript spécifiques -->
<button id="submit-form">Envoyer</button>
```

❌ **À éviter** :
```html
<!-- Ne pas utiliser pour le styling répétitif -->
<div id="card-1">...</div>
<div id="card-2">...</div> <!-- Utiliser des classes à la place -->
```

### Quand utiliser une Class

✅ **À faire** :
```html
<!-- Styles réutilisables -->
<div class="card">Carte 1</div>
<div class="card">Carte 2</div>
<div class="card">Carte 3</div>

<!-- Combinaisons de styles -->
<button class="btn btn-primary btn-large">Soumettre</button>
<button class="btn btn-secondary">Annuler</button>

<!-- États et variations -->
<div class="notification success">Succès !</div>
<div class="notification error">Erreur</div>
```

✅ **Composants réutilisables** :
```html
<article class="blog-post featured">
  <header class="blog-post__header">
    <h2 class="blog-post__title">Titre</h2>
  </header>
  <div class="blog-post__content">...</div>
</article>
```

## Exemple Pratique Combiné

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Styles généraux avec classes */
    .container { max-width: 1200px; margin: 0 auto; }
    .card { border: 1px solid #ddd; padding: 20px; }
    .card.featured { background-color: #f0f8ff; }

    /* Style spécifique avec ID */
    #main-header { background-color: navy; color: white; }
  </style>
</head>
<body>
  <!-- ID pour élément unique -->
  <header id="main-header" class="container">
    <h1>Mon Site</h1>
  </header>

  <!-- Classes pour éléments répétitifs -->
  <main class="container">
    <div class="card">Carte normale</div>
    <div class="card featured">Carte mise en avant</div>
    <div class="card">Autre carte</div>
  </main>

  <!-- ID pour ancre -->
  <footer id="contact" class="container">
    <p>Contactez-nous</p>
  </footer>
</body>
</html>
```

## Résumé

**ID** :
- ✅ Élément unique dans la page
- ✅ Haute spécificité CSS
- ✅ Ancres de navigation
- ✅ Accès JavaScript rapide
- ❌ Non réutilisable

**Class** :
- ✅ Réutilisable sur plusieurs éléments
- ✅ Multiples classes par élément
- ✅ Idéal pour le styling
- ✅ Flexible et modulaire
- ❌ Spécificité CSS plus faible

**Règle générale** : Utilisez les **classes** pour le styling et les **IDs** pour identifier des éléments uniques nécessitant une manipulation JavaScript ou des liens d'ancre.
