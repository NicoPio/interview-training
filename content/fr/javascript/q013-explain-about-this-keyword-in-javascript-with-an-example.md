---
id: 13
slug: explain-about-this-keyword-in-javascript-with-an-example
title: "Expliquez le mot-clé this en JavaScript avec un exemple."
category: javascript
difficulty: easy
tags: ["variables","var","let","const","this"]
---

# Expliquez le mot-clé this en JavaScript avec un exemple.



In JavaScript, La `this` keyword is a special variable that is automatically defined in La Portée of every fonction. Sa valeur dépend de la façon dont la fonction est invoquée. La `this` keyword is used to refer to La object that is La current context of La fonction or, more simply, La object that La fonction is a method of.

**Contexte global :**
When `this` is used outside of any fonction or method, it refers to La global object (in a browser environment, it usually refers to `window`).

```javascript
console.log(this); // refers to the global object (e.g., window in a browser)
```

**Invocation de méthode :**
When a fonction is a method of an object, `this` refers to that object.

```javascript
const myObject = {
  myMethod: function () {
    console.log(this); // refers to myObject
  },
};

myObject.myMethod();
```

**Fonction constructeur :**
When a fonction is used car a constructeur with La `new` keyword, `this` refers to La newly created instance of La object.

```javascript
function MyClass() {
  this.property = "some value";
}

const myInstance = new MyClass();
console.log(myInstance.property); // 'some value'
```
