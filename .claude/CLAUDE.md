# JS Interview Prep - Instructions for Claude

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

## component usage
- use Nuxt UI components first: refer to nuxtUI documentation ([Nuxt UI](https://ui.nuxt.com)) before creating a component

- **localStorage**: favorites, progress, preferences
- **Nuxt Content**: source of truth for questions
- **Composables**: shared state logic (useFavorites, useQuestionProgress, etc.)

## Important Considerations

1. **SSR is enabled**: be careful with `window`, `localStorage` (use onMounted)
2. **Base URL**: all links must be aware of `/interview-training/`
3. **i18n**: prioritize French
4. **Nuxt Content**: use `queryContent()` to fetch questions
5. **Performance**: pages are prerendered, favor static generation

## Useful Resources

- [Nuxt 4 Docs](https://nuxt.com)
- [Nuxt Content](https://content.nuxt.com)
- [Nuxt UI](https://ui.nuxt.com)
- [TailwindCSS 4](https://tailwindcss.com)
- Detailed roadmap: `documentation/ROADMAP.md`

## Project Philosophy

- **DX First**: optimal developer experience
- **Content First**: content (questions) is king
- **Progressive Enhancement**: start simple, add progressively
- **Type Safe**: TypeScript everywhere
- **Performance**: static generation, native Nuxt optimizations
- **DX language**: reply in french
