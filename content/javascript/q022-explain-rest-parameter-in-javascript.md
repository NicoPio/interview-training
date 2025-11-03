---
id: 22
slug: explain-rest-parameter-in-javascript
title: "Explain rest parameter in JavaScript"
category: javascript
difficulty: easy
tags: ["this", "context", "call", "apply", "bind"]
---

::question
Explain rest parameter in JavaScript
::

::answer
In JavaScript, the rest parameter is a feature that allows you to represent an indefinite number of arguments as an array. It is denoted by three dots (`...`) followed by the parameter name. The rest parameter collects all the remaining arguments passed to a function into a single array.

**Example:**

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // Output: 15
```

In this example, the `sum` function accepts any number of arguments. The rest parameter `...numbers` collects all the arguments into an array called `numbers`. The function then uses the `reduce` method to sum up all the numbers in the array.

It's important to note that the rest parameter must be the last parameter in the function declaration.
