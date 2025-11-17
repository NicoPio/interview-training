---
id: 24
slug: what-are-generator-functions-in-javascript
title: 'What are generator functions in JavaScript?'
category: javascript
difficulty: easy
tags: ['this', 'context', 'call', 'apply', 'bind']
---

# What are generator functions in JavaScript?

In JavaScript, generator functions are a special kind of function that allows you to control the execution flow and pause/resume it at certain points. Generator functions are defined using the `function*` syntax and use the `yield` keyword to produce a sequence of values. When a generator function is called, it returns an iterator called a generator.

**Example:**

```javascript
function* simpleGenerator() {
  yield 1
  yield 2
  yield 3
}

const generator = simpleGenerator()

console.log(generator.next()) // { value: 1, done: false }
console.log(generator.next()) // { value: 2, done: false }
console.log(generator.next()) // { value: 3, done: false }
console.log(generator.next()) // { value: undefined, done: true }
```

In this example:

- The `function* simpleGenerator()` syntax defines a generator function.
- The `yield` keyword is used to produce values. Each time `yield` is encountered, the generator pauses its execution, and the yielded value is returned to the caller along with `done: false`. The generator can be resumed later.
- The `generator.next()` method is used to advance the generator's execution. It returns an object with two properties: `value` (the yielded value) and `done` (a boolean indicating whether the generator has finished).

Generators are useful for lazy evaluation, asynchronous programming, and creating iterable sequences.
