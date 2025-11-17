---
id: 23
slug: what-is-the-correct-way-to-use-the-rest-parameter-in-javascript
title: 'What is the correct way to use the rest parameter in JavaScript?'
category: javascript
difficulty: easy
tags: ['rest-parameters', 'spread', 'functions']
---

# What is the correct way to use the rest parameter in JavaScript?

The correct way to use the rest parameter in JavaScript is to ensure it is the last parameter in the function declaration.

**Valid Example:**

```javascript
function example(firstParam, ...restParams) {
  // code here
}
```

**Invalid Example:**

```javascript
function invalidExample(...restParams, lastParam) {
  // code here
}
```

In the invalid example, the rest parameter is not the last parameter, which is incorrect syntax.
