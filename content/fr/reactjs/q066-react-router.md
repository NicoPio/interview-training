---
id: 66
slug: react-router
title: 'Comment fonctionne React Router ?'
category: reactjs
difficulty: medium
tags: ['react-router', 'routing', 'navigation']
---

# Comment fonctionne React Router ?

React Router est la bibliothèque de routing pour React.

## Installation

```bash
npm install react-router-dom
```

## Setup

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

## Hooks

### useParams

```jsx
import { useParams } from 'react-router-dom'

function User() {
  const { id } = useParams()
  return <div>User {id}</div>
}
```

### useNavigate

```jsx
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // Login logic
    navigate('/dashboard')
    navigate('/home', { replace: true })
    navigate(-1) // Go back
  }

  return <button onClick={handleLogin}>Login</button>
}
```

### useLocation

```jsx
import { useLocation } from 'react-router-dom'

function Component() {
  const location = useLocation()
  console.log(location.pathname) // "/about"
  console.log(location.search)   // "?id=123"
  console.log(location.state)    // Data passed via navigate
}
```

## Nested Routes

```jsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

// Dashboard.jsx
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> {/* Nested routes render here */}
    </div>
  )
}
```

## Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Lazy Loading

```jsx
import { lazy, Suspense } from 'react'

const About = lazy(() => import('./About'))

<Route
  path="/about"
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
  }
/>
```

## Résumé

- **BrowserRouter** : Setup routing
- **Routes/Route** : Définir routes
- **Link** : Navigation
- **useNavigate** : Navigation programmatique
- **useParams** : Route params
- **useLocation** : Route info
