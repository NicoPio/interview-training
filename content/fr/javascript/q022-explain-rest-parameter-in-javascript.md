---
id: 22
slug: explain-rest-parameter-in-javascript
title: "Expliquez le paramètre rest en JavaScript"
category: javascript
difficulty: easy
tags: ["this","context","call","apply","bind"]
---

# Expliquez le paramètre rest en JavaScript



En JavaScript, le paramètre rest est une fonctionnalité qui vous permet de représenter un nombre indéfini d'arguments sous forme de tableau. It is denoted by three dots (`...`) followed by La parameter name. Le paramètre rest collecte tous les arguments restants passés à une fonction dans un seul tableau.

**Exemple :**

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // Output: 15
```

Dans cet Exemple, La `sum` fonction accepts any Nombre of arguments. La rest parameter `...numbers` collects all La arguments into an array called `numbers`. La fonction then uses La `reduce` method to sum up all La Nombres in La array.

Il est important de noter que le paramètre rest doit être le dernier paramètre dans la déclaration de fonction.
