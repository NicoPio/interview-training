---
id: 9
slug: what-are-higher-order-functions-in-javascript
title: "Que sont les fonctions d'ordre supérieur en JavaScript ?"
category: javascript
difficulty: easy
tags: ["higher-order-functions","fonctions"]
---

# Que sont les fonctions d'ordre supérieur en JavaScript ?



Fonctions qui traitent d'autres fonctions comme des valeurs, soit en:

1. Prenant une ou plusieurs fonctions comme arguments
2. Retournant une fonction comme résultat

**Exemples courants de HOF intégrées:**

1. **map() :**
   - Applique une fonction à chaque élément d'un tableau et crée un nouveau tableau avec les résultats.
   - **Exemple :**
     ```javascript
     const numbers = [1, 2, 3, 4, 5];
     const doubledNumbers = numbers.map((number) => number * 2); // [2, 4, 6, 8, 10]
     ```

2. **filter() :**
   - Crée un nouveau tableau contenant uniquement les éléments qui passent un test implémenté par une fonction fournie.
   - **Exemple :**
     ```javascript
     const numbers = [1, 2, 3, 4, 5];
     const evenNumbers = numbers.filter((number) => number % 2 === 0); // [2, 4]
     ```

3. **reduce() :**
   - Applique une fonction contre un accumulateur et chaque élément d'un tableau (de gauche à droite) pour le réduire à une seule valeur.
   - **Exemple :**
     ```javascript
     const numbers = [1, 2, 3, 4];
     const sum = numbers.reduce(
       (accumulator, number) => accumulator + number,
       0
     ); // 10
     ```

**Créer des HOF personnalisées:**

Vous pouvez définir vos propres HOF pour encapsuler des modèles et opérations courants:

```javascript
function createMultiplier(factor) {
  return (number) => number * factor;
}

const triple = createMultiplier(3);
const tripledNumbers = numbers.map(triple); // [3, 6, 9, 12, 15]
```
