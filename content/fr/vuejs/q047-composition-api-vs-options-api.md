---
id: 47
slug: composition-api-vs-options-api
title: 'Quelle est la différence entre Composition API et Options API dans Vue.js ?'
category: vuejs
difficulty: medium
tags: ['composition-api', 'options-api', 'vue3', 'setup']
---

# Quelle est la différence entre Composition API et Options API dans Vue.js ?

Vue 3 propose deux APIs pour écrire des composants : Options API (Vue 2 style) et Composition API (nouvelle approche).

## Options API

**Principe** : Organisation par options (`data`, `methods`, `computed`, etc.).

### Exemple

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Component mounted')
  }
}
</script>
```

### Structure

```javascript
export default {
  // Props
  props: ['title'],

  // Data réactives
  data() {
    return { count: 0 }
  },

  // Computed properties
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },

  // Watchers
  watch: {
    count(newVal, oldVal) {
      console.log(`Count changed: ${oldVal} -> ${newVal}`)
    }
  },

  // Methods
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks
  created() {},
  mounted() {},
  updated() {},
  unmounted() {}
}
```

## Composition API

**Principe** : Organisation par fonctionnalités logiques avec `setup()`.

### Exemple (setup function)

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // State réactif
    const message = ref('Hello Vue!')
    const count = ref(0)

    // Computed
    const doubleCount = computed(() => count.value * 2)

    // Methods
    const increment = () => {
      count.value++
    }

    // Lifecycle
    onMounted(() => {
      console.log('Component mounted')
    })

    // Exposer au template
    return {
      message,
      count,
      doubleCount,
      increment
    }
  }
}
</script>
```

### Script Setup (Syntaxe recommandée)

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State réactif
const message = ref('Hello Vue!')
const count = ref(0)

// Computed
const doubleCount = computed(() => count.value * 2)

// Methods
const increment = () => {
  count.value++
}

// Lifecycle
onMounted(() => {
  console.log('Component mounted')
})

// Tout est auto-exposé au template
</script>
```

## Comparaison

| Critère | Options API | Composition API |
|---------|-------------|-----------------|
| **Organisation** | Par type (data, methods) | Par fonctionnalité |
| **Réutilisabilité** | Mixins (problématiques) | Composables (propres) |
| **TypeScript** | Support limité | Excellent support |
| **Bundle size** | Plus gros | Plus petit |
| **Courbe apprentissage** | Plus simple | Plus complexe |
| **Flexibilité** | Limitée | Maximale |

## Réutilisation de Logique

### Options API - Mixins (Problématiques)

```javascript
// counterMixin.js
export const counterMixin = {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}

// Component
export default {
  mixins: [counterMixin],
  mounted() {
    console.log(this.count) // D'où vient count ?
  }
}
```

**Problèmes** :
- Source des propriétés peu claire
- Conflits de noms possibles
- Difficile à maintenir

### Composition API - Composables (Propres)

```javascript
// useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)

  const increment = () => {
    count.value++
  }

  return {
    count,
    increment
  }
}
```

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, increment } = useCounter()
// Source claire, pas de conflits
</script>
```

## Props avec TypeScript

### Options API

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    count: Number
  }
})
</script>
```

### Composition API

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = defineProps<Props>()
</script>
```

## Lifecycle Hooks

### Options API

```javascript
export default {
  created() {},
  mounted() {},
  updated() {},
  unmounted() {}
}
```

### Composition API

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

onMounted(() => {
  console.log('Mounted')
})

onUnmounted(() => {
  console.log('Unmounted')
})
```

## Computed et Watch

### Options API

```javascript
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    firstName(newVal) {
      console.log('First name changed:', newVal)
    }
  }
}
```

### Composition API

```javascript
import { ref, computed, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

watch(firstName, (newVal) => {
  console.log('First name changed:', newVal)
})
```

## Quand Utiliser Quoi ?

### Options API

✅ **Utilisez si** :
- Projets simples
- Équipe habituée à Vue 2
- Pas besoin de réutilisation complexe
- Débutants en Vue

### Composition API

✅ **Utilisez si** :
- Logique réutilisable (composables)
- TypeScript
- Composants complexes
- Meilleure organisation du code
- **Recommandé pour Vue 3**

## Migration

```vue
<!-- AVANT (Options API) -->
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- APRÈS (Composition API) -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>
```

## Résumé

**Options API** :
- Organisation par type
- Simple pour débuter
- Mixins pour réutilisation

**Composition API** :
- Organisation par fonctionnalité
- Composables pour réutilisation
- Meilleur TypeScript
- **Recommandé pour Vue 3**

**Script Setup** :
- Syntaxe la plus concise
- Auto-exposition au template
- Moins de boilerplate

Les deux APIs sont valides et peuvent coexister dans le même projet.
