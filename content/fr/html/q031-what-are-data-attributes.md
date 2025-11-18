---
id: 31
slug: what-are-data-attributes
title: 'Que sont les attributs data-* en HTML et comment les utiliser ?'
category: html
difficulty: medium
tags: ['data-attributes', 'javascript', 'dom', 'html5']
---

# Que sont les attributs data-* en HTML et comment les utiliser ?

Les attributs `data-*` (data attributes) sont des attributs HTML5 personnalisés qui permettent de stocker des données supplémentaires sur les éléments HTML sans utiliser d'attributs non-standard.

## Syntaxe

```html
<element data-nom="valeur"></element>
```

- Préfixe obligatoire : `data-`
- Nom en minuscules (kebab-case recommandé)
- Valeur : chaîne de caractères

## Exemples d'Utilisation

### Données Simples

```html
<article
  data-post-id="12345"
  data-author="John Doe"
  data-category="technology"
  data-published="2025-11-18"
>
  <h2>Titre de l'Article</h2>
</article>
```

### Configuration de Composants

```html
<div
  class="carousel"
  data-autoplay="true"
  data-interval="5000"
  data-loop="false"
>
  <!-- Images du carousel -->
</div>
```

### Données pour JavaScript

```html
<button
  class="add-to-cart"
  data-product-id="789"
  data-product-name="T-Shirt"
  data-price="29.99"
  data-currency="EUR"
>
  Ajouter au panier
</button>
```

## Accès avec JavaScript

### Via dataset (Recommandé)

```javascript
const article = document.querySelector('article');

// Lecture
console.log(article.dataset.postId);      // "12345"
console.log(article.dataset.author);      // "John Doe"
console.log(article.dataset.category);    // "technology"

// Écriture
article.dataset.views = '1250';
article.dataset.featured = 'true';

// Suppression
delete article.dataset.category;
```

**Note** : Le kebab-case (`data-post-id`) devient camelCase (`postId`) en JavaScript.

### Via getAttribute/setAttribute

```javascript
const button = document.querySelector('.add-to-cart');

// Lecture
const productId = button.getAttribute('data-product-id');  // "789"
const price = button.getAttribute('data-price');            // "29.99"

// Écriture
button.setAttribute('data-quantity', '1');

// Suppression
button.removeAttribute('data-price');
```

## Utilisation en CSS

```html
<div class="status" data-status="success">Opération réussie</div>
<div class="status" data-status="error">Erreur</div>
<div class="status" data-status="warning">Attention</div>
```

```css
/* Sélecteur d'attribut */
.status[data-status="success"] {
  color: green;
  background-color: #e8f5e9;
}

.status[data-status="error"] {
  color: red;
  background-color: #ffebee;
}

.status[data-status="warning"] {
  color: orange;
  background-color: #fff3e0;
}

/* Afficher le contenu de l'attribut */
.status::before {
  content: attr(data-status);
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 8px;
}
```

## Exemples Pratiques

### Système de Tabs

```html
<div class="tabs">
  <button data-tab="home" class="active">Accueil</button>
  <button data-tab="profile">Profil</button>
  <button data-tab="settings">Paramètres</button>
</div>

<div class="tab-content" data-tab="home" class="active">Contenu Accueil</div>
<div class="tab-content" data-tab="profile">Contenu Profil</div>
<div class="tab-content" data-tab="settings">Contenu Paramètres</div>

<script>
document.querySelectorAll('[data-tab]').forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.dataset.tab;

    // Désactiver tous les tabs
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.classList.remove('active');
    });

    // Activer le tab cliqué
    button.classList.add('active');
    document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add('active');
  });
});
</script>
```

### Modal avec Données

```html
<button
  class="open-modal"
  data-modal-id="contact"
  data-modal-title="Contactez-nous"
  data-modal-size="large"
>
  Ouvrir Modal
</button>

<script>
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => {
    const { modalId, modalTitle, modalSize } = button.dataset;

    // Créer et afficher la modal
    openModal({
      id: modalId,
      title: modalTitle,
      size: modalSize
    });
  });
});
</script>
```

### Tri et Filtrage

```html
<div class="products">
  <div class="product" data-price="25" data-category="electronics" data-rating="4.5">
    <h3>Produit 1</h3>
  </div>
  <div class="product" data-price="50" data-category="books" data-rating="3.8">
    <h3>Produit 2</h3>
  </div>
  <div class="product" data-price="15" data-category="electronics" data-rating="4.9">
    <h3>Produit 3</h3>
  </div>
</div>

<script>
// Filtrer par catégorie
function filterByCategory(category) {
  document.querySelectorAll('.product').forEach(product => {
    if (product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Trier par prix
function sortByPrice() {
  const products = Array.from(document.querySelectorAll('.product'));
  products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));

  const container = document.querySelector('.products');
  products.forEach(product => container.appendChild(product));
}
</script>
```

## Avantages

1. **Validité HTML5** : Conforme aux standards
2. **Séparer données et présentation** : Évite le mélange JavaScript/HTML
3. **Accessibilité** : Données invisibles pour l'utilisateur
4. **Pas de conflits** : Préfixe `data-` évite les conflits avec futurs attributs HTML
5. **API dataset** : Accès facile en JavaScript
6. **Styling CSS** : Utilisation dans les sélecteurs

## Limitations et Bonnes Pratiques

### ❌ À Éviter

```html
<!-- Données sensibles -->
<div data-user-password="secret123">...</div>

<!-- Données volumineuses -->
<div data-json='{"users": [...1000 éléments...]}'>...</div>

<!-- Noms avec caractères spéciaux -->
<div data-user_name="John">...</div> <!-- Utiliser kebab-case -->
```

### ✅ Bonnes Pratiques

```html
<!-- Noms descriptifs en kebab-case -->
<div data-user-id="123" data-user-role="admin">...</div>

<!-- Données simples et légères -->
<button data-action="delete" data-confirm="true">Supprimer</button>

<!-- Configuration de composants -->
<div class="slider" data-autoplay="true" data-speed="3000">...</div>
```

## Alternatives

### Quand ne PAS utiliser data-*

- **Données volumineuses** → Utiliser JSON séparé ou API
- **Données sensibles** → Stocker côté serveur
- **Sémantique HTML existante** → Utiliser attributs appropriés (href, src, alt, etc.)

### Exemple : Utiliser les attributs standards

```html
<!-- ❌ Mauvais -->
<a data-url="https://example.com">Lien</a>

<!-- ✅ Bon -->
<a href="https://example.com">Lien</a>

<!-- ❌ Mauvais -->
<img data-image="photo.jpg">

<!-- ✅ Bon -->
<img src="photo.jpg" alt="Description">
```

## Résumé

Les attributs `data-*` permettent de :
- ✅ Stocker des données personnalisées sur les éléments HTML
- ✅ Accéder facilement aux données en JavaScript (`dataset`)
- ✅ Utiliser les données pour le styling CSS
- ✅ Configurer des composants et widgets
- ✅ Maintenir la validité HTML5

**Usage typique** : Configuration de composants, identifiants, métadonnées légères pour JavaScript.
