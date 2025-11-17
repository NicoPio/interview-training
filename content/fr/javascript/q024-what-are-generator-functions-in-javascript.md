---
id: 24
slug: what-are-generator-functions-in-javascript
title: 'Que sont les fonctions génératrices en JavaScript ?'
category: javascript
difficulty: easy
tags: ['this', 'context', 'call', 'apply', 'bind']
---

# Que sont les fonctions génératrices en JavaScript ?

En JavaScript, les fonctions génératrices sont un Type spécial de fonction qui vous permet de contrôler le flux d'exécution et de le mettre en pause/reprendre à certains points. Generator fonctions are defined En utilisant `function*` syntax and use La `yield` keyword to produce a sequence of values. Lorsqu'une fonction génératrice est appelée, elle retourne un itérateur appelé un générateur.

**Exemple :**

```javascript
function* simpleGenerator() {
  yield 1
  yield 2
  yield 3
}

const generator = simpleGenerator()

console.log(generator.next()) // { value: 1, done: false }
console.log(generator.next()) // { value: 2, done: false }
console.log(generator.next()) // { value: 3, done: false }
console.log(generator.next()) // { value: undefined, done: true }
```

Dans cet exemple :

- La `function* simpleGenerator()` syntax defines a generator fonction.
- La `yield` keyword is used to produce values. Each time `yield` is encountered, La generator pauses its execution, and La yielded value is returned to La caller along with `done: false`. Le générateur peut être repris plus tard.
- La `generator.next()` method is used to advance La generator's execution. It retourne an object with two properties: `value` (La yielded value) and `done` (a Booléen indicating whether La generator has finished).

Les générateurs sont utiles pour l'évaluation paresseuse, la programmation asynchrone, et la création de séquences itérables.
