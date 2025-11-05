---
id: 28
slug: what-is-the-box-model
title: Qu'est-ce que le modèle de boîte CSS ?
category: css
difficulty: medium
tags:
  - css
  - box-model
  - layout
---

# Qu'est-ce que le modèle de boîte CSS ?

Le modèle de boîte CSS est un concept fondamental qui décrit comment les éléments sont structurés et affichés sur une page web. Chaque élément en CSS est représenté comme une boîte rectangulaire, et le modèle de boîte définit comment les différentes parties de cette boîte se comportent.

**Le modèle de boîte se compose de quatre zones principales:**

1. **Contenu**: Le contenu réel de l'élément (texte, images, etc.)
2. **Remplissage**: Espace entre le contenu et la bordure
3. **Bordure**: Une ligne entourant le remplissage et le contenu
4. **Marge**: Espace à l'extérieur de la bordure, séparant l'élément des autres éléments

```css
.box {
  width: 300px; /* Content width */
  height: 200px; /* Content height */
  padding: 20px; /* Space inside the border */
  border: 5px solid black; /* Border around padding and content */
  margin: 10px; /* Space outside the border */
}
```

**Calcul de la taille totale de l'élément:**

- Largeur totale = largeur + Remplissage-gauche + Remplissage-droite + Bordure-gauche + Bordure-droite
- Hauteur totale = hauteur + Remplissage-haut + Remplissage-bas + Bordure-haut + Bordure-bas

**Dimensionnement de boîte propriété:**

```css
/* Default behavior (content-box) */
.content-box {
  box-sizing: content-box;
  /* Width and height apply only to content */
}

/* Alternative behavior (border-box) */
.border-box {
  box-sizing: border-box;
  /* Width and height include padding and border */
}
```
