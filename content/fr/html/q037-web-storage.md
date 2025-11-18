---
id: 37
slug: web-storage
title: 'Quelle est la différence entre localStorage, sessionStorage et cookies ?'
category: html
difficulty: medium
tags: ['storage', 'localstorage', 'sessionstorage', 'cookies']
---

# Quelle est la différence entre localStorage, sessionStorage et cookies ?

Les navigateurs offrent trois mécanismes principaux pour stocker des données côté client : localStorage, sessionStorage et cookies.

## localStorage

### Caractéristiques

- **Persistance** : Permanent (jusqu'à suppression manuelle)
- **Portée** : Même origine (domaine + protocole + port)
- **Capacité** : ~5-10 MB
- **Envoi serveur** : Non
- **API** : Simple (clé/valeur)

### Utilisation

```javascript
// Écriture
localStorage.setItem('username', 'JohnDoe');
localStorage.setItem('theme', 'dark');

// Lecture
const username = localStorage.getItem('username'); // "JohnDoe"
const theme = localStorage.getItem('theme');       // "dark"

// Suppression
localStorage.removeItem('theme');

// Tout supprimer
localStorage.clear();

// Nombre d'éléments
console.log(localStorage.length);

// Parcourir
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}
```

### Stockage d'Objets

```javascript
// ❌ Mauvais : Stocke "[object Object]"
localStorage.setItem('user', { name: 'John' });

// ✅ Bon : Sérialiser en JSON
const user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Lecture
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // "John"
```

## sessionStorage

### Caractéristiques

- **Persistance** : Session (fermure onglet/navigateur)
- **Portée** : Même onglet + même origine
- **Capacité** : ~5-10 MB
- **Envoi serveur** : Non
- **API** : Identique à localStorage

### Utilisation

```javascript
// API identique à localStorage
sessionStorage.setItem('tempData', 'value');
const data = sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

### Différence avec localStorage

```javascript
// localStorage : Persiste après fermeture
localStorage.setItem('persistent', 'still here after close');

// sessionStorage : Supprimé à la fermeture de l'onglet
sessionStorage.setItem('temporary', 'gone after close');
```

## Cookies

### Caractéristiques

- **Persistance** : Configurable (expires/max-age)
- **Portée** : Domaine + path configurables
- **Capacité** : ~4 KB par cookie
- **Envoi serveur** : ✅ Oui (automatique)
- **API** : String parsing (complexe)

### Utilisation

```javascript
// Créer (expires dans 7 jours)
document.cookie = "username=JohnDoe; max-age=" + (7 * 24 * 60 * 60) + "; path=/; Secure; SameSite=Strict";

// Lire (parsing manuel)
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
const username = getCookie('username');

// Supprimer (expire dans le passé)
document.cookie = "username=; max-age=0; path=/";
```

### Attributs des Cookies

```javascript
// expires : Date d'expiration
document.cookie = "user=John; expires=Fri, 31 Dec 2025 23:59:59 GMT";

// max-age : Durée en secondes
document.cookie = "token=abc123; max-age=3600"; // 1 heure

// path : Chemin de disponibilité
document.cookie = "data=value; path=/admin"; // Seulement /admin/*

// domain : Domaine
document.cookie = "shared=value; domain=.example.com"; // Tous sous-domaines

// Secure : HTTPS uniquement
document.cookie = "secure=data; Secure";

// HttpOnly : Pas accessible via JavaScript (côté serveur)
// Set-Cookie: session=xyz; HttpOnly

// SameSite : Protection CSRF
document.cookie = "auth=token; SameSite=Strict"; // Strict, Lax, None
```

## Comparaison

| Critère | localStorage | sessionStorage | Cookies |
|---------|--------------|----------------|---------|
| **Persistance** | Permanent | Session | Configurable |
| **Portée** | Origine | Onglet + Origine | Domain + Path |
| **Capacité** | ~5-10 MB | ~5-10 MB | ~4 KB |
| **Envoi serveur** | ❌ Non | ❌ Non | ✅ Oui |
| **API** | Simple | Simple | Complexe |
| **Performance** | Rapide | Rapide | Lent (headers) |
| **Sécurité** | JS only | JS only | HttpOnly possible |

## Cas d'Usage

### localStorage

✅ **Préférences utilisateur**
```javascript
// Thème
localStorage.setItem('theme', 'dark');

// Langue
localStorage.setItem('language', 'fr');

// Paramètres UI
const settings = {
  notifications: true,
  fontSize: 16
};
localStorage.setItem('settings', JSON.stringify(settings));
```

✅ **Cache de données**
```javascript
// Cache API response
async function fetchWithCache(url) {
  const cached = localStorage.getItem(url);
  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(url, JSON.stringify(data));
  return data;
}
```

### sessionStorage

✅ **Formulaires multi-étapes**
```javascript
// Étape 1
sessionStorage.setItem('step1', JSON.stringify({ name, email }));

// Étape 2
const step1Data = JSON.parse(sessionStorage.getItem('step1'));
sessionStorage.setItem('step2', JSON.stringify({ address, city }));

// Soumission finale
const allData = {
  ...JSON.parse(sessionStorage.getItem('step1')),
  ...JSON.parse(sessionStorage.getItem('step2'))
};
// Envoi au serveur puis clear
sessionStorage.clear();
```

✅ **État temporaire**
```javascript
// Filtre de recherche (persiste pendant navigation dans onglet)
sessionStorage.setItem('searchFilters', JSON.stringify({
  category: 'electronics',
  priceRange: [0, 1000]
}));
```

### Cookies

✅ **Authentification**
```javascript
// Token JWT (HttpOnly côté serveur)
// Set-Cookie: auth_token=xyz; HttpOnly; Secure; SameSite=Strict
```

✅ **Tracking analytics**
```javascript
// Cookie de session analytics
document.cookie = `_ga=${generateId()}; max-age=${60*60*24*365}; path=/`;
```

## Événement Storage

```javascript
// Écouter les changements (autre onglet/fenêtre)
window.addEventListener('storage', (e) => {
  console.log('Storage modifié dans autre onglet');
  console.log('Key:', e.key);
  console.log('Old value:', e.oldValue);
  console.log('New value:', e.newValue);
  console.log('URL:', e.url);

  // Exemple : Synchroniser thème
  if (e.key === 'theme') {
    applyTheme(e.newValue);
  }
});
```

**Note** : L'événement ne se déclenche **pas** dans l'onglet qui a modifié le storage.

## Sécurité

### XSS (Cross-Site Scripting)

```javascript
// ❌ Dangereux : Stocker données sensibles
localStorage.setItem('password', 'secret123'); // Accessible via console

// ❌ Dangereux : Stocker tokens
localStorage.setItem('authToken', 'jwt-token'); // Vulnérable XSS

// ✅ Sécurisé : Cookies HttpOnly
// Set-Cookie: auth_token=xyz; HttpOnly; Secure
```

### CSRF (Cross-Site Request Forgery)

```javascript
// ✅ Protection CSRF avec SameSite
document.cookie = "csrf=token; SameSite=Strict; Secure";
```

## Bonnes Pratiques

### Gestion d'Erreurs

```javascript
try {
  localStorage.setItem('key', 'value');
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.error('Storage plein');
    // Nettoyer ou demander utilisateur
  }
}
```

### Expiration Manuelle (localStorage)

```javascript
function setWithExpiry(key, value, ttl) {
  const item = {
    value: value,
    expiry: Date.now() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

// Usage : expire dans 1 heure
setWithExpiry('tempData', { foo: 'bar' }, 60 * 60 * 1000);
```

## Résumé

**localStorage** :
- ✅ Permanent, grande capacité
- **Usage** : Préférences, cache, état UI

**sessionStorage** :
- ✅ Temporaire (session), grande capacité
- **Usage** : Formulaires multi-étapes, état temporaire

**Cookies** :
- ✅ Envoyés au serveur, configurables
- **Usage** : Auth, tracking, préférences serveur

**Sécurité** : Ne jamais stocker de mots de passe ou données sensibles en localStorage/sessionStorage. Utiliser cookies HttpOnly pour auth.
