---
id: 14
slug: what-is-scope-in-javascript
title: "What is scope in JavaScript?"
category: javascript
difficulty: medium
tags: ["variables", "var", "let", "const", "this"]
---

# What is scope in JavaScript?



In JavaScript, the term "scope" refers to the context in which variables and functions are declared and accessed. It defines the visibility and accessibility of these variables and functions within the code. Understanding scope is crucial for managing the lifecycle and behavior of variables and functions in a program.

**Global Scope:**

- Variables declared outside of any function or block have global scope.
- Global variables are accessible throughout the entire code, including within functions.

```javascript
var globalVar = "I am global";

function exampleFunction() {
  console.log(globalVar); // Accessible inside the function
}

exampleFunction();
console.log(globalVar); // Accessible outside the function
```

**Local Scope:**

- Variables declared inside a function or block have local scope.
- Local variables are only accessible within the function or block where they are declared.

```javascript
function exampleFunction() {
  var localVar = "I am local";
  console.log(localVar); // Accessible inside the function
}

exampleFunction();
// console.log(localVar); // This would result in an error because localVar is not accessible outside the function
```

**Scope Chain:**
The scope chain refers to the hierarchy of scopes in a program. When a variable or function is referenced, JavaScript looks for it in the current scope and then traverses up the scope chain until it finds the variable or reaches the global scope.
