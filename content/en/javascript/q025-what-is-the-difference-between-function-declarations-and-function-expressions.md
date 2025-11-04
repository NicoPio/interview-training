---
id: 25
slug: what-is-the-difference-between-function-declarations-and-function-expressions
title: "What is the difference between function declarations and function expressions?"
category: javascript
difficulty: easy
tags: ["variables", "var", "let", "const", "hoisting"]
---

# What is the difference between function declarations and function expressions?



**Function Declaration:**

- A function declaration is a statement that defines a function and hoists it to the top of the current scope.
- It starts with the `function` keyword, followed by the function name, parameters (enclosed in parentheses), and the function body.
- Function declarations can be called before they are declared in the code because of hoisting.

**Example:**

```javascript
function add(a, b) {
  return a + b;
}
```

**Function Expression:**

- A function expression is an assignment where a function is defined as part of an expression.
- It does not get hoisted in the same way as function declarations.
- Function expressions are often used in cases where you need to assign a function to a variable or pass it as an argument to another function.

**Example:**

```javascript
var add = function (a, b) {
  return a + b;
};
```

In this example, `add` is a variable that holds an anonymous function. Function declarations are hoisted, while function expressions are not hoisted in the same way. If you try to call a function expression before its definition, you'll get an error.
