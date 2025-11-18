---
id: 62
slug: react-keys
title: 'Pourquoi les keys sont-elles importantes dans React ?'
category: reactjs
difficulty: easy
tags: ['keys', 'lists', 'reconciliation']
---

# Pourquoi les keys sont-elles importantes dans React ?

Les keys aident React à identifier les éléments dans les listes.

## Usage

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}
```

## ❌ Mauvaises Pratiques

```jsx
// Index comme key (problématique si l'ordre change)
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// Pas de key
{items.map(item => (
  <div>{item}</div>
))}

// Key non unique
{items.map(item => (
  <div key="same-key">{item}</div>
))}
```

## ✅ Bonnes Pratiques

```jsx
// ID unique
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// Générer ID stable si nécessaire
{items.map(item => (
  <div key={`${item.category}-${item.id}`}>{item.name}</div>
))}
```

## Pourquoi ?

Sans key :
- React ne peut pas identifier les changements
- Performance dégradée
- Bugs d'état (input values mélangés)

Avec key :
- React sait quel élément a changé
- Réutilise éléments existants
- Préserve l'état correctement

## Résumé

- Toujours utiliser key unique
- Jamais index si liste dynamique
- ID stable de la donnée
