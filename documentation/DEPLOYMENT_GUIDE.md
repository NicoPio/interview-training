# 🚀 Guide de Déploiement - JS Interview Training

Ce guide explique comment déployer l'application **JS Interview Training** en production.

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Prérequis](#prérequis)
3. [Déploiement GitHub Pages (Actuel)](#déploiement-github-pages)
4. [Alternative : Nuxt Hub](#alternative--nuxt-hub)
5. [Alternative : Vercel](#alternative--vercel)
6. [Alternative : Netlify](#alternative--netlify)
7. [Nuxt Studio](#nuxt-studio)
8. [Analytics & Monitoring](#analytics--monitoring)
9. [Troubleshooting](#troubleshooting)

---

## Vue d'ensemble

### Configuration Actuelle

- **Hébergement** : GitHub Pages
- **URL** : https://nicopio.github.io/interview-training/
- **CI/CD** : GitHub Actions (automatique sur push `main`)
- **CMS** : Nuxt Studio (route: `/_studio`)
- **Analytics** : Plausible (à configurer dans le dashboard)

### Architecture de Déploiement

```
Code Push (main)
    ↓
GitHub Actions CI/CD
    ├─ Lint & TypeCheck
    ├─ Tests Unitaires
    ├─ Build SSG (npm run generate)
    └─ Deploy GitHub Pages
         ↓
    Production Live
```

---

## Prérequis

### Avant de Déployer

1. **Repository GitHub** : Projet hébergé sur GitHub
2. **GitHub Pages activé** : Settings → Pages → Source: GitHub Actions
3. **Node.js 20+** : Version compatible
4. **Tests passants** : `npm run test`, `npm run lint`, `npm run typecheck`
5. **Build local réussi** : `npm run generate`

### Vérification Locale

```bash
# 1. Clean install
rm -rf node_modules .output dist
npm install

# 2. Linter
npm run lint

# 3. TypeScript
npm run typecheck

# 4. Tests
npm run test

# 5. Build
npm run generate

# 6. Preview local
npx serve .output/public
# Ouvrir http://localhost:3000/interview-training/
```

---

## Déploiement GitHub Pages

### Configuration Actuelle ✅

Le projet est **déjà configuré** pour GitHub Pages :

- ✅ `nuxt.config.ts` : `baseURL: '/interview-training/'`
- ✅ Workflow `.github/workflows/deploy.yml`
- ✅ Workflow CI/CD `.github/workflows/ci.yml`

### Déploiement Automatique

**Chaque push sur `main` déclenche** :

1. **Quality Checks** (ESLint, TypeScript)
2. **Tests** (Unit tests avec Vitest)
3. **Build** (Static Site Generation)
4. **Deploy** (GitHub Pages)

### Vérifier le Déploiement

1. **Actions GitHub** : https://github.com/NicoPio/interview-training/actions
2. **URL Production** : https://nicopio.github.io/interview-training/
3. **Logs** : Consulter les runs GitHub Actions pour diagnostics

### Déploiement Manuel

Si besoin de déployer manuellement :

```bash
# 1. Depuis GitHub UI
Actions → Deploy to GitHub Pages → Run workflow

# 2. Ou depuis CLI avec gh
gh workflow run deploy.yml --ref main
```

### Configuration GitHub Pages

**Settings → Pages** :

- **Source** : GitHub Actions
- **Branch** : N/A (géré par Actions)
- **Custom domain** : (Optionnel)

---

## Alternative : Nuxt Hub

**Nuxt Hub** offre un déploiement optimisé avec edge computing.

### Setup

1. **Créer compte** : https://hub.nuxt.com
2. **Connecter GitHub repo**
3. **Configurer projet** :

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  hub: {
    database: false, // Pas de DB pour ce projet
    kv: true, // Activer KV storage pour cache
    blob: false,
  },
})
```

4. **Deploy**

```bash
npm install -g nuxthub
nuxthub deploy
```

### Avantages

- ✅ Edge deployment (CDN global)
- ✅ Preview deployments par PR
- ✅ Analytics intégrés
- ✅ Cache distribué (KV storage)
- ✅ Rollback facile

---

## Alternative : Vercel

### Setup

1. **Import projet** : https://vercel.com/new
2. **Configuration automatique** (Nuxt détecté)
3. **Variables d'environnement** :

```env
# Vercel détecte automatiquement
NUXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

4. **Deploy** : Push sur `main` ou merge PR

### Build Settings

```json
{
  "buildCommand": "npm run generate",
  "outputDirectory": ".output/public",
  "installCommand": "npm install"
}
```

---

## Alternative : Netlify

### Setup

1. **Nouveau site** : https://app.netlify.com
2. **Configuration** :

```toml
# netlify.toml
[build]
  command = "npm run generate"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/interview-training/:splat"
  status = 200
```

3. **Deploy** : Git push automatique

---

## Nuxt Studio

**Nuxt Studio** permet l'édition de contenu en ligne sans toucher au code.

### Accès

- **URL** : https://nicopio.github.io/interview-training/_studio
- **Login** : Compte GitHub requis
- **Permissions** : Write access au repo

### Configuration Actuelle ✅

```typescript
// nuxt.config.ts - Déjà configuré
studio: {
  route: '/_studio',
  repository: {
    provider: 'github',
    owner: 'NicoPio',
    repo: 'interview-training',
    branch: 'main',
    rootDir: '',
  },
}
```

### Utilisation

1. **Naviguer** : `/_studio`
2. **Éditer** : Questions markdown en direct
3. **Preview** : Voir les changements en temps réel
4. **Commit** : Sauvegarder dans GitHub

### Workflow Collaboratif

```
Éditeur → Nuxt Studio → Edit content → Preview → Commit
                              ↓
                        GitHub (main)
                              ↓
                       GitHub Actions
                              ↓
                        Deploy automatique
```

---

## Analytics & Monitoring

### Plausible Analytics ✅

**Configuration** :

```typescript
// nuxt.config.ts - Déjà configuré
plausible: {
  domain: 'nicopio.github.io',
  trackLocalhost: false,
  autoOutboundTracking: true,
  autoFileDownloads: true,
}
```

**Setup Dashboard** :

1. **Créer compte** : https://plausible.io
2. **Ajouter domain** : `nicopio.github.io`
3. **Vérifier script** : Injecté automatiquement par `@nuxtjs/plausible`

**Métriques trackées** :

- 📊 Page views
- 🌐 Sources de trafic
- 🗺️ Géographie visiteurs
- 📱 Devices (mobile/desktop)
- 🔗 Outbound links (GitHub, LinkedIn)
- 📥 File downloads (si applicable)

### Monitoring Optionnel

#### Sentry (Erreurs JavaScript)

```bash
npm install @nuxtjs/sentry

# nuxt.config.ts
modules: ['@nuxtjs/sentry'],
sentry: {
  dsn: 'YOUR_SENTRY_DSN',
  environment: process.env.NODE_ENV,
}
```

#### Vercel Analytics

Si déployé sur Vercel :

```bash
npm install @vercel/analytics

# nuxt.config.ts
modules: ['@vercel/analytics/nuxt'],
```

---

## Troubleshooting

### Problèmes Courants

#### 1. Build échoue sur GitHub Actions

**Erreur** : `oxc-parser` or `better-sqlite3` build failure

**Solution** :

```yaml
# .github/workflows/deploy.yml - Déjà appliqué
- name: Install system packages
  run: |
    sudo apt-get update
    sudo apt-get install -y build-essential python3 pkg-config libsqlite3-dev

- name: Rebuild native modules
  run: |
    npm rebuild better-sqlite3 || true
    npm rebuild oxc-parser || true
```

#### 2. 404 après déploiement

**Problème** : `baseURL` incorrect

**Solution** :

```typescript
// nuxt.config.ts
app: {
  baseURL: '/interview-training/', // DOIT correspondre au nom du repo
}
```

#### 3. Assets manquants (CSS, JS)

**Problème** : Chemins relatifs incorrects

**Vérifier** :

```typescript
// nuxt.config.ts
app: {
  baseURL: '/interview-training/',
  // cdnURL: 'https://cdn.example.com' // Si CDN externe
}
```

#### 4. Plausible ne track pas

**Checklist** :

- [ ] Domain ajouté dans Plausible dashboard
- [ ] Script Plausible chargé (vérifier Network tab)
- [ ] `trackLocalhost: false` en production
- [ ] Adblockers désactivés pour tester

#### 5. Nuxt Studio inaccessible

**Vérifier** :

- [ ] Authentifié GitHub avec write access
- [ ] Route `/_studio` accessible
- [ ] Configuration `studio` dans `nuxt.config.ts`

---

## Checklist Pré-Production

### Avant le Premier Déploiement

- [ ] ✅ Tests passants (`npm run test`)
- [ ] ✅ Lint sans erreurs (`npm run lint`)
- [ ] ✅ TypeCheck OK (`npm run typecheck`)
- [ ] ✅ Build local réussi (`npm run generate`)
- [ ] ✅ Preview local fonctionne
- [ ] ✅ GitHub Pages activé (Settings → Pages)
- [ ] ✅ Workflows GitHub Actions configurés
- [ ] ✅ `baseURL` correct dans `nuxt.config.ts`
- [ ] ✅ Nuxt Studio configuré
- [ ] ⏸️ Plausible dashboard configuré (optionnel)
- [ ] ⏸️ Custom domain configuré (optionnel)

### Après Déploiement

- [ ] Vérifier URL production accessible
- [ ] Tester toutes les routes principales
- [ ] Vérifier responsive (mobile/desktop)
- [ ] Tester navigation clavier
- [ ] Vérifier dark mode
- [ ] Tester i18n (FR/EN)
- [ ] Vérifier Plausible tracking (si configuré)
- [ ] Tester Nuxt Studio (édition contenu)

---

## Commandes Utiles

```bash
# Développement
npm run dev                  # Dev server (http://localhost:3000)

# Build & Preview
npm run generate             # Build SSG
npx serve .output/public     # Preview local

# Tests & Quality
npm run test                 # Tests unitaires
npm run test:e2e             # Tests E2E (nécessite dev server)
npm run lint                 # ESLint
npm run lint:fix             # Fix auto
npm run typecheck            # TypeScript

# GitHub Actions (avec gh CLI)
gh workflow list             # Liste workflows
gh workflow run deploy.yml   # Deploy manuel
gh run list                  # Historique runs
gh run view <run-id>         # Détails run
```

---

## Support & Documentation

### Ressources

- **Nuxt Docs** : https://nuxt.com/docs
- **Nuxt Content** : https://content.nuxt.com
- **Nuxt UI** : https://ui.nuxt.com
- **Nuxt Studio** : https://nuxt.studio
- **GitHub Pages** : https://docs.github.com/pages
- **Plausible** : https://plausible.io/docs

### Contact

- **GitHub Issues** : https://github.com/NicoPio/interview-training/issues
- **Nuxt Discord** : https://discord.nuxt.com

---

**Dernière mise à jour** : 2025-11-19
**Version** : 1.0.0
**Status** : ✅ Production Ready
