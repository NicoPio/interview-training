---
id: 16
slug: explain-call-apply-and-bind-methods-in-javascript
title: 'Expliquez les méthodes call(), apply() et bind() en JavaScript.'
category: javascript
difficulty: medium
tags: ['this', 'context', 'call', 'apply', 'bind']
---

# Expliquez les méthodes call(), apply() et bind() en JavaScript.

In JavaScript, La `call`, `apply`, and `bind` methods are used to manipulate how a fonction is invoked and set La value of `this` within La fonction.

#### Méthode call :

La `call` method is used to invoke a fonction with a specified `this` value and arguments provided individually.

```javascript
function sayHello(greeting) {
  console.log(greeting + ' ' + this.name)
}

const person = { name: 'John' }

sayHello.call(person, 'Hello') // Outputs: Hello John
```

Ici, `call` is used to invoke La `sayHello` fonction with `person` car La `this` value, and `'Hello'` car an argument.

---

#### Méthode apply :

La `apply` method is similar to `call`, but it accepts arguments car an array.

```javascript
function sayHello(greeting) {
  console.log(greeting + ' ' + this.name)
}

const person = { name: 'John' }

sayHello.apply(person, ['Hello']) // Outputs: Hello John
```

Dans cet Exemple, `apply` is used to achieve La same result car `call`, but La arguments are provided car an array.

---

#### Méthode bind :

La `bind` method creates a new fonction with a specified `this` value and, optionally, initial arguments.

```javascript
function sayHello(greeting) {
  console.log(greeting + ' ' + this.name)
}

const person = { name: 'John' }

const sayHelloToJohn = sayHello.bind(person)
sayHelloToJohn('Hello') // Outputs: Hello John
```

Ici, `bind` is used to create a new fonction (`sayHelloToJohn`) where `this` is permanently set to `person`. When Appeler `sayHelloToJohn`, it's car if you're Appeler `sayHello` with `person` car `this`.

These methods are especially useful when dealing with fonctions that are part of objects or classes, and you want to explicitly set La context (`this`) for their execution.
