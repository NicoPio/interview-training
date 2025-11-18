---
id: 55
slug: vue-slots
title: 'Comment fonctionnent les slots dans Vue.js ?'
category: vuejs
difficulty: medium
tags: ['slots', 'composition', 'templates']
---

# Comment fonctionnent les slots dans Vue.js ?

Les slots permettent de composer des composants en passant du contenu template.

## Slot par Défaut

```vue
<!-- Button.vue -->
<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<!-- Usage -->
<Button>Click me</Button>
<!-- Rendu: <button class="btn">Click me</button> -->
```

## Fallback Content

```vue
<template>
  <button>
    <slot>Default text</slot>
  </button>
</template>

<Button></Button> <!-- "Default text" -->
<Button>Custom</Button> <!-- "Custom" -->
```

## Named Slots

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot> <!-- Slot par défaut -->
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- Usage -->
<Card>
  <template #header>
    <h1>Title</h1>
  </template>

  <p>Main content</p>

  <template #footer>
    <button>OK</button>
  </template>
</Card>
```

## Scoped Slots

```vue
<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index"></slot>
    </li>
  </ul>
</template>

<!-- Usage -->
<List :items="users">
  <template #default="{ item, index }">
    <span>{{ index }}: {{ item.name }}</span>
  </template>
</List>
```

## Slot Props

```vue
<!-- DataTable.vue -->
<template>
  <table>
    <tr v-for="row in data" :key="row.id">
      <slot :row="row" :delete="() => handleDelete(row.id)">
        {{ row.name }}
      </slot>
    </tr>
  </table>
</template>

<!-- Usage -->
<DataTable :data="users">
  <template #default="{ row, delete: deleteRow }">
    <td>{{ row.name }}</td>
    <td><button @click="deleteRow">Delete</button></td>
  </template>
</DataTable>
```

## useSlots (Composition API)

```vue
<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

// Vérifier si slot existe
const hasHeader = !!slots.header
</script>

<template>
  <div v-if="hasHeader">
    <slot name="header"></slot>
  </div>
</template>
```

## Résumé

- **Slot par défaut** : Contenu simple
- **Named slots** : Multiples zones
- **Scoped slots** : Passer données à parent
- **Fallback** : Contenu par défaut
