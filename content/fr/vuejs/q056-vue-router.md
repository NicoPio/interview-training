---
id: 56
slug: vue-router
title: 'Comment fonctionne Vue Router ?'
category: vuejs
difficulty: medium
tags: ['vue-router', 'routing', 'navigation']
---

# Comment fonctionne Vue Router ?

Vue Router est la bibliothèque officielle de routing pour Vue.js.

## Installation

```bash
npm install vue-router@4
```

## Configuration

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
```

```javascript
// main.js
import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')
```

## RouterView et RouterLink

```vue
<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>
```

## Paramètres de Route

```javascript
// Route
{ path: '/user/:id', component: User }
```

```vue
<!-- User.vue -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id) // ID depuis URL
</script>
```

## Navigation Programmatique

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
  router.push({ name: 'about' })
  router.push({ path: '/user/123' })
  router.replace('/home') // Sans historique
  router.go(-1) // Retour
}
</script>
```

## Navigation Guards

```javascript
// Global
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// Per-route
{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from) => {
    if (!isAdmin()) return false
  }
}
```

```vue
<!-- Component guard -->
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('Quitter ?')
  return answer
})
</script>
```

## Nested Routes

```javascript
{
  path: '/user/:id',
  component: User,
  children: [
    { path: 'profile', component: Profile },
    { path: 'posts', component: Posts }
  ]
}
```

## Lazy Loading

```javascript
{
  path: '/about',
  component: () => import('./views/About.vue')
}
```

## Résumé

- **RouterView** : Affiche composant
- **RouterLink** : Navigation
- **useRouter** : Navigation programmatique
- **useRoute** : Accès route actuelle
- **Guards** : Contrôle navigation
