---
id: 16
slug: explain-call-apply-and-bind-methods-in-javascript
title: "Explain call(), apply() and bind() methods in JavaScript."
category: javascript
difficulty: medium
tags: ["this", "context", "call", "apply", "bind"]
---

::question
Explain call(), apply() and bind() methods in JavaScript.
::

::answer
In JavaScript, the `call`, `apply`, and `bind` methods are used to manipulate how a function is invoked and set the value of `this` within the function.

#### call method:

The `call` method is used to invoke a function with a specified `this` value and arguments provided individually.

```javascript
function sayHello(greeting) {
  console.log(greeting + " " + this.name);
}

const person = { name: "John" };

sayHello.call(person, "Hello"); // Outputs: Hello John
```

Here, `call` is used to invoke the `sayHello` function with `person` as the `this` value, and `'Hello'` as an argument.

---

#### apply method:

The `apply` method is similar to `call`, but it accepts arguments as an array.

```javascript
function sayHello(greeting) {
  console.log(greeting + " " + this.name);
}

const person = { name: "John" };

sayHello.apply(person, ["Hello"]); // Outputs: Hello John
```

In this example, `apply` is used to achieve the same result as `call`, but the arguments are provided as an array.

---

#### bind method:

The `bind` method creates a new function with a specified `this` value and, optionally, initial arguments.

```javascript
function sayHello(greeting) {
  console.log(greeting + " " + this.name);
}

const person = { name: "John" };

const sayHelloToJohn = sayHello.bind(person);
sayHelloToJohn("Hello"); // Outputs: Hello John
```

Here, `bind` is used to create a new function (`sayHelloToJohn`) where `this` is permanently set to `person`. When calling `sayHelloToJohn`, it's as if you're calling `sayHello` with `person` as `this`.

These methods are especially useful when dealing with functions that are part of objects or classes, and you want to explicitly set the context (`this`) for their execution.
