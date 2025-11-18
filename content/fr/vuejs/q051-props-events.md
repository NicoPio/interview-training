---
id: 51
slug: props-events
title: 'Comment fonctionnent les props et events dans Vue.js ?'
category: vuejs
difficulty: easy
tags: ['props', 'events', 'emit', 'communication']
---

# Comment fonctionnent les props et events dans Vue.js ?

Props et events permettent la communication entre composants parent-enfant.

## Props (Parent → Enfant)

### Définition

```vue
<!-- Child.vue -->
<script setup>
// Options API
defineProps({
  title: String,
  count: {
    type: Number,
    required: true,
    default: 0
  }
})

// TypeScript
interface Props {
  title: string
  count: number
}
const props = defineProps<Props>()
</script>

<template>
  <h2>{{ title }}</h2>
  <p>Count: {{ count }}</p>
</template>
```

### Utilisation

```vue
<!-- Parent.vue -->
<template>
  <Child title="Hello" :count="42" />
</template>
```

## Events (Enfant → Parent)

### Emit

```vue
<!-- Child.vue -->
<script setup>
const emit = defineEmits(['update', 'delete'])

const handleClick = () => {
  emit('update', { id: 1, name: 'John' })
}
</script>

<template>
  <button @click="handleClick">Update</button>
  <button @click="emit('delete', 1)">Delete</button>
</template>
```

### Écoute

```vue
<!-- Parent.vue -->
<script setup>
const handleUpdate = (data) => {
  console.log('Updated:', data)
}

const handleDelete = (id) => {
  console.log('Deleted:', id)
}
</script>

<template>
  <Child
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>
```

## v-model (Two-way binding)

### Enfant

```vue
<!-- Input.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  >
</template>
```

### Parent

```vue
<template>
  <Input v-model="text" />
  <!-- Équivalent à: -->
  <Input
    :model-value="text"
    @update:model-value="text = $event"
  />
</template>
```

## Résumé

**Props** : Données parent → enfant
**Events** : Actions enfant → parent
**v-model** : Two-way binding
