---
id: 4
slug: what-are-arrow-functions-in-javascript
title: "What are arrow functions in JavaScript?"
category: javascript
difficulty: medium
tags: ["es6", "ecmascript", "arrow-functions", "functions", "this"]
---

# What are arrow functions in JavaScript?



Arrow functions are a concise way to write anonymous function expressions in JavaScript. They were introduced in ECMAScript 6 (ES6) and are especially useful for short, single-expression functions.

Here's the basic syntax for an arrow function:

```javascript
const add = (a, b) => {
  return a + b;
};
```

In this example, the arrow function `add` takes two parameters (`a` and `b`) and returns their sum. The `=>` syntax is used to define the function, and the body of the function is enclosed in curly braces `{}`.

If there's only one expression in the function body, you can omit the curly braces and the `return` keyword:

```javascript
const add = (a, b) => a + b;
```

---

###  Traditional Function Expression:

```javascript
// Define an object
let obj1 = {
  value: 42,
  valueOfThis: function () {
    return this.value; // 'this' refers to the object calling the function (obj1)
  },
};

// Call the method
console.log(obj1.valueOfThis()); // Output: 42
```

In this example, `obj1.valueOfThis()` returns the `value` property of `obj1`, as `this` inside the function refers to the object `obj1`.

---

###  Arrow Function:

```javascript
// Define another object
let obj2 = {
  value: 84,
  valueOfThis: () => {
    return this.value; // 'this' does not refer to obj2; it inherits from the parent scope (window in this case)
  },
};

// Call the method
console.log(obj2.valueOfThis()); // Output: undefined or an error (depending on the environment)
```

In the arrow function within `obj2`, `this` does not refer to `obj2`. Instead, it inherits its value from the parent scope, which is the global object (window in a browser environment). Consequently, `obj2.valueOfThis()` returns undefined or may even throw an error, as `this.value` is not defined in the global scope.
