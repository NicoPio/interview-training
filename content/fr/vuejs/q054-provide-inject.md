---
id: 54
slug: provide-inject
title: 'Comment fonctionnent provide et inject dans Vue ?'
category: vuejs
difficulty: medium
tags: ['provide', 'inject', 'dependency-injection']
---

# Comment fonctionnent provide et inject dans Vue ?

`provide` et `inject` permettent de passer des données à travers l'arbre de composants sans props drilling.

## Usage

### Parent (Provide)

```vue
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const updateTheme = (newTheme) => {
  theme.value = newTheme
}

// Provide
provide('theme', theme)
provide('updateTheme', updateTheme)
</script>
```

### Enfant (Inject)

```vue
<script setup>
import { inject } from 'vue'

// Inject
const theme = inject('theme')
const updateTheme = inject('updateTheme')
</script>

<template>
  <div :class="theme">
    <button @click="updateTheme('light')">Light</button>
  </div>
</template>
```

## Avec Valeurs par Défaut

```javascript
const theme = inject('theme', 'light') // Défaut si non fourni
const config = inject('config', () => ({ mode: 'dev' })) // Fonction factory
```

## Symbol Keys (Recommandé)

```javascript
// keys.js
export const ThemeKey = Symbol('theme')

// Parent
provide(ThemeKey, theme)

// Enfant
const theme = inject(ThemeKey)
```

**Avantage** : Évite les conflits de noms.

## Réactivité

```vue
<!-- Parent -->
<script setup>
import { provide, ref } from 'vue'

const count = ref(0)
provide('count', count) // Réactif (ref)
</script>

<!-- Enfant -->
<script setup>
import { inject } from 'vue'

const count = inject('count')
// count.value change automatiquement
</script>
```

## Readonly

```vue
<script setup>
import { provide, ref, readonly } from 'vue'

const state = ref({ count: 0 })

// Provide en readonly
provide('state', readonly(state))

// Provide méthode pour modification
provide('increment', () => state.value.count++)
</script>
```

## App-level Provide

```javascript
// main.js
import { createApp } from 'vue'

const app = createApp(App)

app.provide('apiUrl', 'https://api.example.com')
app.provide('config', { theme: 'dark' })

app.mount('#app')
```

## Résumé

**provide/inject** :
- Évite props drilling
- Communication ancestor → descendant
- Bon pour themes, config, auth
- Utiliser avec Symbol keys
