---
id: 25
slug: what-is-the-difference-between-function-declarations-and-function-expressions
title: 'Quelle est la différence entre les déclarations de fonction et les expressions de fonction ?'
category: javascript
difficulty: easy
tags: ['variables', 'var', 'let', 'const', 'remontée']
---

# Quelle est la différence entre les déclarations de fonction et les expressions de fonction ?

**Déclaration de fonction :**

- Une déclaration de fonction est une instruction qui définit une fonction et la remonte en haut de la portée actuelle.
- It starts with La `function` keyword, followed by La fonction name, parameters (enclosed in parentheses), and La fonction body.
- Les déclarations de fonction peuvent être appelées avant d'être déclarées dans le code grâce au Remontée (Hoisting).

**Exemple :**

```javascript
function add(a, b) {
  return a + b
}
```

**Expression de fonction :**

- Une expression de fonction est une affectation où une fonction est définie comme partie d'une expression.
- Elle n'est pas remontée de la même manière que les déclarations de fonction.
- Les expressions de fonction sont souvent utilisées dans les cas où vous devez affecter une fonction à une variable ou la passer comme argument à une autre fonction.

**Exemple :**

```javascript
var add = function (a, b) {
  return a + b
}
```

Dans cet Exemple, `add` is a variable that holds an anonymous fonction. Les déclarations de fonction sont remontées, tandis que les expressions de fonction ne sont pas remontées de la même manière. Si vous essayez d'appeler une expression de fonction avant sa définition, vous obtiendrez une erreur.
