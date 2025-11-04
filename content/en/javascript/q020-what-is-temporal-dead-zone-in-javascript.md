---
id: 20
slug: what-is-temporal-dead-zone-in-javascript
title: "What is Temporal Dead Zone in JavaScript?"
category: javascript
difficulty: easy
tags: ["variables", "var", "let", "const", "this"]
---

# What is Temporal Dead Zone in JavaScript?



The Temporal Dead Zone is a phenomenon in JavaScript associated with the use of the `let` and `const` keywords, unlike the `var` keyword. In ECMAScript 6, attempting to access a `let` or `const` variable before it is declared within its scope results in a `ReferenceError`. The term "temporal dead zone" refers to the timeframe during which this occurs, spanning from the creation of the variable's binding to its actual declaration.

**Example:**

```javascript
function exampleMethod() {
  console.log(value1); // Outputs: undefined
  console.log(value2); // Throws a ReferenceError
  var value1 = 1;
  let value2 = 2;
}
```

In this example, attempting to access `value2` before its declaration causes a `ReferenceError` due to the temporal dead zone, while accessing `value1` results in an output of `undefined`.
