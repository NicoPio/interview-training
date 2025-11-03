---
id: 15
slug: what-is-closure-in-javascript
title: "What is closure in JavaScript?"
category: javascript
difficulty: medium
tags: ["variables", "var", "let", "const", "scope"]
---

::question
What is closure in JavaScript?
::

::answer
In JavaScript, a closure is a function along with its lexical scope, which allows it to access variables from its outer (enclosing) scope even after that scope has finished executing. A closure allows a function to remember and access variables from the environment in which it was created, even if the function is executed in a different scope.

Here's an example to illustrate closures in JavaScript:

```javascript
function outerFunction() {
  // Outer function scope
  let outerVariable = 10;

  function innerFunction() {
    // Inner function scope
    let innerVariable = 5;
    // Accessing both inner and outer variables
    console.log("Inner Variable:", innerVariable);
    console.log("Outer Variable:", outerVariable);
  }

  // Returning the inner function, creating a closure
  return innerFunction;
}

// Calling outerFunction returns innerFunction, which is now a closure
let closureFunction = outerFunction();

// Executing the closure function
closureFunction();
```

**Explanation:**

- `outerFunction` defines an outer variable (`outerVariable`) and an inner function (`innerFunction`).
- `innerFunction` has access to the variables of its outer function (`outerVariable`).
- `outerFunction` returns `innerFunction`, creating a closure.
- The returned `closureFunction` retains access to the `outerVariable` even after `outerFunction` has finished executing.
- Calling `closureFunction()` logs both the inner and outer variables to the console.
