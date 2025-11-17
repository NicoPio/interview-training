---
id: 21
slug: what-are-promises-in-javascript
title: 'Que sont les promesses (promises) en JavaScript ?'
category: javascript
difficulty: easy
tags: ['this', 'context', 'call', 'apply', 'bind']
---

# Que sont les promesses (promises) en JavaScript ?

Les promesses JavaScript offrent une approche simplifiée pour gérer les opérations asynchrones, atténuant le problème de callback hell rencontré avec les événements et les fonctions de rappel traditionnelles. Avant les promesses, travailler avec des callbacks menait souvent à du code difficile à gérer en raison de structures imbriquées. Les promesses servent de solution plus propre pour gérer les tâches asynchrones en JavaScript.

**Syntaxe pour créer une promesse:**

```javascript
let promise = new Promise(function (resolve, reject) {
  // Perform asynchronous operations
})
```

Le constructeur Promise prend une seule fonction de rappel comme argument, qui, à son tour, accepte deux paramètres: `resolve` and `reject`. Les opérations à l'intérieur de ce rappel déterminent si la promesse est résolue en appelant `resolve` ou rejetée en appelant `reject`.

Une promesse peut exister dans l'un des quatre états:

- **résolue:** L'action liée à la promesse a réussi.
- **rejetée:** L'action liée à la promesse a échoué.
- **en attente:** La promesse attend toujours sa résolution ou son rejet.
- **établie:** La promesse a été soit résolue soit rejetée.
