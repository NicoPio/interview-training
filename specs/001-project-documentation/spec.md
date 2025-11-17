# Feature Specification: JS Interview Prep - Complete Application Documentation

**Feature Branch**: `001-project-documentation`
**Created**: 2025-11-13
**Status**: Draft
**Input**: User description: "Comprehensive documentation of the existing JS Interview Prep application including all implemented features, architecture, user flows, and data models"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Browse and Discover Interview Questions (Priority: P1)

A developer preparing for technical interviews can browse a curated collection of JavaScript, HTML, and CSS interview questions organized by category, difficulty, and tags. They can see at a glance how many questions are available in each difficulty level and navigate directly to any question.

**Why this priority**: This is the core value proposition - providing access to interview questions. Without this, the application has no purpose.

**Independent Test**: Can be fully tested by navigating to the homepage and verifying that all questions are listed with proper metadata (difficulty badges, tags, categories) and clicking through to individual question pages.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** they scroll to the questions section, **Then** they see all available questions sorted by ID with title, difficulty badge, category, and up to 3 tags displayed
2. **Given** the homepage is loaded, **When** the user views the stats section, **Then** they see accurate counts for total questions, easy questions, medium questions, and hard questions
3. **Given** a user clicks on any question card, **When** the page loads, **Then** they are taken to that specific question's detail page with the full question text visible

---

### User Story 2 - Interactive Flashcard Learning with Answer Reveal (Priority: P1)

A user studying interview questions can read a question, attempt to formulate an answer mentally, and then reveal the detailed answer when ready. They can hide and re-reveal answers multiple times. The system tracks how long they spent before first revealing the answer and how many times they've revealed it.

**Why this priority**: This is the unique interactive learning mechanism that distinguishes this from a static documentation site. It enables active recall practice.

**Independent Test**: Can be fully tested by opening any question page, waiting a specific time, clicking "Voir la réponse", verifying the answer appears with animation, and checking that reveal statistics are displayed and updated correctly.

**Acceptance Scenarios**:

1. **Given** a user opens a question page, **When** they click the "Voir la réponse" button, **Then** the answer section smoothly animates into view and scrolls into the viewport
2. **Given** an answer is currently visible, **When** the user clicks "Masquer la réponse", **Then** the answer smoothly animates out of view
3. **Given** a user has revealed an answer at least once, **When** they view the question card, **Then** they see statistics showing how many times they've revealed it and the time taken before first reveal
4. **Given** a user is viewing a question, **When** they press the Spacebar key, **Then** the answer toggles between hidden and revealed states (except in quiz mode)

---

### User Story 3 - Track Learning Progress and Mastery (Priority: P1)

A user can mark questions as "mastered" to track their learning progress. The system automatically tracks which questions they've viewed and provides visual indicators of their overall progress across all questions.

**Why this priority**: Progress tracking is essential for sustained learning. Users need to see their advancement to stay motivated and identify knowledge gaps.

**Independent Test**: Can be fully tested by viewing several questions, marking some as mastered, returning to the homepage, and verifying the progress bar accurately reflects the viewed and mastered counts.

**Acceptance Scenarios**:

1. **Given** a user views any question, **When** they click "Mark as Mastered", **Then** the button changes to "Mastered" with a success color and checkmark icon
2. **Given** a question is marked as mastered, **When** the user clicks "Mastered" again, **Then** the status reverts to unmarked
3. **Given** a user has viewed and mastered various questions, **When** they view the homepage, **Then** the progress bar shows correct percentages for overall progress and mastery, along with counts for not-seen, seen, and mastered questions
4. **Given** a user views a question for the first time, **When** the page loads, **Then** the system automatically records it as "seen" in progress tracking

---

### User Story 4 - Organize Favorite Questions (Priority: P2)

A user can mark specific questions as favorites for quick access later. Favorited questions can be filtered to create a personalized study list.

**Why this priority**: Favoriting enables users to create personalized study plans by flagging questions they find particularly challenging or important.

**Independent Test**: Can be fully tested by marking several questions as favorites, applying the favorites filter on the homepage, and verifying only favorited questions appear.

**Acceptance Scenarios**:

1. **Given** a user views any question, **When** they click the "Favorite" button, **Then** the button changes to "Favorited" with a filled heart icon and error color
2. **Given** a question is favorited, **When** the user clicks "Favorited" again, **Then** the favorite status is removed
3. **Given** a user has favorited multiple questions, **When** they enable the "show only favorites" filter on the homepage, **Then** only favorited questions are displayed in the list

---

### User Story 5 - Advanced Search and Filtering (Priority: P2)

A user can search questions by title or tags, filter by difficulty levels, filter by progress status (not-seen, seen, mastered), and filter by favorites. Multiple filters can be combined, and the URL updates to reflect the active filters for sharing or bookmarking.

**Why this priority**: As the question library grows, users need powerful discovery tools to find specific topics and focus their study sessions effectively.

**Independent Test**: Can be fully tested by applying various combinations of search terms, difficulty filters, tag filters, and status filters, then verifying the displayed questions match all active criteria and the URL query parameters reflect the filters.

**Acceptance Scenarios**:

1. **Given** a user types "closure" in the search bar, **When** the search is performed, **Then** only questions with "closure" in the title or tags are displayed (case-insensitive, accent-insensitive)
2. **Given** a user clicks on an "easy" difficulty stat card, **When** the filter is applied, **Then** only easy questions are shown and the card has a visual highlight ring
3. **Given** multiple filters are active, **When** the user views the filters section, **Then** a badge shows the count of active filters
4. **Given** no questions match the active filters, **When** the results section renders, **Then** the user sees a "no results" message with an option to reset all filters
5. **Given** a user has applied filters, **When** they click "Réinitialiser les filtres", **Then** all filters are cleared and all questions are displayed again
6. **Given** a user applies specific filters, **When** the filters update, **Then** the browser URL updates with corresponding query parameters

---

### User Story 6 - Quiz Mode with Timer (Priority: P3)

A user can enable quiz mode to test themselves under time pressure. In quiz mode, questions auto-reveal after 30 seconds, and keyboard shortcuts are disabled to prevent accidental reveals.

**Why this priority**: Quiz mode adds a gamification element and helps users simulate interview time pressure, but the core learning experience works without it.

**Independent Test**: Can be fully tested by enabling quiz mode, viewing a question, verifying the countdown timer appears, waiting for auto-reveal, and confirming keyboard shortcuts are disabled.

**Acceptance Scenarios**:

1. **Given** quiz mode is enabled, **When** a user views a question, **Then** a countdown timer badge is displayed showing remaining seconds until auto-reveal
2. **Given** quiz mode is active with a running timer, **When** the timer reaches zero, **Then** the answer automatically reveals
3. **Given** quiz mode is enabled, **When** the user presses the Spacebar key, **Then** nothing happens (keyboard shortcut is disabled)
4. **Given** a user manually reveals an answer in quiz mode, **When** they click the reveal button, **Then** the answer shows immediately and the timer stops

---

### User Story 7 - Bilingual Support (FR/EN) (Priority: P2)

A user can switch between French and English languages. The interface labels and content are translated, with French as the default language. Language preference persists across sessions.

**Why this priority**: Bilingual support makes the application accessible to a broader audience, particularly important for international developers.

**Independent Test**: Can be fully tested by switching the language using the language switcher component and verifying all UI labels and question content update to the selected language.

**Acceptance Scenarios**:

1. **Given** a French-speaking user visits the site, **When** the homepage loads, **Then** all interface text is in French and questions are loaded from the French content collection
2. **Given** a user clicks the language switcher, **When** they select English, **Then** the interface switches to English and questions are loaded from the English content collection
3. **Given** a user is on a specific question page in French, **When** they switch to English, **Then** they remain on the equivalent question page but with English content
4. **Given** a user switches to English, **When** they view the URL, **Then** it includes the `/en` prefix

---

### User Story 8 - Dark Mode Support (Priority: P3)

A user can toggle between light and dark color schemes. The preference is saved and applied automatically on subsequent visits.

**Why this priority**: Dark mode improves user experience in low-light conditions and is a standard expectation for modern web applications, but doesn't affect core learning functionality.

**Independent Test**: Can be fully tested by clicking the color mode toggle button and verifying all UI elements switch to the dark theme with appropriate colors and contrast.

**Acceptance Scenarios**:

1. **Given** a user is viewing the site in light mode, **When** they click the color mode button, **Then** the entire interface switches to dark mode with appropriate dark background colors and light text
2. **Given** a user has selected dark mode, **When** they close and reopen the browser, **Then** dark mode is still active

---

### Edge Cases

- **What happens when localStorage is full or unavailable?** System continues to function but progress, favorites, and reveal state are not persisted. User sees default state on each visit.
- **How does the system handle malformed content markdown files?** Nuxt Content provides error boundaries. Missing frontmatter fields fall back to defaults (e.g., difficulty defaults to 'easy').
- **What happens when a user's browser doesn't support required features?** Progressive enhancement ensures core functionality works. Advanced features like animations degrade gracefully.
- **How does the system handle race conditions when switching locales rapidly?** The useAsyncData composable with locale watcher ensures data refetching is debounced and the latest locale is used.
- **What happens if URL query parameters are manually edited to invalid values?** Filters validate input types. Invalid parameters are ignored, and valid defaults are applied.
- **How does the system handle questions with identical slugs in different categories?** The routing structure `/[category]/[slug]` prevents collisions. Each category has its own namespace.

## Requirements _(mandatory)_

### Functional Requirements

#### Content Management & Display

- **FR-001**: System MUST load interview questions from Nuxt Content markdown files organized in category-based folders (javascript, html, css)
- **FR-002**: System MUST support bilingual content with separate content collections for French (`content_fr`) and English (`content_en`)
- **FR-003**: Each question MUST include metadata: id (number), slug (string), title (string), category (string), difficulty (easy/medium/hard), and tags (array of strings)
- **FR-004**: System MUST render question content in a `question` slot and answer content in an `answer` slot using markdown formatting with code syntax highlighting
- **FR-005**: System MUST display questions sorted by numerical ID in ascending order

#### Navigation & Routing

- **FR-006**: System MUST provide a homepage route (`/` or `/en`) displaying all available questions
- **FR-007**: System MUST provide category routes (`/[category]` or `/en/[category]`) displaying category-filtered questions
- **FR-008**: System MUST provide individual question routes (`/[category]/[slug]` or `/en/[category]/[slug]`) displaying full question details
- **FR-009**: System MUST support language prefix routing with French as default (no prefix) and English requiring `/en` prefix
- **FR-010**: System MUST preserve the current question context when switching languages by navigating to the equivalent localized URL

#### Interactive Learning Features

- **FR-011**: System MUST initially hide answer content on question pages and provide a "Voir la réponse" button to reveal it
- **FR-012**: System MUST animate the answer reveal/hide transition smoothly over 300ms
- **FR-013**: System MUST scroll the answer section into view after reveal animation completes
- **FR-014**: System MUST allow users to toggle answer visibility using the Spacebar keyboard shortcut (except in quiz mode)
- **FR-015**: System MUST track the time elapsed from page load to first answer reveal in milliseconds
- **FR-016**: System MUST track the total count of answer reveals for each question
- **FR-017**: System MUST display reveal statistics (reveal count and time to first reveal) when available

#### Progress Tracking

- **FR-018**: System MUST automatically mark a question as "seen" when a user views its detail page for the first time
- **FR-019**: System MUST allow users to manually mark questions as "mastered" via a button in the question card footer
- **FR-020**: System MUST allow users to unmark mastered questions by clicking the "Mastered" button again
- **FR-021**: System MUST track the last viewed timestamp for each question
- **FR-022**: System MUST track the view count for each question
- **FR-023**: System MUST calculate and display overall progress percentage (viewed + mastered) / total questions \* 100
- **FR-024**: System MUST calculate and display mastery percentage (mastered / total questions \* 100)
- **FR-025**: System MUST display categorized counts: not-seen, seen, and mastered questions
- **FR-026**: System MUST persist progress data in localStorage with key `question-progress`

#### Favorites Management

- **FR-027**: System MUST allow users to mark any question as a favorite via a heart button in the question card footer
- **FR-028**: System MUST allow users to remove favorite status by clicking the favorited button again
- **FR-029**: System MUST persist favorites data in localStorage with key `question-favorites`
- **FR-030**: System MUST provide a filter to show only favorited questions

#### Search & Filtering

- **FR-031**: System MUST provide a search input that filters questions by title and tags (case-insensitive, accent-insensitive)
- **FR-032**: System MUST allow users to filter questions by difficulty level (easy, medium, hard) with multi-select support
- **FR-033**: System MUST allow users to filter questions by tags with multi-select support
- **FR-034**: System MUST allow users to filter questions by progress status (all, not-seen, seen, mastered)
- **FR-035**: System MUST allow users to filter questions to show only favorites
- **FR-036**: System MUST combine all active filters with AND logic
- **FR-037**: System MUST update browser URL query parameters to reflect active filters
- **FR-038**: System MUST initialize filters from URL query parameters on page load
- **FR-039**: System MUST provide difficulty filter toggles via clickable stat cards in the stats section
- **FR-040**: System MUST display a badge showing the count of active filters
- **FR-041**: System MUST provide a "reset filters" button to clear all active filters
- **FR-042**: System MUST display a "no results" message with a reset option when no questions match active filters

#### Quiz Mode

- **FR-043**: System MUST provide a quiz mode toggle that can be enabled/disabled globally
- **FR-044**: System MUST display a countdown timer (30 seconds) when viewing a question in quiz mode
- **FR-045**: System MUST automatically reveal the answer when the quiz timer reaches zero
- **FR-046**: System MUST disable keyboard shortcuts (Spacebar) when quiz mode is active
- **FR-047**: System MUST stop the quiz timer if the user manually reveals the answer

#### Internationalization (i18n)

- **FR-048**: System MUST support French and English languages
- **FR-049**: System MUST use French as the default language with no URL prefix
- **FR-050**: System MUST use `/en` prefix for all English routes
- **FR-051**: System MUST provide a language switcher component accessible from all pages
- **FR-052**: System MUST persist language preference across navigation
- **FR-053**: System MUST translate all UI labels, buttons, and static text based on selected locale
- **FR-054**: System MUST fetch content from the appropriate locale-specific content collection

#### Visual & UI Features

- **FR-055**: System MUST provide light and dark color mode support
- **FR-056**: System MUST provide a color mode toggle button accessible from the header
- **FR-057**: System MUST persist color mode preference in localStorage
- **FR-058**: System MUST display difficulty badges with color coding: easy (green/success), medium (yellow/warning), hard (red/error)
- **FR-059**: System MUST display tag badges for each question (maximum 3 tags on list views)
- **FR-060**: System MUST display a progress bar component showing overall progress and mastery with visual bars and percentage labels
- **FR-061**: System MUST provide hover effects on question cards (shadow lift and scale transform)
- **FR-062**: System MUST display a hero section on the homepage with branding, tagline, and primary CTA buttons
- **FR-063**: System MUST provide a sticky header with logo, language switcher, and color mode button

#### Statistics & Analytics

- **FR-064**: System MUST display total question count
- **FR-065**: System MUST display question counts by difficulty level (easy, medium, hard)
- **FR-066**: System MUST display reveal statistics including total reveals, questions revealed count, and average time to reveal
- **FR-067**: System MUST calculate average time to first reveal across all revealed questions in seconds

#### Data Persistence

- **FR-068**: System MUST store all user data (progress, favorites, reveal state) in browser localStorage
- **FR-069**: System MUST sync localStorage data with reactive state on every state mutation
- **FR-070**: System MUST initialize reactive state from localStorage on application mount (client-side only)
- **FR-071**: System MUST handle localStorage unavailability gracefully by using in-memory state only

### Non-Functional Requirements

- **NFR-001**: System MUST render initial page content on the server (SSR enabled) for SEO and performance
- **NFR-002**: System MUST pre-render all question pages at build time for GitHub Pages deployment
- **NFR-003**: System MUST support deployment to GitHub Pages with base URL `/interview-training/`
- **NFR-004**: System MUST load and display the homepage in under 3 seconds on 3G connections
- **NFR-005**: System MUST be fully responsive and functional on mobile devices (320px width minimum)
- **NFR-006**: System MUST meet WCAG 2.1 AA contrast ratios in both light and dark modes
- **NFR-007**: System MUST support modern evergreen browsers (Chrome, Firefox, Safari, Edge) with last 2 versions
- **NFR-008**: System MUST follow TypeScript strict mode with no `any` types unless explicitly justified
- **NFR-009**: System MUST use Composition API with script setup syntax for all Vue components
- **NFR-010**: System MUST auto-discover all routes for prerendering via crawlLinks configuration

### Key Entities

- **Question**: Represents a single interview question with metadata
  - Attributes: id (number), slug (string), title (string), category (string), difficulty (easy/medium/hard), tags (string array), question content (markdown), answer content (markdown)
  - Relationships: Belongs to a category, has many tags

- **Progress Record**: Represents a user's progress on a specific question
  - Attributes: questionId (string), status (not-seen/seen/mastered), lastViewed (timestamp), viewCount (number)
  - Relationships: Belongs to one question

- **Favorite Record**: Represents a user's favorite status for a question
  - Attributes: questionId (string), isFavorite (boolean)
  - Relationships: Belongs to one question

- **Reveal State**: Represents answer reveal tracking for a question
  - Attributes: questionId (string), revealed (boolean), timeToReveal (milliseconds), revealCount (number)
  - Relationships: Belongs to one question

- **Filter State**: Represents active search and filter criteria
  - Attributes: searchQuery (string), selectedDifficulties (array), selectedTags (array), selectedStatus (enum), showOnlyFavorites (boolean)
  - Relationships: None (UI state only)

- **Quiz Mode State**: Represents global quiz mode settings
  - Attributes: mode (standard/quiz), timerDuration (seconds)
  - Relationships: None (global UI state)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can browse and view any of the 26+ available interview questions within 5 seconds of landing on the homepage
- **SC-002**: Users can complete the full interaction cycle (view question → reveal answer → mark as mastered) for a single question in under 20 seconds
- **SC-003**: Users can successfully filter the question list using any combination of difficulty, tags, status, and favorites, with results updating in under 500ms
- **SC-004**: Users can search for questions by keyword and see matching results displayed within 300ms of typing (debounced)
- **SC-005**: The progress tracking system accurately reflects user interactions with 100% consistency across page refreshes (when localStorage is available)
- **SC-006**: Users can switch between French and English languages with all UI text and question content updating within 1 second
- **SC-007**: The application loads and renders the initial homepage view in under 2 seconds on 4G connections
- **SC-008**: All 26+ question pages are pre-rendered as static HTML during build and load without requiring additional API calls
- **SC-009**: The application functions correctly on mobile devices with screen widths as small as 320px
- **SC-010**: Users can navigate the entire application using keyboard shortcuts and tab navigation for accessibility
- **SC-011**: The favorite system allows users to curate a personal study list of any size without performance degradation
- **SC-012**: Quiz mode timer accurately counts down from 30 seconds and auto-reveals answers within 100ms of reaching zero
- **SC-013**: The reveal statistics accurately track time-to-reveal with millisecond precision
- **SC-014**: The application maintains responsive performance with no perceptible lag when filtering up to 100 questions
- **SC-015**: Dark mode toggle switches the entire interface within 200ms with no visual flashing or layout shifts

### Technical Success Metrics

- **SC-016**: Static site generation produces HTML files for all routes with zero build errors
- **SC-017**: Lighthouse performance score of 90+ for the homepage
- **SC-018**: Lighthouse accessibility score of 95+ for all pages
- **SC-019**: Total page bundle size under 500KB (gzipped) for the homepage
- **SC-020**: Zero TypeScript compilation errors in strict mode

## Assumptions

1. **Content Structure**: All question content is authored in markdown format following a consistent frontmatter schema
2. **Browser Support**: Users are accessing the application via modern browsers with localStorage support (fallback to in-memory state for unsupported browsers)
3. **Deployment**: The application is deployed to GitHub Pages under the `/interview-training/` base URL path
4. **Content Updates**: New questions can be added by creating new markdown files in the appropriate content directory without code changes
5. **User Privacy**: All user data (progress, favorites, preferences) is stored locally in the browser and never transmitted to servers
6. **Language Parity**: English and French content collections contain equivalent questions with matching IDs and slugs
7. **Static Deployment**: The application is fully static after build with no server-side API requirements
8. **Single User Context**: The application is designed for individual users; no multi-user or account system is required
9. **Content Integrity**: Question IDs are sequential and unique across the entire content collection
10. **Performance**: Users have reasonable internet connections (3G minimum) and modern devices capable of running Vue 3 applications

## Technical Architecture Context

While this specification avoids implementation details, the following high-level architectural patterns are relevant for understanding the feature boundaries:

- **Content as Code**: All question content is version-controlled markdown files, enabling easy content updates through git workflows
- **Static Site Generation**: The application generates static HTML at build time for all routes, eliminating runtime API calls for content
- **Client-Side State Management**: User-specific data (progress, favorites) is managed entirely in the browser using reactive state patterns
- **Internationalization Strategy**: Content and UI translations are separated into distinct collections/files, enabling independent localization updates
- **Component-Based Architecture**: The UI is composed of reusable components (QuestionCard, ProgressBar, SearchBar, etc.) that encapsulate specific behaviors
- **Composable Logic Pattern**: Shared state and behaviors (favorites, progress, filters) are extracted into reusable functions that can be imported by any component

## Dependencies

- **External Services**: None required (fully self-contained static site)
- **Third-Party Content**: All questions are authored and maintained within the project repository
- **Browser APIs**: localStorage (with graceful fallback), IntersectionObserver (for scroll effects), History API (for URL updates)
- **Deployment Platform**: GitHub Pages for static hosting and deployment automation

## Out of Scope

The following features are explicitly **not included** in the current implementation:

- User authentication or account system
- Backend API or database
- Social sharing to external platforms (Twitter, Facebook, etc.)
- Exporting progress data to external formats (PDF, CSV)
- Question submission or contribution workflow for users
- Commenting or discussion features on questions
- Spaced repetition algorithm or intelligent question scheduling
- Multiple study modes beyond standard and quiz mode
- Question recommendations based on learning patterns
- Team or collaborative study features
- Real-time synchronization across devices
- Analytics or usage tracking beyond local statistics
- Question versioning or change history
- Advanced markdown features (diagrams, interactive demos)
- Print-optimized layouts for question sets
- Integration with external learning management systems (LMS)
- Mobile native applications (iOS/Android)
- Progressive Web App (PWA) installation prompts
- Offline-first functionality with service workers
- Audio/video question content
- AI-powered answer evaluation
- Timed full mock interview sessions
- Certification or achievement badges
