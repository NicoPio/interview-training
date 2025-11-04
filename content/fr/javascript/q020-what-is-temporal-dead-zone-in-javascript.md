---
id: 20
slug: what-is-temporal-dead-zone-in-javascript
title: "Qu'est-ce que la zone morte temporelle (Temporal Dead Zone) en JavaScript ?"
category: javascript
difficulty: easy
tags: ["variables","var","let","const","this"]
---

# Qu'est-ce que la zone morte temporelle (Temporal Dead Zone) en JavaScript ?



La Temporal Dead Zone is a phenomenon in JavaScript associated with La use of La `let` and `const` keywords, unlike La `var` keyword. In ECMAScript 6, attempting to access a `let` or `const` variable before it is declared within its Portée results in a `ReferenceError`. Le terme "zone morte temporelle" fait référence à la période pendant laquelle cela se produit, allant de la création de la liaison de la variable à sa déclaration effective.

**Exemple :**

```javascript
function exampleMethod() {
  console.log(value1); // Outputs: undefined
  console.log(value2); // Throws a ReferenceError
  var value1 = 1;
  let value2 = 2;
}
```

Dans cet Exemple, attempting to access `value2` before its declaration causes a `ReferenceError` due to La temporal dead zone, Alors que accessing `value1` results in an Sortie of `undefined`.
