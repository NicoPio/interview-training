---
id: 53
slug: computed-watch
title: 'Quelle est la différence entre computed et watch dans Vue ?'
category: vuejs
difficulty: medium
tags: ['computed', 'watch', 'reactivity']
---

# Quelle est la différence entre computed et watch dans Vue ?

`computed` et `watch` permettent de réagir aux changements, mais avec des usages différents.

## Computed

**Usage** : Valeur dérivée d'autres valeurs réactives.

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// Computed property
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
</script>

<template>
  <p>{{ fullName }}</p>
</template>
```

**Caractéristiques** :
- ✅ Cached (recalculé uniquement si dépendances changent)
- ✅ Synchrone
- ✅ Retourne une valeur
- ✅ Pour transformations/dérivations

## Watch

**Usage** : Effets de bord lors de changements.

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

// Watch
watch(count, (newValue, oldValue) => {
  console.log(`Count: ${oldValue} -> ${newValue}`)

  // Effet de bord (API call, etc.)
  if (newValue > 10) {
    alert('Count > 10!')
  }
})
</script>
```

**Caractéristiques** :
- ✅ Pas de cache
- ✅ Asynchrone possible
- ✅ Effets de bord
- ✅ Pour réactions aux changements

## Comparaison

| Critère | computed | watch |
|---------|----------|-------|
| **Usage** | Valeur dérivée | Effet de bord |
| **Retour** | Valeur | Rien |
| **Cache** | ✅ Oui | ❌ Non |
| **Async** | ❌ Non | ✅ Oui |
| **Template** | ✅ Oui | ❌ Non |

## Exemples

### Computed - Filtrage

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { name: 'Apple', type: 'fruit' },
  { name: 'Carrot', type: 'vegetable' }
])

const fruits = computed(() => {
  return items.value.filter(item => item.type === 'fruit')
})
</script>
```

### Watch - API Call

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const results = ref([])

watch(searchQuery, async (newQuery) => {
  if (newQuery.length > 2) {
    const response = await fetch(`/api/search?q=${newQuery}`)
    results.value = await response.json()
  }
})
</script>
```

### Watch - Options

```javascript
// Immediate
watch(source, callback, { immediate: true })

// Deep
watch(source, callback, { deep: true })

// Multiple sources
watch([source1, source2], ([new1, new2]) => {
  console.log(new1, new2)
})
```

## Résumé

**computed** :
- Valeur calculée/dérivée
- Cached
- Utilisé dans template

**watch** :
- Effets de bord
- API calls, localStorage
- Réaction aux changements
