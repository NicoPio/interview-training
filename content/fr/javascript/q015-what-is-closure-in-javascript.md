---
id: 15
slug: what-is-closure-in-javascript
title: "Qu'est-ce qu'une fermeture (closure) en JavaScript ?"
category: javascript
difficulty: medium
tags: ["variables","var","let","const","portée"]
---

# Qu'est-ce qu'une fermeture (closure) en JavaScript ?



En JavaScript, une fermeture (closure) est une fonction associée à sa portée lexicale, qui lui permet d'accéder aux variables de sa (englobante) portée même après que cette portée ait fini de s'exécuter. Une fermeture permet à une fonction de se souvenir et d'accéder aux variables de l'environnement dans lequel elle a été créée, même si la fonction est exécutée dans une portée différente.

Voici un exemple pour illustrer les fermetures en JavaScript:

```javascript
function outerFunction() {
  // Outer function scope
  let outerVariable = 10;

  function innerFunction() {
    // Inner function scope
    let innerVariable = 5;
    // Accessing both inner and outer variables
    console.log("Inner Variable:", innerVariable);
    console.log("Outer Variable:", outerVariable);
  }

  // Returning the inner function, creating a closure
  return innerFunction;
}

// Calling outerFunction returns innerFunction, which is now a closure
let closureFunction = outerFunction();

// Executing the closure function
closureFunction();
```

**Explication:**

- `outerFunction` définit une variable externe (`outerVariable`) et une fonction interne (`innerFunction`).
- `innerFunction` a accès aux variables de sa fonction externe (`outerVariable`).
- `outerFunction` retourne `innerFunction`, créant une fermeture.
- La `closureFunction` conserve l'accès à la `outerVariable` même après que `outerFunction` ait fini de s'exécuter.
- Appeler `closureFunction()` enregistre les variables internes et externes dans la console.
