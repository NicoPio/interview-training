---
id: 6
slug: what-is-strict-mode-in-javascript
title: 'What is Strict Mode in JavaScript?'
category: javascript
difficulty: easy
tags: ['strict-mode', 'this', 'context', 'scope', 'functions']
---

# What is Strict Mode in JavaScript?

Strict Mode is a feature that allows you to place a program, or a function, in a "strict" operating context. This way it prevents certain actions from being taken and throws more exceptions. The literal expression "use strict" instructs the browser to use the JavaScript code in the Strict mode.

Strict mode helps in writing "secure" JavaScript by notifying "bad syntax" into real errors.

The strict mode is declared by adding `"use strict";` to the beginning of a script or a function. If declared at the beginning of a script, it has global scope.

**Example:**

```javascript
'use strict'
x = 15 // ReferenceError: x is not defined
function strict_function() {
  'use strict'
  x = 'Test message' // ReferenceError: x is not defined
  console.log(x)
}
strict_function()
```
