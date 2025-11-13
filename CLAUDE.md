# JS Interview Prep - Instructions for Claude

## Project Overview

Nuxt 4 application for JavaScript interview preparation with interactive flashcard system. The project uses Nuxt Content to manage 26+ interview questions with reveal answers, progress tracking, and i18n support (French by default).

## Tech Stack

- **Framework**: Nuxt 4.2.0 (SSR enabled)
- **Vue**: 3.5.22 with Composition API
- **Content**: Nuxt Content for markdown questions
- **UI**: Nuxt UI + TailwindCSS 4
- **TypeScript**: Strict mode
- **i18n**: FR (default) / EN with `prefix_except_default` strategy
- **Deployment**: GitHub Pages (`baseURL: /interview-training/`)
- **Animation**: Motion-v for transitions
- **Utilities**: VueUse for composables

## Project Structure

```
app/
├── components/
│   ├── QuestionCard.vue         # Flashcard component with reveal
│   ├── TableOfContents.vue      # Sidebar navigation
│   ├── ProgressBar.vue          # Progress bar
│   └── LanguageSwitcher.vue     # FR/EN switcher
├── composables/
│   ├── useAnswerRevealState.ts  # Answer reveal state
│   ├── useFavorites.ts          # Favorites management (localStorage)
│   ├── useQuestionProgress.ts   # Progress tracking
│   └── useQuizMode.ts           # Quiz mode
├── layouts/
│   └── interview.vue            # Main layout with sidebar
└── pages/
    ├── index.vue                # Homepage with all questions
    └── [category]/
        ├── index.vue            # Category filtered list
        └── [slug].vue           # Individual question page

content/
└── javascript/                  # 26+ questions in markdown
    ├── q001-primitive-detection.md
    ├── q002-es6-features.md
    └── ...

scripts/
└── split-content.js             # Utility to split monolithic content
```

## Content Format (Nuxt Content)

Each question uses this markdown structure with YAML frontmatter:

```markdown
---
id: 1
slug: question-slug
title: "Question title"
category: javascript
difficulty: easy|medium|hard
tags: ["tag1", "tag2"]
---

::question
Question text
::

::answer
Detailed answer with code examples
::
```

## Important Commands

```bash
npm run dev          # Dev server (port 3000)
npm run build        # Production build
npm run generate     # Static generation
npm run preview      # Preview production build

# Utility script
node scripts/split-content.js  # Split monolithic content
```

## Code Conventions

### Vue/Nuxt
- **Composition API** only with "script setup" sugar syntax (no Options API)
- **Script Setup** with TypeScript
- **Auto-imports**: composables, components, Vue APIs (configured by Nuxt)
- Prefer **composables** for reusable logic
- use useState for common store

### TypeScript
- Strict types enabled
- Type props, emits, returns
- No `any` unless justified exception

### Styling
- **TailwindCSS 4** for styling
- Use **Nuxt UI components** when available
- Utility classes over custom CSS

### i18n
- Default locale: **French**
- English available via `/en` prefix
- Use `$t()` for translations

## State and Data

- **localStorage**: favorites, progress, preferences
- **Nuxt Content**: source of truth for questions
- **Composables**: shared state logic (useFavorites, useQuestionProgress, etc.)

## Dynamic Routing

- `/` - Homepage with all questions
- `/[category]` - Category filtered list
- `/[category]/[slug]` - Individual question page
- Prerendering enabled for all routes (crawlLinks: true)

## GitHub Pages Deployment

- Base URL: `/interview-training/`
- Nitro preset: `github-pages`
- Branch: `main`
- Auto-discovery of routes for prerender

## Nuxt Studio

Nuxt Studio integration active for online content editing:
- Admin route: `/_studio`
- Repository: NicoPio/interview-training
- Branch: main

## Adding New Questions

1. Create `content/javascript/q0XX-question-title.md`
2. Use frontmatter format + `::question` and `::answer` slots
3. ID must be sequential and unique
4. Slug must be kebab-case and descriptive
5. Tags should be in English and lowercase

## Implemented Features

✅ Phase 1-3 (Completed)
- QuestionCard with reveal animation
- TableOfContents navigation
- Dynamic routing
- Responsive layout with sidebar
- Progress tracking (localStorage)
- Quiz mode
- Favorites system

🚧 Phase 4-5 (In Progress)
- Advanced search
- Multiple filters
- Share functionality

## Important Considerations

1. **SSR is enabled**: be careful with `window`, `localStorage` (use onMounted)
2. **Base URL**: all links must be aware of `/interview-training/`
3. **i18n**: prioritize French
4. **Nuxt Content**: use `queryContent()` to fetch questions
5. **Performance**: pages are prerendered, favor static generation

## Known Issues

- Nuxt Studio configuration needs verification (malformed repo URL in config)
- `.env` changes are not tracked (file in .gitignore)

## Useful Resources

- [Nuxt 4 Docs](https://nuxt.com)
- [Nuxt Content](https://content.nuxt.com)
- [Nuxt UI](https://ui.nuxt.com)
- [TailwindCSS 4](https://tailwindcss.com)
- Detailed roadmap: `documentation/ROADMAP.md`

## Complete Documentation

Comprehensive project documentation available in `specs/001-project-documentation/`:
- **spec.md**: Complete specification with 8 user stories, 71 functional requirements
- **plan.md**: Implementation plan with technical stack analysis
- **research.md**: Technology decisions and architectural patterns
- **data-model.md**: Data structures, composables, and state management
- **tasks.md**: 143 implementation tasks organized by user story

## Project Philosophy

- **DX First**: optimal developer experience
- **Content First**: content (questions) is king
- **Progressive Enhancement**: start simple, add progressively
- **Type Safe**: TypeScript everywhere
- **Performance**: static generation, native Nuxt optimizations
