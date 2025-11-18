---
id: 48
slug: ref-vs-reactive
title: 'Quelle est la différence entre ref et reactive dans Vue 3 ?'
category: vuejs
difficulty: medium
tags: ['reactivity', 'ref', 'reactive', 'composition-api']
---

# Quelle est la différence entre ref et reactive dans Vue 3 ?

`ref` et `reactive` créent des données réactives mais avec des différences importantes.

## ref()

```javascript
import { ref } from 'vue'

const count = ref(0)
const user = ref({ name: 'John' })

// Accès via .value
console.log(count.value) // 0
count.value++
user.value.name = 'Jane'
```

**Caractéristiques** :
- Fonctionne avec **primitives** et **objets**
- Accès via `.value`
- Auto-unwrap dans le template
- Peut être réassigné

## reactive()

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: { name: 'John' }
})

// Accès direct
console.log(state.count) // 0
state.count++
state.user.name = 'Jane'
```

**Caractéristiques** :
- Fonctionne uniquement avec **objets**
- Pas de `.value`
- Ne peut pas être réassigné (perd réactivité)

## Comparaison

| Critère | ref | reactive |
|---------|-----|----------|
| **Types** | Tout | Objets uniquement |
| **Accès** | `.value` | Direct |
| **Template** | Auto-unwrap | Direct |
| **Réassignation** | ✅ Possible | ❌ Perd réactivité |
| **Destructuring** | ✅ OK avec toRef | ❌ Perd réactivité |

## Exemples

### ref - Primitives

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello')

// Template : pas besoin de .value
</script>

<template>
  <p>{{ count }}</p>
  <p>{{ message }}</p>
</template>
```

### reactive - Objets

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  todos: []
})

const addTodo = (text) => {
  state.todos.push({ text, done: false })
}
</script>

<template>
  <p>{{ state.count }}</p>
</template>
```

### Réassignation

```javascript
// ✅ ref peut être réassigné
const user = ref({ name: 'John' })
user.value = { name: 'Jane' } // ✅ Réactif

// ❌ reactive perd réactivité
let state = reactive({ count: 0 })
state = { count: 1 } // ❌ Pas réactif !

// ✅ Solution : modifier les propriétés
state.count = 1 // ✅ Réactif
```

### Destructuring

```javascript
import { ref, reactive, toRefs } from 'vue'

// ref : OK
const count = ref(0)
const { value } = count // Pas utile

// reactive : perd réactivité
const state = reactive({ count: 0, name: 'John' })
const { count, name } = state // ❌ Pas réactif

// Solution : toRefs
const { count, name } = toRefs(state) // ✅ Réactif
console.log(count.value) // Accès via .value
```

## Bonnes Pratiques

### ✅ Utilisez ref pour

- Primitives (number, string, boolean)
- Arrays
- Valeurs qui peuvent être réassignées
- **Recommandé par défaut**

```javascript
const count = ref(0)
const todos = ref([])
const user = ref(null)
```

### ✅ Utilisez reactive pour

- Objets groupant plusieurs valeurs liées
- State de formulaires

```javascript
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})
```

## Résumé

**ref** :
- Tout type
- `.value` en JS
- Auto-unwrap template
- Réassignable

**reactive** :
- Objets uniquement
- Accès direct
- Pas réassignable

**Recommandation** : Utilisez `ref` par défaut, `reactive` pour grouper des valeurs liées.
