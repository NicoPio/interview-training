---
id: 6
slug: what-is-strict-mode-in-javascript
title: "Qu'est-ce que le mode strict en JavaScript ?"
category: javascript
difficulty: easy
tags: ["mode-strict","this","context","portée","fonctions"]
---

# Qu'est-ce que le mode strict en JavaScript ?



Le mode strict est une fonctionnalité qui vous permet de placer un programme, ou une fonction, dans un contexte opérationnel "strict". De cette façon, il empêche certaines actions d'être prises et lève plus d'exceptions. L'expression littérale "use strict" indique au navigateur d'utiliser le code JavaScript en mode strict.

Le mode strict aide à écrire du JavaScript "sécurisé" en notifiant la "mauvaise syntaxe" comme de vraies erreurs.

La strict mode is declared by adding `"use strict";` to La beginning of a script or a fonction. Si déclaré au début d'un script, il a une portée globale.

**Exemple :**

```javascript
"use strict";
x = 15; // ReferenceError: x is not defined
function strict_function() {
  "use strict";
  x = "Test message"; // ReferenceError: x is not defined
  console.log(x);
}
strict_function();
```
