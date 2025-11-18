# JS Interview Prep - Instructions for Claude

## Project Overview

Nuxt 4 app for JavaScript interview prep with flashcards. 26+ questions with reveal, progress tracking, i18n (FR default).

**Stack**: Nuxt 4.2 + Vue 3.5 + Nuxt Content + Nuxt UI + TailwindCSS 4 + TypeScript strict + i18n (FR/EN) + VueUse

## Key Architecture

- **Content**: Markdown questions in `content/javascript/` with YAML frontmatter + `::question`/`::answer` slots
- **Routing**: `/` (all) → `/[category]` (filtered) → `/[category]/[slug]` (single)
- **State**: localStorage (favorites, progress) + composables (useFavorites, useQuestionProgress, useQuizMode, useAnswerRevealState)
- **Deployment**: GitHub Pages (`baseURL: /interview-training/`) with SSG prerendering

## Commands

```bash
npm run dev          # Dev server
npm run generate     # Static generation
npm run lint         # ESLint
npm run lint:fix     # Auto-fix
npm run format       # Prettier
npm run typecheck    # TypeScript check
```

## Code Conventions

**See `.claude/CLAUDE.md` for detailed conventions** (Vue/Nuxt, TypeScript, Styling, i18n)

Key rules:
- Composition API + script setup only
- TypeScript strict, no `any`
- Nuxt UI components first, TailwindCSS 4 for styling
- French default (use `$t()` for i18n)
- SSR enabled: use `onMounted` for browser APIs
- Reply in French (DX language)

## Content Format

```markdown
---
id: 1
slug: question-slug
title: 'Question title'
category: javascript
difficulty: easy|medium|hard
tags: ['tag1', 'tag2']
---

::question
Question text
::

::answer
Detailed answer
::
```

## Implemented Features

✅ **Phase 1-6 Completed**
- QuestionCard with reveal animation
- TableOfContents navigation
- Dynamic routing
- Progress tracking + Quiz mode + Favorites
- Dark mode + Keyboard shortcuts + Share functionality
- Open Graph meta tags for social sharing

🚧 **Phase 5 In Progress**
- Advanced search & filters

## Documentation References

- **Full roadmap**: `documentation/ROADMAP.md` (14KB, 10 phases)
- **Complete specs**: `specs/001-project-documentation/spec.md` (28KB, 8 user stories, 71 requirements)
- **Implementation plan**: `specs/001-project-documentation/plan.md` (20KB)
- **Data model**: `specs/001-project-documentation/data-model.md` (19KB)
- **Tasks**: `specs/001-project-documentation/tasks.md` (23KB, 143 tasks)
- **Nuxt Studio**: Admin at `/_studio`, repo: NicoPio/interview-training

## Important

1. **SSR**: Be careful with `window`/`localStorage` (use `onMounted`)
2. **Base URL**: All links aware of `/interview-training/`
3. **i18n**: French priority
4. **Nuxt Content**: Use `queryContent()` to fetch
5. **Performance**: Prerendered static pages

## Quick Links

- [Nuxt 4](https://nuxt.com) | [Content](https://content.nuxt.com) | [UI](https://ui.nuxt.com) | [TailwindCSS](https://tailwindcss.com)

## Philosophy

**DX First** • **Content First** • **Progressive Enhancement** • **Type Safe** • **Performance**
