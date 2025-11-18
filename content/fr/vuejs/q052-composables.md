---
id: 52
slug: composables
title: 'Que sont les composables dans Vue 3 ?'
category: vuejs
difficulty: medium
tags: ['composables', 'composition-api', 'reusability']
---

# Que sont les composables dans Vue 3 ?

Les composables sont des fonctions qui encapsulent de la logique réactive réutilisable.

## Exemple Simple

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const double = computed(() => count.value * 2)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    double,
    increment,
    decrement,
    reset
  }
}
```

### Utilisation

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, double, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <p>Count: {{ count }}</p>
  <p>Double: {{ double }}</p>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="reset">Reset</button>
</template>
```

## Exemples Pratiques

### useFetch

```javascript
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  fetchData()

  return { data, error, loading, refetch: fetchData }
}
```

### useLocalStorage

```javascript
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const value = ref(stored ? JSON.parse(stored) : defaultValue)

  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return value
}
```

### useMouse

```javascript
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

## Convention

- Préfixe `use`
- Retourner refs/reactive
- Inclure cleanup (onUnmounted)

## Résumé

Les composables permettent de :
- Réutiliser la logique
- Organiser le code
- Partager entre composants
- Alternative propre aux mixins
