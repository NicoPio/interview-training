---
id: 57
slug: react-hooks-basics
title: 'Quels sont les hooks de base en React ?'
category: reactjs
difficulty: easy
tags: ['hooks', 'usestate', 'useeffect', 'react']
---

# Quels sont les hooks de base en React ?

Les hooks permettent d'utiliser les fonctionnalités de React dans les composants fonctionnels.

## useState

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => prev + 1)}>+1 (functional)</button>
    </div>
  )
}
```

**Règles** :
- Functional update pour computed values
- Peut être appelé plusieurs fois

## useEffect

```jsx
import { useState, useEffect } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)

  // Run on mount et update
  useEffect(() => {
    fetchData().then(setData)
  })

  // Run uniquement au mount
  useEffect(() => {
    console.log('Mounted')
  }, [])

  // Run quand count change
  useEffect(() => {
    console.log('Count changed')
  }, [count])

  // Cleanup
  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000)
    return () => clearInterval(timer)
  }, [])

  return <div>{data}</div>
}
```

## useContext

```jsx
import { createContext, useContext } from 'react'

const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  )
}

function Child() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>Content</div>
}
```

## useRef

```jsx
import { useRef } from 'react'

function Input() {
  const inputRef = useRef(null)

  const focus = () => {
    inputRef.current.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focus}>Focus</button>
    </>
  )
}
```

## useReducer

```jsx
import { useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}
```

## useMemo

```jsx
import { useMemo } from 'react'

function ExpensiveComponent({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a - b)
  }, [items])

  return <div>{sortedItems}</div>
}
```

## useCallback

```jsx
import { useCallback } from 'react'

function Parent() {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, []) // Mémorisé

  return <Child onClick={handleClick} />
}
```

## Résumé

- **useState** : State local
- **useEffect** : Side effects
- **useContext** : Context API
- **useRef** : Refs, valeurs persistantes
- **useReducer** : State complexe
- **useMemo** : Memoization values
- **useCallback** : Memoization functions
