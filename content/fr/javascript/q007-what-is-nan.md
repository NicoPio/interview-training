---
id: 7
slug: what-is-nan
title: "Qu'est-ce que NaN ?"
category: javascript
difficulty: easy
tags: ["nan","numbers","types","typing","null"]
---

# Qu'est-ce que NaN ?



La `NaN` propriété in JavaScript represents a value that is "Not-a-Nombre," indicating an illegal or Indéfini numeric value. When checking La Type of `NaN` En utilisant `typeof` l'opérateur, it retourne "Nombre."

To determine if a value is `NaN`, La `isNaN()` fonction is employed. It converts La given value to a Nombre Type and then checks if it equals `NaN`.

**Exemple :**

```javascript
isNaN("Hello"); // Returns true, as "Hello" cannot be converted to a valid number
isNaN(NaN); // Returns true, as NaN is, by definition, Not-a Number
isNaN("123ABC"); // Returns true, as "123ABC" cannot be converted to a valid number
isNaN(undefined); // Returns true, as undefined cannot be converted to a valid number
isNaN(456); // Returns false, as 456 is a valid numeric value
isNaN(true); // Returns false, as true is converted to 1, a valid number
isNaN(null); // Returns false, as null is converted to 0, a valid number
```
