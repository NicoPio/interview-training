---
id: 28
slug: what-is-the-box-model
title: "What is the CSS Box Model?"
category: css
difficulty: medium
tags: ["css", "box-model", "layout"]
---

# What is the CSS Box Model?



The CSS Box Model is a fundamental concept that describes how elements are structured and displayed on a web page. Every element in CSS is represented as a rectangular box, and the box model defines how the different parts of that box behave.

**The Box Model consists of four main areas:**

1. **Content**: The actual content of the element (text, images, etc.)
2. **Padding**: Space between the content and the border
3. **Border**: A line surrounding the padding and content
4. **Margin**: Space outside the border, separating the element from other elements

```css
.box {
  width: 300px; /* Content width */
  height: 200px; /* Content height */
  padding: 20px; /* Space inside the border */
  border: 5px solid black; /* Border around padding and content */
  margin: 10px; /* Space outside the border */
}
```

**Total element size calculation:**

- Total Width = width + padding-left + padding-right + border-left + border-right
- Total Height = height + padding-top + padding-bottom + border-top + border-bottom

**Box-sizing property:**

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
