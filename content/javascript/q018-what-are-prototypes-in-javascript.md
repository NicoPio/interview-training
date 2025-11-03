---
id: 18
slug: what-are-prototypes-in-javascript
title: "What are prototypes in JavaScript?"
category: javascript
difficulty: easy
tags: ["types", "typing", "null", "undefined", "this"]
---

::question
What are prototypes in JavaScript?
::

::answer

- Every object in JavaScript has a prototype, which acts as a blueprint for shared properties and methods.
- When you try to access a property or method on an object, JavaScript first checks the object itself.
- If it's not found, it looks up the prototype chain, following a linked list of prototypes until it finds what it's looking for, or reaches the end (`null`).

#### Example:

```javascript
function Person(name) {
  this.name = name;
}

// Add a method to the prototype, shared by all Person objects:
Person.prototype.greet = function () {
  console.log("Hello, my name is " + this.name);
};

// Create two Person objects:
const person1 = new Person("Alice");
const person2 = new Person("Bob");

// Both objects can access the greet method from the prototype:
person1.greet(); // Output: "Hello, my name is Alice"
person2.greet(); // Output: "Hello, my name is Bob"
```

The `Person` function acts as a constructor to create objects with a `name` property.

The `greet` method is added to the `Person.prototype`, meaning it's shared by all instances created from `Person`.

When `person1.greet()` is called, JavaScript finds the `greet` method on the prototype, so it can be used even though it wasn't defined directly on `person1`.
