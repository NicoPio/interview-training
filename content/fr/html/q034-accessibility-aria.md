---
id: 34
slug: accessibility-aria
title: 'Qu\'est-ce que l\'accessibilité web et les attributs ARIA ?'
category: html
difficulty: medium
tags: ['accessibility', 'aria', 'a11y', 'wcag']
---

# Qu'est-ce que l'accessibilité web et les attributs ARIA ?

L'accessibilité web (a11y) garantit que les sites sont utilisables par tous, y compris les personnes handicapées. ARIA (Accessible Rich Internet Applications) améliore l'accessibilité des contenus dynamiques.

## HTML Sémantique (Priorité #1)

```html
<!-- ✅ Bon : Sémantique claire -->
<header>
  <nav>
    <ul>
      <li><a href="/">Accueil</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Titre</h1>
    <p>Contenu...</p>
  </article>
</main>
<footer>
  <p>© 2025</p>
</footer>

<!-- ❌ Mauvais : Div soup -->
<div class="header">
  <div class="nav">
    <div class="link">Accueil</div>
  </div>
</div>
```

## Attributs ARIA

### role

```html
<!-- Navigation -->
<div role="navigation">
  <a href="/">Accueil</a>
</div>

<!-- Bannière -->
<div role="banner">Logo et titre</div>

<!-- Contenu principal -->
<div role="main">Contenu</div>

<!-- Complémentaire -->
<div role="complementary">Sidebar</div>

<!-- Info -->
<div role="contentinfo">Footer</div>
```

**Note** : Utiliser les éléments sémantiques HTML5 (`<nav>`, `<main>`, etc.) plutôt que `role`.

### aria-label et aria-labelledby

```html
<!-- Label direct -->
<button aria-label="Fermer la modal">
  <svg><!-- Icône X --></svg>
</button>

<!-- Référence à un élément -->
<h2 id="modal-title">Confirmation</h2>
<div role="dialog" aria-labelledby="modal-title">
  <p>Êtes-vous sûr ?</p>
</div>
```

### aria-describedby

```html
<input
  type="password"
  id="password"
  aria-describedby="password-hint"
>
<span id="password-hint">
  8 caractères minimum, avec chiffres et symboles
</span>
```

### aria-hidden

```html
<!-- Masquer aux screen readers -->
<span aria-hidden="true">★★★★★</span>
<span class="sr-only">5 étoiles sur 5</span>

<!-- Icônes décoratives -->
<button>
  <svg aria-hidden="true"><!-- Icône --></svg>
  Enregistrer
</button>
```

### aria-live (Contenu Dynamique)

```html
<!-- Annonce polie (attendre une pause) -->
<div aria-live="polite" aria-atomic="true">
  Article ajouté au panier
</div>

<!-- Annonce assertive (immédiate) -->
<div aria-live="assertive">
  Erreur : formulaire invalide
</div>

<!-- Off (pas d'annonce) -->
<div aria-live="off">Contenu ignoré</div>
```

### aria-expanded, aria-controls

```html
<button
  aria-expanded="false"
  aria-controls="menu"
  onclick="toggleMenu()"
>
  Menu
</button>

<ul id="menu" hidden>
  <li>Accueil</li>
  <li>À propos</li>
</ul>

<script>
function toggleMenu() {
  const button = document.querySelector('[aria-controls="menu"]');
  const menu = document.getElementById('menu');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', !isExpanded);
  menu.hidden = isExpanded;
}
</script>
```

## Accessibilité des Formulaires

```html
<form>
  <!-- Label explicite -->
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    aria-required="true"
    aria-invalid="false"
    aria-describedby="email-error"
  >
  <span id="email-error" role="alert" aria-live="assertive"></span>

  <!-- Groupe de champs -->
  <fieldset>
    <legend>Préférences de contact</legend>
    <label>
      <input type="radio" name="contact" value="email">
      Email
    </label>
    <label>
      <input type="radio" name="contact" value="phone">
      Téléphone
    </label>
  </fieldset>
</form>
```

## Navigation au Clavier

```html
<button
  tabindex="0"
  onkeydown="if(event.key==='Enter'||event.key===' ')handleClick()"
>
  Cliquez-moi
</button>

<!-- Skip link -->
<a href="#main-content" class="skip-link">
  Aller au contenu principal
</a>

<main id="main-content" tabindex="-1">
  <!-- Contenu -->
</main>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  left: 0;
  top: 0;
  z-index: 9999;
}
</style>
```

## Modal Accessible

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">Confirmation</h2>
  <p id="modal-desc">Voulez-vous continuer ?</p>

  <button>Annuler</button>
  <button>Confirmer</button>
</div>

<script>
// Piéger le focus dans la modal
function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    if (e.key === 'Escape') {
      closeModal();
    }
  });

  first.focus();
}
</script>
```

## Classes Utilitaires

```css
/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible */
*:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Réduire les animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Tests d'Accessibilité

1. **Outils** :
   - Lighthouse (Chrome DevTools)
   - axe DevTools
   - WAVE

2. **Tests manuels** :
   - Navigation clavier (Tab, Enter, Espace, Escape)
   - Screen reader (NVDA, JAWS, VoiceOver)
   - Zoom 200%
   - Contraste couleurs (WCAG AA: 4.5:1)

## Résumé

**Principes** :
- ✅ HTML sémantique en priorité
- ✅ Labels sur tous les inputs
- ✅ Navigation clavier complète
- ✅ Focus visible
- ✅ Contraste suffisant
- ✅ ARIA pour enrichir (pas remplacer)

**ARIA c'est** :
- `role` : rôle de l'élément
- `aria-label` : label invisible
- `aria-live` : contenu dynamique
- `aria-expanded` : état ouvert/fermé
- `aria-hidden` : masquer aux screen readers
