---
id: 9
slug: what-are-higher-order-functions-in-javascript
title: 'What are Higher-Order Functions in JavaScript?'
category: javascript
difficulty: easy
tags: ['higher-order-functions', 'functions']
---

# What are Higher-Order Functions in JavaScript?

Functions that treat other functions as values, either by:

1. Taking one or more functions as arguments
2. Returning a function as a result

**Common Examples of Built-in HOFs:**

1. **map():**
   - Applies a function to each element of an array and creates a new array with the results.
   - **Example:**
     ```javascript
     const numbers = [1, 2, 3, 4, 5]
     const doubledNumbers = numbers.map((number) => number * 2) // [2, 4, 6, 8, 10]
     ```

2. **filter():**
   - Creates a new array containing only elements that pass a test implemented by a provided function.
   - **Example:**
     ```javascript
     const numbers = [1, 2, 3, 4, 5]
     const evenNumbers = numbers.filter((number) => number % 2 === 0) // [2, 4]
     ```

3. **reduce():**
   - Applies a function against an accumulator and each element in an array (from left to right) to reduce it to a single value.
   - **Example:**
     ```javascript
     const numbers = [1, 2, 3, 4]
     const sum = numbers.reduce((accumulator, number) => accumulator + number, 0) // 10
     ```

**Creating Custom HOFs:**

You can define your own HOFs to encapsulate common patterns and operations:

```javascript
function createMultiplier(factor) {
  return (number) => number * factor
}

const triple = createMultiplier(3)
const tripledNumbers = numbers.map(triple) // [3, 6, 9, 12, 15]
```
