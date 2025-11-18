---
id: 49
slug: vue-directives
title: 'Quelles sont les principales directives Vue.js ?'
category: vuejs
difficulty: easy
tags: ['directives', 'v-if', 'v-for', 'v-model', 'v-bind']
---

# Quelles sont les principales directives Vue.js ?

Les directives sont des attributs spéciaux préfixés par `v-` qui appliquent un comportement réactif au DOM.

## v-if, v-else-if, v-else

```vue
<template>
  <div v-if="type === 'A'">Type A</div>
  <div v-else-if="type === 'B'">Type B</div>
  <div v-else>Type C</div>
</template>
```

**Comportement** : Rendu conditionnel (ajoute/supprime du DOM).

## v-show

```vue
<template>
  <div v-show="isVisible">Visible</div>
</template>
```

**Comportement** : Toggle `display: none` (reste dans le DOM).

**v-if vs v-show** :
- `v-if` : Lazy rendering, coût toggle élevé
- `v-show` : Toujours rendu, coût toggle faible

## v-for

```vue
<template>
  <!-- Array -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }}: {{ item.name }}
  </li>

  <!-- Object -->
  <div v-for="(value, key) in object" :key="key">
    {{ key }}: {{ value }}
  </div>

  <!-- Range -->
  <span v-for="n in 10" :key="n">{{ n }}</span>
</template>
```

**Important** : Toujours utiliser `:key` unique.

## v-model

```vue
<template>
  <!-- Input -->
  <input v-model="message">

  <!-- Checkbox -->
  <input type="checkbox" v-model="checked">

  <!-- Radio -->
  <input type="radio" v-model="picked" value="A">

  <!-- Select -->
  <select v-model="selected">
    <option>A</option>
    <option>B</option>
  </select>

  <!-- Modifiers -->
  <input v-model.trim="text">
  <input v-model.number="age">
  <input v-model.lazy="message">
</template>
```

## v-bind (:)

```vue
<template>
  <!-- Attribut -->
  <img v-bind:src="imageSrc">
  <img :src="imageSrc"> <!-- Raccourci -->

  <!-- Class -->
  <div :class="{ active: isActive, error: hasError }">
  <div :class="[classA, classB]">

  <!-- Style -->
  <div :style="{ color: textColor, fontSize: size + 'px' }">

  <!-- Props -->
  <Child :title="pageTitle" />
</template>
```

## v-on (@)

```vue
<template>
  <!-- Event -->
  <button v-on:click="handleClick">
  <button @click="handleClick"> <!-- Raccourci -->

  <!-- Event avec argument -->
  <button @click="handleClick('arg')">

  <!-- Modifiers -->
  <button @click.prevent="submit">
  <input @keyup.enter="submit">
  <div @click.stop="handleClick">
</template>
```

## v-slot (#)

```vue
<template>
  <!-- Named slot -->
  <MyComponent>
    <template v-slot:header>
      <h1>Header</h1>
    </template>

    <!-- Raccourci -->
    <template #footer>
      <p>Footer</p>
    </template>
  </MyComponent>

  <!-- Scoped slot -->
  <MyComponent v-slot="{ item }">
    {{ item.name }}
  </MyComponent>
</template>
```

## v-pre

```vue
<template>
  <!-- Skip compilation -->
  <span v-pre>{{ this will not be compiled }}</span>
</template>
```

## v-once

```vue
<template>
  <!-- Render once -->
  <span v-once>{{ message }}</span>
</template>
```

## v-memo (Vue 3.2+)

```vue
<template>
  <!-- Memoize subtree -->
  <div v-memo="[value1, value2]">
    <!-- Re-render uniquement si value1 ou value2 change -->
  </div>
</template>
```

## Directives Personnalisées

```javascript
// directive.js
export const vFocus = {
  mounted(el) {
    el.focus()
  }
}
```

```vue
<template>
  <input v-focus>
</template>

<script setup>
import { vFocus } from './directives'
</script>
```

## Résumé

- **v-if/v-show** : Affichage conditionnel
- **v-for** : Boucles (avec :key)
- **v-model** : Two-way binding
- **v-bind (:)** : Attributs dynamiques
- **v-on (@)** : Event listeners
- **v-slot (#)** : Slots
