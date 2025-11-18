---
id: 33
slug: meta-tags
title: 'Quelles sont les balises meta importantes en HTML ?'
category: html
difficulty: easy
tags: ['meta', 'seo', 'head', 'viewport']
---

# Quelles sont les balises meta importantes en HTML ?

Les balises `<meta>` fournissent des métadonnées sur le document HTML. Elles sont placées dans `<head>` et ne sont pas visibles sur la page.

## Balises Meta Essentielles

### Charset (Encodage)

```html
<meta charset="UTF-8">
```

**Fonction** : Définit l'encodage des caractères (toujours UTF-8 pour Unicode).

### Viewport (Responsive)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Fonction** : Contrôle le comportement responsive sur mobile.

### Description (SEO)

```html
<meta name="description" content="Description concise de la page (150-160 caractères)">
```

**Fonction** : Snippet affiché dans les résultats de recherche Google.

### Keywords (Obsolète)

```html
<meta name="keywords" content="html, meta, tags">
```

**Note** : Ignoré par Google, non recommandé.

## Open Graph (Réseaux Sociaux)

```html
<!-- Titre -->
<meta property="og:title" content="Titre de la Page">

<!-- Description -->
<meta property="og:description" content="Description pour les réseaux sociaux">

<!-- Image -->
<meta property="og:image" content="https://example.com/image.jpg">

<!-- URL -->
<meta property="og:url" content="https://example.com/page">

<!-- Type -->
<meta property="og:type" content="website">

<!-- Locale -->
<meta property="og:locale" content="fr_FR">
```

## Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
<meta name="twitter:title" content="Titre">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

## Robots (SEO)

```html
<!-- Index et follow -->
<meta name="robots" content="index, follow">

<!-- No index, no follow -->
<meta name="robots" content="noindex, nofollow">

<!-- No archive -->
<meta name="robots" content="noarchive">
```

## Canonical URL

```html
<link rel="canonical" href="https://example.com/page">
```

## Auteur et Copyright

```html
<meta name="author" content="John Doe">
<meta name="copyright" content="© 2025 Company Name">
```

## Refresh et Redirect

```html
<!-- Refresh après 5 secondes -->
<meta http-equiv="refresh" content="5">

<!-- Redirect après 0 secondes -->
<meta http-equiv="refresh" content="0; url=https://example.com">
```

**Note** : Non recommandé, utiliser JavaScript ou redirections serveur.

## Exemple Complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Essentiel -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <title>Titre de la Page - Site Name</title>
  <meta name="description" content="Description optimisée pour le SEO">
  <link rel="canonical" href="https://example.com/page">

  <!-- Open Graph -->
  <meta property="og:title" content="Titre de la Page">
  <meta property="og:description" content="Description pour Facebook">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Titre de la Page">
  <meta name="twitter:description" content="Description pour Twitter">
  <meta name="twitter:image" content="https://example.com/twitter-image.jpg">

  <!-- Autres -->
  <meta name="author" content="John Doe">
  <meta name="robots" content="index, follow">
</head>
<body>
  <!-- Contenu -->
</body>
</html>
```

## Bonnes Pratiques

✅ **À faire** :
- Toujours inclure `charset` et `viewport`
- Description unique par page (150-160 caractères)
- Images Open Graph (1200x630px)
- URLs canoniques pour éviter duplicate content

❌ **À éviter** :
- Keywords meta (obsolète)
- Meta refresh pour redirections
- Dupliquer les descriptions entre pages
- Oublier le viewport sur sites responsive
