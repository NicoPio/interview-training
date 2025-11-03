---
id: 7
slug: what-is-nan
title: "What is NaN?"
category: javascript
difficulty: easy
tags: ["nan", "numbers", "types", "typing", "null"]
---

::question
What is NaN?
::

::answer
The `NaN` property in JavaScript represents a value that is "Not-a-Number," indicating an illegal or undefined numeric value. When checking the type of `NaN` using the `typeof` operator, it returns "Number."

To determine if a value is `NaN`, the `isNaN()` function is employed. It converts the given value to a Number type and then checks if it equals `NaN`.

**Example:**

```javascript
isNaN("Hello"); // Returns true, as "Hello" cannot be converted to a valid number
isNaN(NaN); // Returns true, as NaN is, by definition, Not-a Number
isNaN("123ABC"); // Returns true, as "123ABC" cannot be converted to a valid number
isNaN(undefined); // Returns true, as undefined cannot be converted to a valid number
isNaN(456); // Returns false, as 456 is a valid numeric value
isNaN(true); // Returns false, as true is converted to 1, a valid number
isNaN(null); // Returns false, as null is converted to 0, a valid number
```
