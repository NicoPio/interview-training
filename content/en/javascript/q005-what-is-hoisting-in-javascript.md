---
id: 5
slug: what-is-hoisting-in-javascript
title: "What is hoisting in JavaScript?"
category: javascript
difficulty: medium
tags: ["variables", "var", "let", "const", "hoisting"]
---

# What is hoisting in JavaScript?



In JavaScript, hoisting is a phenomenon where variable and function declarations are conceptually moved to the top of their respective scopes, even if they're written later in the code. This behaviour applies to both global and local scopes.

**Examples to illustrate hoisting:**

**Example 1: Variable Hoisting**

```javascript
console.log(myMessage); // Outputs "undefined", not an error
var myMessage = "Greetings!";
```

While `myMessage` appears declared after its use, it's hoisted to the top of the scope, allowing its reference (but not its initial value) before the actual declaration line.

**Example 2: Function Hoisting**

```javascript
sayHello(); // Outputs "Hello, world!"
function sayHello() {
  console.log("Hello, world!");
}
```

Even though `sayHello` is defined after its call, JavaScript acts as if it were declared at the beginning of the scope, enabling its execution.

**Example 3: Hoisting within Local Scopes**

```javascript
function performTask() {
  result = 100; // Hoisted within the function
  console.log(result); // Outputs 100
  var result;
}
performTask();
```

Hoisting also occurs within local scopes, like functions. Here, `result` is hoisted to the top of the `performTask` function, allowing its use before its explicit declaration.

**Key Points:**

- Only declarations are hoisted, not initializations. The example with `console.log(x);` demonstrates this, as `x` is declared but not initialized before its use, resulting in `undefined`.
- Strict mode enforces declaration: Using "use strict"; at the beginning of your code prevents using variables before they're declared, helping avoid potential hoisting-related issues.
