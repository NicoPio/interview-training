---
id: 61
slug: context-api
title: 'Comment fonctionne l\'API Context de React ?'
category: reactjs
difficulty: medium
tags: ['context', 'state-management', 'props-drilling']
---

# Comment fonctionne l'API Context de React ?

Context API permet de partager des données sans props drilling.

## Création

```jsx
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

## Utilisation

```jsx
// App.jsx
function App() {
  return (
    <ThemeProvider>
      <Toolbar />
    </ThemeProvider>
  )
}

// Toolbar.jsx
function Toolbar() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={theme}>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  )
}
```

## Pattern Complet

```jsx
const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    const user = await api.login(credentials)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be within UserProvider')
  }
  return context
}
```

## Performance

```jsx
// Séparer contextes pour éviter re-renders
const UserContext = createContext()
const UserActionsContext = createContext()

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const actions = useMemo(() => ({
    login, logout
  }), [])

  return (
    <UserContext.Provider value={user}>
      <UserActionsContext.Provider value={actions}>
        {children}
      </UserActionsContext.Provider>
    </UserContext.Provider>
  )
}
```

## Résumé

Context API :
- Évite props drilling
- Partage state global
- Bon pour theme, auth, i18n
