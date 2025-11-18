---
id: 65
slug: error-boundaries
title: 'Comment fonctionnent les Error Boundaries dans React ?'
category: reactjs
difficulty: medium
tags: ['error-boundaries', 'error-handling', 'lifecycle']
---

# Comment fonctionnent les Error Boundaries dans React ?

Les Error Boundaries capturent les erreurs JavaScript dans les composants enfants.

## Implémentation

```jsx
import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details>
            {this.state.error?.toString()}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
```

## Usage

```jsx
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  )
}
```

## Ce qui est Capturé

✅ Errors dans :
- Render
- Lifecycle methods
- Constructors

❌ Pas capturé :
- Event handlers
- Async code (setTimeout, promises)
- SSR
- Errors dans l'Error Boundary elle-même

## Event Handlers

```jsx
// Error boundaries ne capturent pas
function Button() {
  const handleClick = () => {
    try {
      throw new Error('Oops')
    } catch (error) {
      console.error(error)
    }
  }

  return <button onClick={handleClick}>Click</button>
}
```

## Multiple Boundaries

```jsx
<ErrorBoundary fallback={<PageError />}>
  <Layout>
    <ErrorBoundary fallback={<SectionError />}>
      <Section />
    </ErrorBoundary>
  </Layout>
</ErrorBoundary>
```

## Résumé

Error Boundaries :
- Class components uniquement
- Capturent errors render
- Fallback UI
- Log errors
