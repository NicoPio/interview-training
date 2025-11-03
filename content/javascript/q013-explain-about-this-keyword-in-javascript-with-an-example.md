---
id: 13
slug: explain-about-this-keyword-in-javascript-with-an-example
title: "Explain about this keyword in JavaScript with an example."
category: javascript
difficulty: easy
tags: ["variables", "var", "let", "const", "this"]
---

::question
Explain about this keyword in JavaScript with an example.
::

::answer
In JavaScript, the `this` keyword is a special variable that is automatically defined in the scope of every function. Its value depends on how the function is invoked. The `this` keyword is used to refer to the object that is the current context of the function or, more simply, the object that the function is a method of.

**Global Context:**
When `this` is used outside of any function or method, it refers to the global object (in a browser environment, it usually refers to `window`).

```javascript
console.log(this); // refers to the global object (e.g., window in a browser)
```

**Method Invocation:**
When a function is a method of an object, `this` refers to that object.

```javascript
const myObject = {
  myMethod: function () {
    console.log(this); // refers to myObject
  },
};

myObject.myMethod();
```

**Constructor Function:**
When a function is used as a constructor with the `new` keyword, `this` refers to the newly created instance of the object.

```javascript
function MyClass() {
  this.property = "some value";
}

const myInstance = new MyClass();
console.log(myInstance.property); // 'some value'
```
