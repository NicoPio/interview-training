---
id: 1
slug: how-do-you-detect-primitive-or-non-primitive-value-types-in-javascript
title: "How do you detect primitive or non-primitive value types in JavaScript?"
category: javascript
difficulty: medium
tags: ["primitives", "types", "variables", "var", "let"]
---

::question
How do you detect primitive or non-primitive value types in JavaScript?
::

::answer
In JavaScript, values are generally categorized as either primitive or non-primitive (also known as reference types). Primitive values include:

1. **Number**: Represents numeric values.
2. **String**: Represents textual data.
3. **Boolean**: Represents true or false.
4. **Undefined**: Represents an uninitialized variable or absence of a value.
5. **Null**: Represents the intentional absence of any object value.
6. **Symbol**: Represents a unique identifier.

Non-primitive values are objects, which include arrays, functions, and custom objects.

We can detect primitive or non-primitive in JavaScript in the following ways:

#### 1. Using the `typeof` operator:

- This operator returns a string indicating the type of a value.
- Primitive types will return their corresponding strings (e.g., "number", "string", "boolean").
- Non-primitive types will typically return "object" or "function".

```javascript
// Using the typeof operator:

let num = 10;
let str = "Hello";
let bool = true;
let obj = {};
let func = function () {};

console.log(typeof num); // Output: "number"
console.log(typeof str); // Output: "string"
console.log(typeof bool); // Output: "boolean"
console.log(typeof obj); // Output: "object"
console.log(typeof func); // Output: "function"
```

**Important note:** `typeof null` returns "object" even though it's a primitive value.

### 2. Using the Object() constructor:

- This constructor creates a new object wrapper for a value.
- If a value is primitive, it will be equal to its object-wrapped version.
- If a value is non-primitive, it won't be equal to its object-wrapped version.

```javascript
// Using the Object() constructor:

console.log(num === Object(num)); // Output: true (primitive)
console.log(obj === Object(obj)); // Output: false (non-primitive)
```
