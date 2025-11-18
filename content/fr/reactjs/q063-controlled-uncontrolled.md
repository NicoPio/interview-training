---
id: 63
slug: controlled-uncontrolled
title: 'Quelle est la différence entre composants controlled et uncontrolled ?'
category: reactjs
difficulty: medium
tags: ['forms', 'controlled', 'uncontrolled', 'refs']
---

# Quelle est la différence entre composants controlled et uncontrolled ?

Les inputs peuvent être contrôlés par React (controlled) ou par le DOM (uncontrolled).

## Controlled

```jsx
function Form() {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}
```

**Caractéristiques** :
- React est la source de vérité
- `value` + `onChange`
- Validation instantanée
- Contrôle total

## Uncontrolled

```jsx
function Form() {
  const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
    </form>
  )
}
```

**Caractéristiques** :
- DOM est la source de vérité
- `defaultValue` + `ref`
- Moins de code
- Contrôle limité

## Comparaison

| Critère | Controlled | Uncontrolled |
|---------|------------|--------------|
| **Source** | React state | DOM |
| **Validation** | Immédiate | À la soumission |
| **Attribut** | `value` | `defaultValue` |
| **Accès** | Via state | Via ref |
| **Re-renders** | À chaque frappe | Non |

## Quand Utiliser ?

**Controlled** (Recommandé) :
- Validation en temps réel
- Conditional rendering
- Formatage input
- Formulaires complexes

**Uncontrolled** :
- Formulaires simples
- Integration non-React
- Performance critique

## Résumé

- **Controlled** : React contrôle, recommandé
- **Uncontrolled** : DOM contrôle, cas simples
