---
id: 21
slug: what-are-promises-in-javascript
title: 'What are promises in JavaScript?'
category: javascript
difficulty: easy
tags: ['this', 'context', 'call', 'apply', 'bind']
---

# What are promises in JavaScript?

JavaScript Promises offer a streamlined approach to managing asynchronous operations, mitigating the callback hell problem encountered with events and traditional callback functions. Before Promises, working with callbacks often led to code that was hard to manage due to nested structures. Promises serve as a cleaner solution for handling asynchronous tasks in JavaScript.

**Syntax for creating a Promise:**

```javascript
let promise = new Promise(function (resolve, reject) {
  // Perform asynchronous operations
})
```

The Promise constructor takes a single callback function as its argument, which, in turn, accepts two parameters: `resolve` and `reject`. The operations inside this callback determine whether the Promise is fulfilled by calling `resolve` or rejected by calling `reject`.

A Promise can exist in one of four states:

- **fulfilled:** The action related to the promise succeeded.
- **rejected:** The action related to the promise failed.
- **pending:** The promise is still awaiting fulfillment or rejection.
- **settled:** The promise has been either fulfilled or rejected.
