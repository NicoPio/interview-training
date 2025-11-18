---
id: 59
slug: custom-hooks
title: 'Comment créer des custom hooks en React ?'
category: reactjs
difficulty: medium
tags: ['custom-hooks', 'hooks', 'reusability']
---

# Comment créer des custom hooks en React ?

Les custom hooks permettent de réutiliser la logique avec état.

## Exemple: useFetch

```jsx
import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// Usage
function Component() {
  const { data, loading, error } = useFetch('/api/users')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return <div>{data.name}</div>
}
```

## Exemple: useLocalStorage

```jsx
import { useState, useEffect } from 'react'

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// Usage
function Component() {
  const [name, setName] = useLocalStorage('name', '')
  return <input value={name} onChange={e => setName(e.target.value)} />
}
```

## Convention

- Préfixe `use`
- Peut appeler d'autres hooks
- Retourne values/functions

## Résumé

Custom hooks = Réutilisation logique avec état
