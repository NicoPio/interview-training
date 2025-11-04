---
id: 5
slug: what-is-hoisting-in-javascript
title: "Qu'est-ce que le hoisting en JavaScript ?"
category: javascript
difficulty: medium
tags: ["variables","var","let","const","remontée"]
---

# Qu'est-ce que le Remontée (Hoisting) en JavaScript ?



En JavaScript, le Remontée (Hoisting) est un phénomène où les déclarations de variables et de fonctions sont conceptuellement déplacées vers le haut de leurs portées respectives, même si elles sont écrites plus tard dans le code. Ce comportement s'applique aux portées globales et locales.

**Exemples pour illustrer Remontée (Hoisting):**

**Exemple 1 : Remontée de variable**

```javascript
console.log(myMessage); // Outputs "undefined", not an error
var myMessage = "Greetings!";
```

Alors que `myMessage` apparaît déclaré après son utilisation, il est remonté vers le haut de la portée, permettant sa référence (mais pas sa valeur initiale) avant la ligne de déclaration réelle.

**Exemple 2 : Remontée de fonction**

```javascript
sayHello(); // Outputs "Hello, world!"
function sayHello() {
  console.log("Hello, world!");
}
```

Même si `sayHello` est défini après son appel, JavaScript agit comme s'il était déclaré au début de la portée, permettant son exécution.

**Exemple 3 : Remontée (Hoisting) within Local Portées**

```javascript
function performTask() {
  result = 100; // Hoisted within the function
  console.log(result); // Outputs 100
  var result;
}
performTask();
```

Le Remontée (Hoisting) se produit également dans les portées locales, comme les fonctions. Ici, `result` est remonté vers le haut de la `performTask` fonction, permettant son utilisation avant sa déclaration explicite.

**Points clés:**

- Seules les déclarations sont remontées, pas les initialisations. L'exemple avec `console.log(x);` le démontre, car `x` est déclaré mais pas initialisé avant son utilisation, résultant en `undefined`.
- Le mode strict impose la déclaration: Utiliser "use strict"; au début de votre code empêche d'utiliser des variables avant qu'elles ne soient déclarées, aidant à éviter les problèmes potentiels liés au Remontée (Hoisting).
