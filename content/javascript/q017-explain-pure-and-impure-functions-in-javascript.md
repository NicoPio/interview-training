---
id: 17
slug: explain-pure-and-impure-functions-in-javascript
title: "Explain pure and impure functions in JavaScript."
category: javascript
difficulty: easy
tags: ["variables", "var", "let", "const", "this"]
---

::question
Explain pure and impure functions in JavaScript.
::

::answer

#### Pure Function:

A pure function is a function that always returns the same result if the same arguments are passed in. It does not depend on any state or data change during a program's execution. It only depends on its input arguments.

```javascript
function add(a, b) {
  return a + b;
}
```

In this example, the `add` function is pure because it only depends on its input parameters (`a` and `b`) to produce a result and doesn't modify any external state.

---

#### Impure Function:

An impure function is a function that relies on or modifies external state or has side effects.

```javascript
let total = 0;

function addToTotal(value) {
  total += value;
}

// Example usage of the impure function
addToTotal(5);
console.log(total); // Output: 5
```

In this case, `addToTotal` is impure because it modifies the external variable `total` and has a side effect that can affect other parts of the program.
