# Contributing to JS Interview Prep

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

### Prerequisites

- Node.js >= 18
- npm or pnpm
- Git

### Getting Started

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/interview-training.git
cd interview-training

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
app/
├── components/     # Vue components (QuestionCard, ProgressBar, etc.)
├── composables/    # Reusable logic (useFavorites, useQuestionProgress, etc.)
├── pages/          # File-based routing
└── layouts/        # Layout components

content/
├── fr/             # French content (default)
└── en/             # English content

specs/              # Feature specifications and documentation
tests/              # Unit and integration tests
```

## Code Conventions

### Vue/Nuxt

- **Composition API only** with `<script setup>` syntax
- **TypeScript** for all new code
- **Auto-imports** are configured (no need to import components/composables)
- Use `useState` for shared state

### TypeScript

- Strict mode enabled
- Type all props, emits, and returns
- Avoid `any` unless absolutely necessary

### Styling

- **TailwindCSS 4** utility classes
- **Nuxt UI components** when available
- Avoid custom CSS unless necessary

### i18n

- Default locale: **French**
- English translations via `/en` prefix
- Use `$t()` for UI strings
- Add translations to both `i18n/fr.json` and `i18n/en.json`

## Adding New Questions

### File Structure

Create a new markdown file in `content/{locale}/{category}/`:

```markdown
---
id: 99
slug: your-question-slug
title: 'Your Question Title'
category: javascript
difficulty: easy|medium|hard
tags: ['tag1', 'tag2']
---

# Your Question Title

Question content here...

## Answer

Detailed answer with code examples...
```

### Guidelines

1. **ID**: Must be sequential and unique
2. **Slug**: Use kebab-case, descriptive
3. **Title**: Clear and concise
4. **Category**: Currently `javascript`, `html`, or `css`
5. **Difficulty**: `easy`, `medium`, or `hard`
6. **Tags**: Lowercase, English, relevant topics
7. **Content**: Use proper markdown with code blocks

### Add to Both Locales

Ensure the question exists in both `content/fr/` and `content/en/` with the same ID and slug.

## Making Changes

### Branch Naming

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### Commit Messages

Follow conventional commits:

```
feat: add new question about closures
fix: correct typo in promise question
docs: update contributing guide
refactor: simplify useQuestionFilters logic
test: add tests for useFavorites
```

### Testing

Before submitting a PR:

```bash
# Run type checking
npm run typecheck

# Run tests (when available)
npm run test

# Build to ensure no errors
npm run generate
```

## Pull Request Process

1. **Fork** the repository
2. **Create a branch** from `main`
3. **Make your changes** following the conventions above
4. **Test your changes** locally
5. **Commit** with clear messages
6. **Push** to your fork
7. **Open a PR** with a clear description

### PR Description Template

```markdown
## What

Brief description of changes

## Why

Reason for the changes

## How

Technical approach or implementation details

## Testing

How you tested the changes
```

## Code Review

- All PRs require review before merging
- Address feedback promptly
- Keep PRs focused on a single concern
- Update documentation if needed

## Questions?

- Check existing issues and PRs
- Review the [complete documentation](specs/001-project-documentation/)
- Open an issue for discussion

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
