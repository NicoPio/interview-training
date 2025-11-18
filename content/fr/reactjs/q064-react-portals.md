---
id: 64
slug: react-portals
title: 'Comment fonctionnent les Portals dans React ?'
category: reactjs
difficulty: medium
tags: ['portals', 'dom', 'modals']
---

# Comment fonctionnent les Portals dans React ?

Les Portals permettent de rendre des composants en dehors de la hiérarchie DOM parente.

## Syntaxe

```jsx
import { createPortal } from 'react-dom'

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  )
}
```

## HTML Setup

```html
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

## Exemple Complet

```jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Modal Content</h2>
      </Modal>
    </div>
  )
}
```

## Pourquoi ?

**Sans Portal** :
- Modal contraint par `overflow: hidden`
- z-index conflicts
- CSS positioning issues

**Avec Portal** :
- Modal au top-level DOM
- Pas de contraintes CSS parent
- Meilleur contrôle

## Event Bubbling

```jsx
// Les events bubble dans l'arbre React, pas DOM
function Parent() {
  return (
    <div onClick={() => console.log('Parent clicked')}>
      <Modal>
        <button>Click</button> {/* Trigger parent onClick */}
      </Modal>
    </div>
  )
}
```

## Cas d'Usage

- Modals
- Tooltips
- Dropdowns
- Notifications

## Résumé

Portals :
- Rend hors hiérarchie DOM
- Event bubbling React intact
- Parfait pour modals/overlays
