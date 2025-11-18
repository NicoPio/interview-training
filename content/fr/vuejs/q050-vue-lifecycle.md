---
id: 50
slug: vue-lifecycle
title: 'Quels sont les lifecycle hooks dans Vue.js ?'
category: vuejs
difficulty: medium
tags: ['lifecycle', 'hooks', 'onmounted', 'setup']
---

# Quels sont les lifecycle hooks dans Vue.js ?

Les lifecycle hooks permettent d'exécuter du code à différentes étapes du cycle de vie d'un composant.

## Options API

```javascript
export default {
  beforeCreate() {
    // Avant création instance
  },
  created() {
    // Instance créée, data disponible
  },
  beforeMount() {
    // Avant montage dans le DOM
  },
  mounted() {
    // Composant monté dans le DOM
  },
  beforeUpdate() {
    // Avant mise à jour du DOM
  },
  updated() {
    // DOM mis à jour
  },
  beforeUnmount() {
    // Avant démontage (Vue 3)
  },
  unmounted() {
    // Composant démonté (Vue 3)
  }
}
```

## Composition API

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// Pas de beforeCreate/created (remplacé par setup)

onBeforeMount(() => {
  console.log('Before mount')
})

onMounted(() => {
  console.log('Mounted')
})

onBeforeUpdate(() => {
  console.log('Before update')
})

onUpdated(() => {
  console.log('Updated')
})

onBeforeUnmount(() => {
  console.log('Before unmount')
})

onUnmounted(() => {
  console.log('Unmounted')
})
```

## Ordre d'Exécution

```
1. setup() / beforeCreate/created
2. onBeforeMount
3. onMounted
   ↓ (changements réactifs)
4. onBeforeUpdate
5. onUpdated
   ↓ (démontage)
6. onBeforeUnmount
7. onUnmounted
```

## Cas d'Usage

### onMounted - API calls, DOM access

```vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  // Fetch data
  const response = await fetch('/api/data')
  data.value = await response.json()

  // Accès DOM
  const el = document.querySelector('.my-element')
  el.focus()
})
</script>
```

### onUnmounted - Cleanup

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

let interval

onMounted(() => {
  interval = setInterval(() => {
    console.log('Tick')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
```

### onUpdated - Post-render actions

```vue
<script setup>
import { onUpdated } from 'vue'

onUpdated(() => {
  // DOM a changé
  console.log('Component updated')
})
</script>
```

## Résumé

**Montage** :
- `onBeforeMount` → `onMounted`

**Mise à jour** :
- `onBeforeUpdate` → `onUpdated`

**Démontage** :
- `onBeforeUnmount` → `onUnmounted`

**Usage courant** : `onMounted` (fetch, DOM), `onUnmounted` (cleanup).
