---
id: 32
slug: html5-form-validation
title: 'Comment fonctionne la validation de formulaires HTML5 ?'
category: html
difficulty: medium
tags: ['forms', 'validation', 'html5', 'attributes']
---

# Comment fonctionne la validation de formulaires HTML5 ?

HTML5 propose une validation de formulaires native côté client grâce à des attributs spéciaux, sans nécessiter JavaScript.

## Attributs de Validation

### required

```html
<input type="text" name="username" required>
<input type="email" name="email" required>
<select name="country" required>
  <option value="">Sélectionnez un pays</option>
  <option value="fr">France</option>
</select>
```

### pattern (Expression Régulière)

```html
<!-- Code postal français -->
<input type="text" pattern="[0-9]{5}" placeholder="75001">

<!-- Téléphone français -->
<input type="tel" pattern="0[1-9][0-9]{8}" placeholder="0612345678">

<!-- Username (lettres et chiffres uniquement) -->
<input type="text" pattern="[A-Za-z0-9]+" placeholder="john123">
```

### min, max, step

```html
<!-- Nombre entre 1 et 100 -->
<input type="number" min="1" max="100" step="1">

<!-- Date future uniquement -->
<input type="date" min="2025-01-01">

<!-- Prix (multiples de 0.01) -->
<input type="number" min="0" step="0.01" placeholder="19.99">
```

### minlength, maxlength

```html
<!-- Mot de passe (8-20 caractères) -->
<input type="password" minlength="8" maxlength="20">

<!-- Pseudo (3-15 caractères) -->
<input type="text" minlength="3" maxlength="15">
```

## Types d'Input avec Validation Intégrée

```html
<!-- Email (validation automatique) -->
<input type="email" placeholder="email@exemple.com">

<!-- URL -->
<input type="url" placeholder="https://exemple.com">

<!-- Tel -->
<input type="tel" placeholder="+33 6 12 34 56 78">

<!-- Number -->
<input type="number" min="0" max="100">
```

## Messages de Validation Personnalisés

### setCustomValidity()

```html
<form id="myForm">
  <input type="password" id="password" required>
  <input type="password" id="confirm" required>
  <button type="submit">S'inscrire</button>
</form>

<script>
const form = document.getElementById('myForm');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

confirm.addEventListener('input', () => {
  if (password.value !== confirm.value) {
    confirm.setCustomValidity('Les mots de passe ne correspondent pas');
  } else {
    confirm.setCustomValidity('');
  }
});
</script>
```

## Événements de Validation

```javascript
const form = document.querySelector('form');
const input = document.querySelector('input');

// Événement lorsque l'input est invalide
input.addEventListener('invalid', (e) => {
  console.log('Input invalide:', e.target.validationMessage);
});

// Événement à la soumission
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    console.log('Formulaire invalide');
  }
});
```

## API Constraint Validation

```javascript
const input = document.querySelector('input[type="email"]');

// Vérifier la validité
console.log(input.validity.valid);          // true/false

// Types d'erreurs
console.log(input.validity.valueMissing);   // required non respecté
console.log(input.validity.typeMismatch);   // type invalide
console.log(input.validity.patternMismatch);// pattern non respecté
console.log(input.validity.tooShort);       // minlength non respecté
console.log(input.validity.tooLong);        // maxlength non respecté
console.log(input.validity.rangeUnderflow); // min non respecté
console.log(input.validity.rangeOverflow);  // max non respecté

// Message d'erreur
console.log(input.validationMessage);

// Forcer la validation
input.checkValidity();      // Retourne boolean + déclenche 'invalid'
form.checkValidity();       // Valide tout le formulaire
```

## Désactiver la Validation HTML5

```html
<!-- Désactiver pour tout le formulaire -->
<form novalidate>
  <input type="email" required>
  <button type="submit">Envoyer</button>
</form>

<!-- Désactiver pour un bouton spécifique -->
<form>
  <input type="email" required>
  <button type="submit">Envoyer</button>
  <button type="submit" formnovalidate>Sauvegarder brouillon</button>
</form>
```

## Exemple Complet

```html
<form id="registrationForm" novalidate>
  <div>
    <label for="username">Pseudo (3-15 caractères)</label>
    <input
      type="text"
      id="username"
      name="username"
      required
      minlength="3"
      maxlength="15"
      pattern="[A-Za-z0-9]+"
    >
    <span class="error"></span>
  </div>

  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
    <span class="error"></span>
  </div>

  <div>
    <label for="age">Âge (18-100)</label>
    <input type="number" id="age" name="age" required min="18" max="100">
    <span class="error"></span>
  </div>

  <button type="submit">S'inscrire</button>
</form>

<script>
const form = document.getElementById('registrationForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Valider tous les champs
  const inputs = form.querySelectorAll('input');
  let isValid = true;

  inputs.forEach(input => {
    const errorSpan = input.nextElementSibling;

    if (!input.checkValidity()) {
      isValid = false;
      errorSpan.textContent = input.validationMessage;
      input.classList.add('invalid');
    } else {
      errorSpan.textContent = '';
      input.classList.remove('invalid');
    }
  });

  if (isValid) {
    // Soumettre le formulaire
    console.log('Formulaire valide !');
    form.submit();
  }
});

// Effacer les erreurs pendant la saisie
form.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.checkValidity()) {
      input.nextElementSibling.textContent = '';
      input.classList.remove('invalid');
    }
  });
});
</script>

<style>
input.invalid {
  border-color: red;
}

.error {
  color: red;
  font-size: 0.875rem;
  display: block;
  margin-top: 4px;
}
</style>
```

## Avantages et Limitations

### Avantages
- ✅ Validation côté client rapide
- ✅ Pas de JavaScript requis (basique)
- ✅ Messages d'erreur natifs
- ✅ Support navigateurs moderne

### Limitations
- ❌ Styling limité des messages d'erreur
- ❌ Validation côté serveur toujours nécessaire
- ❌ Messages d'erreur par défaut non personnalisables facilement
- ❌ Expressions régulières limitées

## Résumé

HTML5 offre :
- **Attributs**: `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`
- **Types**: `email`, `url`, `tel`, `number`, `date`
- **API**: `checkValidity()`, `validity`, `validationMessage`
- **Personnalisation**: `setCustomValidity()`, événement `invalid`

**Toujours valider côté serveur** pour la sécurité !
