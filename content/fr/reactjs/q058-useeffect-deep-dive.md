---
id: 58
slug: useeffect-deep-dive
title: 'Comment fonctionne useEffect en détail ?'
category: reactjs
difficulty: medium
tags: ['useeffect', 'hooks', 'lifecycle']
---

# Comment fonctionne useEffect en détail ?

useEffect gère les effets de bord dans les composants React.

## Syntaxe

```jsx
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup
  }
}, [dependencies])
```

## Cas d'Usage

### Mount uniquement

```jsx
useEffect(() => {
  console.log('Mounted')
}, []) // Dépendances vides
```

### Update

```jsx
useEffect(() => {
  console.log('Count changed')
}, [count]) // Dépend de count
```

### Cleanup

```jsx
useEffect(() => {
  const subscription = api.subscribe()
  return () => subscription.unsubscribe()
}, [])
```

### Fetch Data

```jsx
useEffect(() => {
  let cancelled = false

  async function fetchData() {
    const data = await fetch('/api')
    if (!cancelled) setData(data)
  }

  fetchData()
  return () => { cancelled = true }
}, [])
```

## Résumé

- Pas de dépendances : Chaque render
- `[]` : Mount uniquement
- `[dep]` : Quand dep change
- Return : Cleanup
