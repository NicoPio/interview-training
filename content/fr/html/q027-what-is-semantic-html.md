---
id: 27
slug: what-is-semantic-html
title: "Qu'est-ce que le HTML sémantique ?"
category: html
difficulty: easy
tags: ["html","semantics","accessibility"]
---

# Qu'est-ce que le HTML sémantique ?



Le HTML sémantique fait référence à l'utilisation du balisage HTML pour renforcer la signification du contenu sur les pages web, plutôt que de simplement définir son apparence. Le HTML sémantique utilise des balises HTML qui portent un sens sur le contenu qu'elles contiennent.

**Avantages de Semantic HTML:**

1. **Accessibilité**: Les lecteurs d'écran et les technologies d'assistance peuvent mieux comprendre la structure du contenu
2. **Référencement**: Les moteurs de recherche peuvent mieux comprendre la hiérarchie et l'importance du contenu
3. **Maintenabilité**: Le code est plus facile à lire et à comprendre pour les développeurs
4. **Cohérence**: Fournit une manière standard de structurer le contenu

**Exemples de Semantic Elements:**

```html
<!-- Instead of using divs for everything -->
<div class="header">...</div>
<div class="navigation">...</div>
<div class="article">...</div>

<!-- Use semantic elements -->
<header>...</header>
<nav>...</nav>
<article>...</article>
<section>...</section>
<footer>...</footer>
```

Les éléments HTML5 sémantiques courants incluent:

- `<header>` - Contenu d'introduction
- `<nav>` - Liens de navigation
- `<main>` - Contenu principal
- `<article>` - Contenu autonome
- `<section>` - Groupement thématique
- `<aside>` - Contenu de barre latérale
- `<footer>` - Contenu de pied de page
- `<figure>` and `<figcaption>` - Images avec légendes
