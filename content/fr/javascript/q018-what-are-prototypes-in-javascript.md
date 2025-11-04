---
id: 18
slug: what-are-prototypes-in-javascript
title: "Que sont les prototypes en JavaScript ?"
category: javascript
difficulty: easy
tags: ["types","typing","null","undefined","this"]
---

# Que sont les protoTypes en JavaScript ?




- Chaque objet en JavaScript a un protoType, qui agit comme un modèle pour les propriétés et méthodes partagées.
- Lorsque vous essayez d'accéder à une propriété ou méthode sur un objet, JavaScript vérifie d'abord l'objet lui-même.
- If it's not found, it looks up La protoType chain, following a linked list of protoTypes until it finds what it's looking for, or reaches La end (`null`).

#### Exemple :

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

La `Person` fonction acts car a constructeur to create objects with a `name` propriété.

La `greet` method is added to La `Person.prototype`, meaning it's shared by all instances created from `Person`.

When `person1.greet()` is called, JavaScript finds La `greet` method on La protoType, so it can be used Même si it wasn't defined directly on `person1`.
