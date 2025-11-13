# 🎯 JS Interview Prep

An interactive JavaScript interview preparation application built with Nuxt 4, featuring flashcard-style questions with reveal answers, progress tracking, and a beautiful UI.

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3.5.22-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)

## ✨ Features

- 📚 **26+ JavaScript Questions** - Curated interview questions covering essential JS concepts
- 🎴 **Flashcard Mode** - Interactive cards with reveal answer functionality and timing analytics
- 📊 **Progress Tracking** - Automatic tracking of viewed and mastered questions with localStorage persistence
- ⭐ **Favorites System** - Mark questions as favorites for quick access
- 🔍 **Advanced Search & Filters** - Search by title/tags, filter by difficulty, tags, progress status
- ⏱️ **Quiz Mode** - Timed mode with 30-second countdown and auto-reveal
- 🌍 **Bilingual Support** - Full French and English translations with i18n routing
- 🗂️ **Organized by Difficulty** - Easy, Medium, and Hard levels
- 🏷️ **Smart Tagging** - Questions tagged by topic (closures, promises, ES6, etc.)
- 🎨 **Beautiful UI** - Built with Nuxt UI components
- 🌓 **Dark Mode** - Automatic dark/light theme switching with persistence
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop (320px minimum)
- 🔍 **SEO Optimized** - Each question has its own URL and meta tags
- ⚡ **Lightning Fast** - Static generation with Nuxt Content

## 🚀 Tech Stack

- **[Nuxt 4](https://nuxt.com/)** - The Intuitive Vue Framework
- **[Nuxt Content](https://content.nuxt.com/)** - Content made easy for Vue Developers
- **[Nuxt UI](https://ui.nuxt.com/)** - Fully styled and customizable components
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Motion](https://github.com/kingyue737/vueuse-motion-v)** - Vue composables for animations
- **[VueUse](https://vueuse.org/)** - Collection of Vue Composition Utilities
- **TypeScript** - Type safety and better DX

## 📦 Installation

### Prerequisites

- Node.js >= 18
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd js-interview-nuxt

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
js-interview-nuxt/
├── app/
│   ├── components/
│   │   ├── QuestionCard.vue      # Flashcard component with reveal
│   │   └── TableOfContents.vue   # Sidebar navigation
│   ├── layouts/
│   │   └── interview.vue         # Main layout with sidebar
│   ├── pages/
│   │   ├── index.vue             # Homepage with all questions
│   │   └── [category]/[slug].vue # Individual question page
│   └── app.vue
├── content/
│   └── javascript/               # JavaScript questions (26 files)
│       ├── q001-primitive-detection.md
│       ├── q002-es6-features.md
│       └── ...
├── scripts/
│   └── split-content.js          # Script to split monolithic content
├── documentation/
│   └── ROADMAP.md                # Development roadmap
└── nuxt.config.ts
```

## 📝 Content Structure

Each question is a Markdown file with YAML frontmatter:

```markdown
---
id: 1
slug: how-to-detect-primitives
title: "How do you detect primitive or non-primitive value types in JavaScript?"
category: javascript
difficulty: easy
tags: ["primitives", "types", "typeof"]
---

::question
How do you detect primitive or non-primitive value types in JavaScript?
::

::answer
In JavaScript, values are categorized as either primitive or non-primitive...
[Full answer with examples]
::
```

## 🎨 Key Components

### QuestionCard

Interactive flashcard component with:
- Question display
- Reveal answer button with animation
- Difficulty and category badges
- Favorite and share buttons
- Permalink

### TableOfContents

Sidebar navigation with:
- List of all questions
- Active question highlight
- Difficulty indicators
- Sticky positioning
- Mobile responsive

### Interview Layout

Main application layout featuring:
- Sticky header with branding
- Sidebar (desktop) / Drawer (mobile)
- Color mode toggle
- Footer with links

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build
npm run generate     # Generate static site

# Content Management
node scripts/split-content.js  # Split monolithic content into individual files
```

## 📊 Content Management

### Adding New Questions

1. Create a new markdown file in `content/javascript/`:

```bash
touch content/javascript/q027-your-question.md
```

2. Add frontmatter and content:

```markdown
---
id: 27
slug: your-question-slug
title: "Your Question Title"
category: javascript
difficulty: medium
tags: ["tag1", "tag2"]
---

::question
Your question here
::

::answer
Your detailed answer here
::
```

3. The question will automatically appear in the application!

### Bulk Content Import

Use the `split-content.js` script to convert a monolithic markdown file:

```bash
node scripts/split-content.js
```

## 🎯 Roadmap

See [documentation/ROADMAP.md](documentation/ROADMAP.md) for the complete development roadmap.

### ✅ Completed
- ✅ Content restructuring with individual files (26+ questions)
- ✅ QuestionCard component with reveal functionality and animations
- ✅ Answer reveal tracking with time-to-reveal metrics
- ✅ Progress tracking system (seen/mastered status with localStorage)
- ✅ Favorites management with localStorage persistence
- ✅ Advanced search (title and tags, accent-insensitive)
- ✅ Multi-criteria filters (difficulty, tags, status, favorites)
- ✅ Quiz mode with countdown timer and auto-reveal
- ✅ Bilingual support (French default, English via `/en`)
- ✅ Dark mode with automatic persistence
- ✅ Keyboard shortcuts (Spacebar to reveal)
- ✅ TableOfContents navigation
- ✅ Dynamic routing for categories and questions
- ✅ Homepage with stats and question list
- ✅ URL synchronization for filters
- ✅ Responsive design (320px+)
- ✅ Static site generation for GitHub Pages

### 🔮 Future Enhancements
- PWA support with offline capability
- Visual regression testing
- E2E testing with Playwright
- Content validation scripts
- Privacy-friendly analytics
- Additional question categories (HTML, CSS, Vue, React)
- Social sharing functionality

## 🤝 Contributing

Contributions are welcome! Please read the [ROADMAP](documentation/ROADMAP.md) for development guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Questions curated from common JavaScript interview topics
- Built with amazing open-source tools from the Vue ecosystem
- Inspired by the need for better interview preparation tools

---

**Made with ❤️ using Nuxt 4, Nuxt Content & Nuxt UI**
