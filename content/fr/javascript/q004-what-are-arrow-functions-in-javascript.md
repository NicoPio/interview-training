---
id: 4
slug: what-are-arrow-functions-in-javascript
title: 'Que sont les fonctions fléchées en JavaScript ?'
category: javascript
difficulty: medium
tags: ['es6', 'ecmascript', 'fonctions-fléchées', 'fonctions', 'this']
---

# Que sont les fonctions fléchées en JavaScript ?

Les fonctions fléchées sont une façon concise d'écrire des expressions de fonction anonymes en JavaScript. Elles ont été introduites dans ECMAScript 6 (ES6) et sont particulièrement utiles pour les fonctions courtes à expression unique.

Voici la syntaxe de base d'une fonction fléchée:

```javascript
const add = (a, b) => {
  return a + b
}
```

Dans cet Exemple, la fonction fléchée `add` prend deux paramètres (`a` and `b`) et retourne leur somme. La `=>` syntaxe est utilisée pour définir la fonction, et le corps de la fonction est entouré d'accolades `{}`.

S'il n'y a qu'une seule expression dans le corps de la fonction, vous pouvez omettre les accolades et le mot-clé `return` keyword:

```javascript
const add = (a, b) => a + b
```

---

### Expression de fonction traditionnelle:

```javascript
// Define an object
let obj1 = {
  value: 42,
  valueOfThis: function () {
    return this.value // 'this' refers to the object calling the function (obj1)
  },
}

// Call the method
console.log(obj1.valueOfThis()) // Output: 42
```

Dans cet Exemple, `obj1.valueOfThis()` retourne la `value` propriété de `obj1`, car `this` à l'intérieur de la fonction fait référence à l'objet `obj1`.

---

### Fonction fléchée:

```javascript
// Define another object
let obj2 = {
  value: 84,
  valueOfThis: () => {
    return this.value // 'this' does not refer to obj2; it inherits from the parent scope (window in this case)
  },
}

// Call the method
console.log(obj2.valueOfThis()) // Output: undefined or an error (depending on the environment)
```

In la fonction fléchée within `obj2`, `this` ne fait pas référence à `obj2`. Au lieu de cela, il hérite de sa valeur de la portée parente, qui est l'objet global (window dans un environnement navigateur). Par conséquent, `obj2.valueOfThis()` retourne Indéfini ou peut même lever une erreur, car `this.value` n'est pas défini dans la portée globale.
