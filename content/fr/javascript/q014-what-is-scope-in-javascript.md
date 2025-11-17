---
id: 14
slug: what-is-scope-in-javascript
title: "Qu'est-ce que la portée (scope) en JavaScript ?"
category: javascript
difficulty: medium
tags: ['variables', 'var', 'let', 'const', 'this']
---

# Qu'est-ce que la portée (Portée) en JavaScript ?

En JavaScript, le terme "portée" fait référence au contexte dans lequel les variables et fonctions sont déclarées et accessibles. Il définit la visibilité et l'accessibilité de ces variables et fonctions dans le code. Comprendre la portée est crucial pour gérer le cycle de vie et le comportement des variables et fonctions dans un programme.

**Portée globale :**

- Les variables déclarées en dehors de toute fonction ou bloc ont une portée globale.
- Les variables globales sont accessibles dans tout le code, y compris dans les fonctions.

```javascript
var globalVar = 'I am global'

function exampleFunction() {
  console.log(globalVar) // Accessible inside the function
}

exampleFunction()
console.log(globalVar) // Accessible outside the function
```

**Portée locale :**

- Les variables déclarées à l'intérieur d'une fonction ou bloc ont une portée locale.
- Les variables locales ne sont accessibles que dans la fonction ou le bloc où elles sont déclarées.

```javascript
function exampleFunction() {
  var localVar = 'I am local'
  console.log(localVar) // Accessible inside the function
}

exampleFunction()
// console.log(localVar); // This would result in an error because localVar is not accessible outside the function
```

**Chaîne de portée :**
La chaîne de portée fait référence à la hiérarchie des portées dans un programme. Lorsqu'une variable ou fonction est référencée, JavaScript la cherche dans la portée actuelle puis remonte la chaîne de portée jusqu'à ce qu'il trouve la variable ou atteigne la portée globale.
