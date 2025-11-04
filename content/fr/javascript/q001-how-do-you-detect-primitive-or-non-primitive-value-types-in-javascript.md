---
id: 1
slug: how-do-you-detect-primitive-or-non-primitive-value-types-in-javascript
title: "Comment détecter les types de valeurs primitives ou non-primitives en JavaScript ?"
category: javascript
difficulty: medium
tags: ["primitifs","types","variables","var","let"]
---

# Comment détecter les Types de valeurs primitives ou non-primitives en JavaScript ?



En JavaScript, les valeurs sont généralement catégorisées comme soit primitives soit non-primitives (également connu sous le nom de Types par référence). Les valeurs primitives incluent:

1. **Number**: Représente les valeurs numériques.
2. **String**: Représente les données textuelles.
3. **Boolean**: Représente vrai ou faux.
4. **Undefined**: Représente une variable non initialisée ou l'absence de valeur.
5. **Null**: Représente l'absence intentionnelle de toute valeur d'objet.
6. **Symbol**: Représente un identifiant unique.

Les valeurs non-primitives sont des objets, qui incluent les tableaux, les fonctions et les objets personnalisés.

On peut détecter les valeurs primitives ou non-primitives en JavaScript de la manière suivante:

###  1. En utilisant `typeof` l'opérateur:

- Cet opérateur retourne une chaîne indiquant le Type d'une valeur.
- Les Types primitifs retourneront leurs chaînes correspondantes (par ex., "Nombre", "Chaîne de caractères", "Booléen").
- Les Types non-primitifs retourneront typiquement "object" or "fonction".


```js
// Using the typeof operator:

let num = 10;
let str = "Hello";
let bool = true;
let obj = {};
let func = function () {};

console.log(typeof num); // Output: "number"
console.log(typeof str); // Output: "string"
console.log(typeof bool); // Output: "boolean"
console.log(typeof obj); // Output: "object"
console.log(typeof func); // Output: "function"
```


**Note importante:** `typeof null` retourne "object" même si c'est une valeur primitive.

###  2. En utilisant Object() constructeur:

- Ce constructeur crée un nouvel objet enveloppe pour une valeur.
- Si une valeur est primitive, elle sera égale à sa version enveloppée dans un objet.
- Si une valeur est non-primitive, elle ne sera pas égale à sa version enveloppée dans un objet.

```javascript
// Using the Object() constructor:

console.log(num === Object(num)); // Output: true (primitive)
console.log(obj === Object(obj)); // Output: false (non-primitive)
```
