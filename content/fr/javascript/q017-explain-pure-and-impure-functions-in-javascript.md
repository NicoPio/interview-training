---
id: 17
slug: explain-pure-and-impure-functions-in-javascript
title: "Expliquez les fonctions pures et impures en JavaScript."
category: javascript
difficulty: easy
tags: ["variables","var","let","const","this"]
---

# Expliquez les fonctions pures et impures en JavaScript.




#### Fonction pure :

Une fonction pure est une fonction qui retourne toujours le même résultat si les mêmes arguments sont passés. Elle ne dépend d'aucun état ou changement de données pendant l'exécution d'un programme. Elle ne dépend que de ses arguments d'entrée.

```javascript
function add(a, b) {
  return a + b;
}
```

Dans cet Exemple, La `add` fonction is pure because it only depends on its input parameters (`a` and `b`) to produce a result and doesn't modify any external state.

---

#### Fonction impure :

Une fonction impure est une fonction qui dépend ou modifie l'état externe ou a des effets secondaires.

```javascript
let total = 0;

function addToTotal(value) {
  total += value;
}

// Example usage of the impure function
addToTotal(5);
console.log(total); // Output: 5
```

Dans cet case, `addToTotal` is impure because it modifies La external variable `total` and has a side effect that can affect other parts of La program.
