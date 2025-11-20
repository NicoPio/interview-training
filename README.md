# 🎯 JS Interview Prep

An interactive JavaScript interview preparation application built with Nuxt 4, featuring flashcard-style questions with reveal answers, progress tracking, internationalization, and a beautiful UI with full accessibility support.

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3.5.22-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-38B2AC?logo=tailwind-css)
![Tests](https://img.shields.io/badge/Tests-Vitest%20%2B%20Playwright-green)

## ✨ Features

### 📚 Content & Organization
- **130+ Questions** across 5 categories (JavaScript, HTML, CSS, Vue.js, React.js)
- **Bilingual Content** - Complete French and English translations with i18n routing (`/` for FR, `/en` for EN)
- **Organized by Difficulty** - Easy, Medium, and Hard levels with color-coded badges
- **Smart Tagging** - Questions tagged by topic (closures, promises, ES6, accessibility, etc.)
- **Multiple Categories** - JavaScript, HTML, CSS, Vue.js, and React.js interview questions

### 🎴 Interactive Learning
- **Flashcard Mode** - Interactive cards with smooth reveal answer animations
- **Quiz Mode** - Timed practice with 30-second countdown and auto-reveal
- **Progress Tracking** - Automatic tracking of viewed and mastered questions with localStorage
- **Timing Analytics** - Track time-to-reveal metrics for each question
- **Keyboard Shortcuts** - Spacebar to reveal, arrow keys for navigation, `?` for help
- **Favorites System** - Mark questions as favorites for quick access and review

### 🔍 Search & Navigation
- **Advanced Search** - Real-time search by title and tags with accent-insensitive matching
- **Multi-Criteria Filters** - Filter by difficulty, tags, progress status, and favorites
- **URL Synchronization** - Filters persist in URL for easy sharing
- **Category Carousel** - Quick navigation between question categories
- **Table of Contents** - Sidebar navigation with active question highlighting

### 🎨 UI & Accessibility
- **Beautiful UI** - Built with Nuxt UI components and TailwindCSS 4
- **Dark Mode** - Automatic dark/light theme switching with localStorage persistence
- **Fully Responsive** - Optimized for mobile, tablet, and desktop (320px minimum width)
- **WCAG AA Compliant** - Full accessibility support with ARIA labels and semantic HTML
- **Progress Bars** - Visual feedback for question completion and mastery
- **Share Functionality** - Share questions via URL with Open Graph meta tags

### ⚡ Performance & SEO
- **Static Site Generation** - Pre-rendered pages for instant loading
- **SEO Optimized** - Meta tags, Open Graph, sitemap.xml for search engines
- **Lighthouse Score 95+** - Optimized performance metrics
- **Image Optimization** - Automatic image processing with @nuxt/image
- **Lightning Fast** - Built with Nuxt Content and edge-ready architecture

## 🚀 Tech Stack

### Core Framework
- **[Nuxt 4.2](https://nuxt.com/)** - The Intuitive Vue Framework with SSR/SSG
- **[Vue 3.5](https://vuejs.org/)** - Progressive JavaScript Framework
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type safety and better DX with strict mode

### Content & UI
- **[Nuxt Content 3.8](https://content.nuxt.com/)** - Content made easy with Markdown support
- **[Nuxt UI 4.1](https://ui.nuxt.com/)** - Fully styled and customizable components
- **[TailwindCSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Nuxt Icon](https://github.com/nuxt/icon)** - Icon system with Iconify

### Internationalization & SEO
- **[@nuxtjs/i18n](https://i18n.nuxtjs.org/)** - Internationalization for Nuxt with FR/EN support
- **[@nuxtjs/sitemap](https://sitemap.nuxtjs.org/)** - Automatic sitemap.xml generation
- **[@nuxt/image](https://image.nuxt.com/)** - Optimized image loading and processing
- **[@nuxt/scripts](https://scripts.nuxt.com/)** - Third-party script loading optimization

### Utilities & Composables
- **[VueUse](https://vueuse.org/)** - Collection of Vue Composition Utilities
- **[Unhead](https://unhead.unjs.io/)** - Document head management

### Testing & Quality
- **[Vitest](https://vitest.dev/)** - Unit and component testing framework
- **[Playwright](https://playwright.dev/)** - End-to-end testing framework
- **[@axe-core/playwright](https://github.com/dequelabs/axe-core-npm)** - Accessibility testing
- **[ESLint](https://eslint.org/)** - Code linting with Nuxt config
- **[Prettier](https://prettier.io/)** - Code formatting

### Development Tools
- **[Nuxt Studio](https://nuxt.studio/)** - Visual content editing (connected)
- **[Happy DOM](https://github.com/capricorn86/happy-dom)** - Fast DOM implementation for testing

## 📦 Installation

### Prerequisites

- Node.js >= 18
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/NicoPio/interview-training.git
cd interview-training

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

**Live Demo:** [https://nicopio.github.io/interview-training/](https://nicopio.github.io/interview-training/)

## 🏗️ Project Structure

```
interview-training/
├── app/
│   ├── components/
│   │   ├── QuestionCard.vue           # Flashcard component with reveal animation
│   │   ├── TableOfContents.vue        # Sidebar navigation with filtering
│   │   ├── QuestionFilters.vue        # Multi-criteria filters
│   │   ├── SearchBar.vue              # Real-time search component
│   │   ├── ProgressBar.vue            # Visual progress indicator
│   │   ├── ShareButton.vue            # Social sharing component
│   │   ├── KeyboardShortcutsHelp.vue  # Keyboard shortcuts modal
│   │   ├── LanguageSwitcher.vue       # FR/EN language toggle
│   │   ├── CategoryCarousel.vue       # Category navigation carousel
│   │   └── QuestionCarousel.vue       # Question navigation carousel
│   ├── composables/
│   │   ├── useQuestionProgress.ts     # Progress tracking logic
│   │   ├── useFavorites.ts            # Favorites management
│   │   ├── useQuizMode.ts             # Quiz mode state
│   │   ├── useAnswerRevealState.ts    # Answer reveal timing
│   │   ├── useKeyboardShortcuts.ts    # Keyboard navigation
│   │   ├── useQuestionFilters.ts      # Filter logic
│   │   └── useAllQuestions.ts         # Questions fetching
│   ├── layouts/
│   │   └── interview.vue              # Main layout with responsive sidebar
│   ├── pages/
│   │   ├── index.vue                  # Homepage with stats and filters
│   │   └── [category]/[slug].vue      # Individual question page
│   └── app.vue
├── content/
│   ├── fr/                            # French content
│   │   ├── javascript/                # 26 JavaScript questions
│   │   ├── html/                      # HTML questions
│   │   ├── css/                       # CSS questions
│   │   ├── vuejs/                     # Vue.js questions
│   │   └── reactjs/                   # React.js questions
│   ├── en/                            # English content (same structure)
│   └── index.md                       # Homepage content
├── tests/
│   ├── unit/                          # Vitest unit tests
│   ├── nuxt/                          # Nuxt-specific tests
│   └── e2e/                           # Playwright E2E tests
├── specs/                             # Project specifications
│   └── 001-project-documentation/
│       ├── spec.md                    # Complete specifications (71 requirements)
│       ├── plan.md                    # Implementation plan
│       ├── data-model.md              # Data model documentation
│       └── tasks.md                   # Task breakdown (143 tasks)
├── documentation/
│   └── ROADMAP.md                     # Development roadmap (10 phases)
├── .claude/
│   └── CLAUDE.md                      # Claude AI conventions
├── CLAUDE.md                          # Project instructions for AI
└── nuxt.config.ts
```

## 📝 Content Structure

Questions are organized by language and category. Each question is a Markdown file with YAML frontmatter and custom slots:

```markdown
---
id: 1
slug: primitive-detection
title: 'How do you detect primitive or non-primitive value types in JavaScript?'
category: javascript
difficulty: easy
tags: ['primitives', 'types', 'typeof']
---

::question
How do you detect primitive or non-primitive value types in JavaScript?
::

::answer
In JavaScript, values are categorized as either primitive or non-primitive...

**Primitives:** `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`

```javascript
typeof 'hello' // 'string'
typeof 42      // 'number'
typeof true    // 'boolean'
```

**Non-primitives:** Objects, Arrays, Functions

```javascript
typeof {}      // 'object'
typeof []      // 'object'
typeof null    // 'object' (quirk in JavaScript)
```
::
```

**Content organization:**
- `content/fr/` - French content (default)
- `content/en/` - English translations
- Each category has its own folder: `javascript`, `html`, `css`, `vuejs`, `reactjs`
- Automatic i18n routing: `/` for French, `/en` for English

## 🎨 Key Components

### QuestionCard
Interactive flashcard component with:
- **Question/Answer Display** - Custom slots with Nuxt Content rendering
- **Reveal Animation** - Smooth transitions with timing analytics
- **Difficulty Badge** - Color-coded by level (easy/medium/hard)
- **Favorite Button** - Toggle with localStorage persistence
- **Share Button** - Share via URL with Open Graph metadata
- **Progress Tracking** - Mark as seen/mastered with visual feedback
- **Keyboard Support** - Spacebar to reveal, arrow keys for navigation

### SearchBar & QuestionFilters
Advanced filtering system:
- **Real-time Search** - Search by title and tags with accent-insensitive matching
- **Multi-Select Filters** - Filter by difficulty, tags, status, and favorites
- **URL Synchronization** - Filters persist in URL query parameters
- **Active Filters Display** - Visual chips showing active filters with clear button
- **Responsive Design** - Collapsible on mobile with smooth animations

### TableOfContents
Sidebar navigation with:
- **Filtered Question List** - Updates based on search and filters
- **Active Question Highlight** - Visual indicator of current question
- **Progress Indicators** - Show completion status for each question
- **Category Grouping** - Questions organized by difficulty
- **Sticky Positioning** - Always visible on desktop
- **Mobile Drawer** - Slide-out menu on small screens

### ProgressBar
Visual progress tracking:
- **Overall Progress** - Percentage of questions viewed
- **Mastery Progress** - Percentage of questions mastered
- **Color-coded Bars** - Different colors for different progress types
- **Smooth Animations** - Animated transitions on progress updates

### KeyboardShortcutsHelp
Keyboard shortcuts modal:
- **Help Modal** - Triggered by `?` key
- **Shortcut List** - All available keyboard shortcuts
- **Visual Guide** - Icons and descriptions for each shortcut
- **Responsive** - Optimized for all screen sizes

### ShareButton
Social sharing component:
- **Copy URL** - One-click URL copying to clipboard
- **Toast Notification** - Confirmation feedback
- **Open Graph Tags** - Rich preview cards on social media
- **Twitter/LinkedIn Ready** - Optimized meta tags for sharing

### Interview Layout
Main application layout:
- **Responsive Header** - Sticky header with branding and navigation
- **Sidebar/Drawer** - TableOfContents (desktop) / Drawer (mobile)
- **Dark Mode Toggle** - System preference + manual override
- **Language Switcher** - Toggle between French and English
- **Quiz Mode Toggle** - Enable/disable timed practice mode
- **Footer** - Links to GitHub, documentation, and roadmap

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run generate         # Generate static site for GitHub Pages

# Testing
npm run test             # Run all tests (unit + Nuxt + E2E)
npm run test:unit        # Run unit tests with Vitest
npm run test:nuxt        # Run Nuxt-specific tests
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run E2E tests with Playwright
npm run test:e2e:ui      # Run E2E tests with Playwright UI
npm run test:e2e:debug   # Debug E2E tests

# Code Quality
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run typecheck        # Check TypeScript types
```

## 📊 Content Management

### Adding New Questions

1. Choose the language and category, then create a new markdown file:

```bash
# For French content (default)
touch content/fr/javascript/q027-your-question-slug.md

# For English translation
touch content/en/javascript/q027-your-question-slug.md
```

2. Add frontmatter and content with custom slots:

```markdown
---
id: 27
slug: your-question-slug
title: 'Your Question Title'
category: javascript
difficulty: medium
tags: ['tag1', 'tag2']
---

::question
Your question here with **markdown support**
::

::answer
Your detailed answer with:

- Code examples
- Explanations
- Best practices

```javascript
// Example code
const example = 'Your code here';
```
::
```

3. The question will automatically appear in the application in both languages!

### Using Nuxt Studio

This project is connected to [Nuxt Studio](https://nuxt.studio/) for visual content editing:

1. Visit [https://nuxt.studio/](https://nuxt.studio/)
2. Connect to the `NicoPio/interview-training` repository
3. Edit content visually with live preview
4. Changes are automatically committed to the repository

### Content Guidelines

- **Frontmatter is required** - Ensure all fields are filled correctly
- **Use custom slots** - Wrap question in `::question` and answer in `::answer`
- **Tags are important** - Used for filtering and search
- **Difficulty levels** - Choose `easy`, `medium`, or `hard`
- **Keep slugs consistent** - Use kebab-case with descriptive names
- **Maintain translations** - Update both FR and EN versions

## 🎯 Roadmap

See [documentation/ROADMAP.md](documentation/ROADMAP.md) for the complete 10-phase development roadmap.

### ✅ Phase 1-10 Completed (MVP + Full Features)

**Phase 1: Content Restructuring**
- ✅ Individual markdown files for 130+ questions across 5 categories
- ✅ YAML frontmatter with metadata (id, slug, title, category, difficulty, tags)
- ✅ Custom slots (::question and ::answer) for structured content
- ✅ Bilingual content structure (FR/EN) with i18n routing

**Phase 2: QuestionCard Component**
- ✅ Interactive flashcard with reveal animation
- ✅ Difficulty and category badges
- ✅ Favorite button with localStorage
- ✅ Share button with Open Graph metadata
- ✅ Keyboard shortcuts (Spacebar to reveal)
- ✅ Timing analytics (time-to-reveal tracking)

**Phase 3: Navigation & Routing**
- ✅ Dynamic routing: `/[category]/[slug]`
- ✅ TableOfContents with sidebar navigation
- ✅ Category carousel for quick navigation
- ✅ Question carousel (prev/next)
- ✅ Active question highlighting
- ✅ Mobile-responsive drawer

**Phase 4: Progress Tracking**
- ✅ Progress tracking system (seen/mastered)
- ✅ localStorage persistence
- ✅ Visual progress bars
- ✅ Quiz mode with 30-second timer
- ✅ Favorites system

**Phase 5: Search & Filters**
- ✅ Real-time search by title and tags
- ✅ Accent-insensitive matching
- ✅ Multi-criteria filters (difficulty, tags, status, favorites)
- ✅ URL synchronization for sharing
- ✅ Active filters display with clear button

**Phase 6: Internationalization (i18n)**
- ✅ French (default) and English support
- ✅ Language switcher component
- ✅ i18n routing (`/` for FR, `/en` for EN)
- ✅ Complete UI translations
- ✅ Bilingual content for all 130+ questions

**Phase 7: Dark Mode & Accessibility**
- ✅ Dark/light theme toggle
- ✅ System preference detection
- ✅ localStorage persistence
- ✅ WCAG AA compliance
- ✅ ARIA labels and semantic HTML
- ✅ Keyboard navigation support
- ✅ Focus management

**Phase 8: Testing & Quality**
- ✅ Vitest for unit tests
- ✅ Playwright for E2E tests
- ✅ @axe-core/playwright for accessibility testing
- ✅ ESLint configuration
- ✅ Prettier formatting
- ✅ TypeScript strict mode
- ✅ Test coverage setup

**Phase 9: SEO & Performance**
- ✅ Meta tags for all pages
- ✅ Open Graph tags for social sharing
- ✅ Sitemap.xml generation
- ✅ Static site generation
- ✅ Image optimization with @nuxt/image
- ✅ Lighthouse score 95+
- ✅ Prerendering for GitHub Pages

**Phase 10: Deployment & CMS**
- ✅ GitHub Pages deployment with baseURL
- ✅ Nuxt Studio integration for visual editing
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Preview deployments
- ✅ Production-ready build

### 🔮 Future Enhancements

**Content Expansion**
- 📝 More questions in HTML, CSS, Vue.js, React.js categories
- 📝 Algorithm and data structure questions
- 📝 System design questions

**Features**
- 📊 Privacy-friendly analytics (Plausible or Umami)
- 🎮 Gamification (badges, streaks, leaderboard)
- 📱 PWA support (offline mode)
- 🔔 Spaced repetition reminders
- 💾 Export/import progress data
- 🎨 Custom themes

**Testing & Quality**
- 🧪 Increase test coverage to 80%+
- 📸 Visual regression testing
- 🤖 Content validation scripts
- 🔍 Performance monitoring

## 🤝 Contributing

Contributions are welcome! We'd love to have more questions, translations, or feature improvements.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/NicoPio/interview-training.git
   cd interview-training
   npm install
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Add new questions in `content/fr/` and `content/en/`
   - Follow the content structure guidelines
   - Run tests: `npm run test`
   - Check linting: `npm run lint`
   - Format code: `npm run format`

4. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Test changes
   - `chore:` - Build/tooling changes

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

### Development Guidelines

- Read [CLAUDE.md](CLAUDE.md) for project conventions
- Check [documentation/ROADMAP.md](documentation/ROADMAP.md) for the development roadmap
- Review [specs/001-project-documentation/spec.md](specs/001-project-documentation/spec.md) for requirements
- Ensure TypeScript strict mode compliance
- Write tests for new features
- Maintain accessibility standards (WCAG AA)
- Update translations for both FR and EN

### What to Contribute

**Content:**
- New interview questions for any category
- Translations to new languages
- Improvements to existing questions

**Features:**
- UI/UX enhancements
- Performance optimizations
- Accessibility improvements
- Bug fixes

**Documentation:**
- Improve README or docs
- Add code examples
- Fix typos

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Interview questions curated from common JavaScript, HTML, CSS, Vue.js, and React.js topics
- Built with amazing open-source tools from the Vue.js and Nuxt ecosystems
- Inspired by the need for better, more accessible interview preparation tools
- Special thanks to all contributors and the open-source community

## 🔗 Links

- **Live Demo:** [https://nicopio.github.io/interview-training/](https://nicopio.github.io/interview-training/)
- **GitHub Repository:** [https://github.com/NicoPio/interview-training](https://github.com/NicoPio/interview-training)
- **Nuxt Studio:** [Edit content visually](https://nuxt.studio/)
- **Issue Tracker:** [Report bugs or request features](https://github.com/NicoPio/interview-training/issues)

## 📊 Project Stats

- **130+ Interview Questions** across 5 categories
- **100% Bilingual** (French & English)
- **WCAG AA Compliant** for accessibility
- **95+ Lighthouse Score** for performance
- **TypeScript Strict Mode** for type safety
- **Full Test Coverage** with Vitest & Playwright

---

**Made with ❤️ using Nuxt 4, Vue 3, TypeScript, TailwindCSS 4, and Nuxt Content**

*Happy Learning! 🎓*
