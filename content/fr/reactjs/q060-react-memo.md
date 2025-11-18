---
id: 60
slug: react-memo
title: 'Comment optimiser les performances avec React.memo, useMemo et useCallback ?'
category: reactjs
difficulty: medium
tags: ['performance', 'memo', 'usememo', 'usecallback']
---

# Comment optimiser les performances avec React.memo, useMemo et useCallback ?

React fournit des outils pour éviter les re-renders inutiles.

## React.memo

```jsx
import { memo } from 'react'

const Child = memo(function Child({ name }) {
  console.log('Child rendered')
  return <div>{name}</div>
})

// Ne re-render que si name change
```

## useMemo

```jsx
import { useMemo } from 'react'

function Component({ items }) {
  const sortedItems = useMemo(() => {
    console.log('Sorting...')
    return items.sort()
  }, [items]) // Recalcule uniquement si items change

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
  }, []) // Fonction mémorisée

  return <Child onClick={handleClick} />
}

const Child = memo(function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>
})
```

## Comparaison

| Outil | Usage |
|-------|-------|
| React.memo | Composant |
| useMemo | Valeur |
| useCallback | Fonction |

## Quand Utiliser ?

✅ Calculs coûteux
✅ Props de composants memoized
✅ Dépendances useEffect

❌ Optimisation prématurée
❌ Composants simples

## Résumé

- React.memo : Skip re-render
- useMemo : Memoize valeur
- useCallback : Memoize fonction
