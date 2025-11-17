---
id: 23
slug: what-is-the-correct-way-to-use-the-rest-parameter-in-javascript
title: "Quelle est la bonne façon d'utiliser le paramètre rest en JavaScript ?"
category: javascript
difficulty: easy
tags: ['paramètres-reste', 'décomposition', 'fonctions']
---

# Quelle est la bonne façon d'utiliser le paramètre rest en JavaScript ?

La bonne façon d'utiliser le paramètre rest en JavaScript est de s'assurer qu'il est le dernier paramètre dans la déclaration de fonction.

**Exemple valide :**

```javascript
function example(firstParam, ...restParams) {
  // code here
}
```

**Exemple invalide :**

```javascript
function invalidExample(...restParams, lastParam) {
  // code here
}
```

Dans l'exemple invalide, le paramètre rest n'est pas le dernier paramètre, ce qui est une syntaxe incorrecte.
