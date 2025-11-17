# Data Model: JS Interview Prep

**Feature**: JS Interview Prep - Complete Application Documentation
**Date**: 2025-11-13
**Purpose**: Document the data structures, relationships, and state management patterns used in the application

## Overview

The JS Interview Prep application uses a **client-side only** data architecture with three primary data storage mechanisms:

1. **Static Content**: Markdown files in `content/` directory (read-only)
2. **localStorage**: Browser-based persistence for user data
3. **In-Memory State**: Reactive Vue state managed via composables

All user data (progress, favorites, preferences) is stored **locally** in the browser with no backend API or database.

---

## Entity Definitions

### 1. Question (Static Content)

**Source**: Markdown files in `content/{locale}/{category}/`

**Structure**:

```typescript
interface Question {
  // Metadata (from YAML frontmatter)
  id: number // Unique sequential identifier (1, 2, 3, ...)
  slug: string // URL-friendly identifier (e.g., "primitive-detection")
  title: string // Display title in French or English
  category: string // Category slug (e.g., "javascript", "html", "css")
  difficulty: 'easy' | 'medium' | 'hard' // Difficulty level
  tags: string[] // Array of topic tags (e.g., ["closures", "scope"])

  // Content (from markdown body)
  question: string // Question content (markdown)
  answer: string // Answer content (markdown)

  // Computed (by Nuxt Content)
  _path: string // Full path (e.g., "/fr/javascript/q001-...")
  body: object // Parsed markdown AST
}
```

**Validation Rules**:

- `id` MUST be a positive integer
- `id` MUST be unique across all questions
- `slug` MUST be kebab-case and URL-safe
- `slug` MUST be unique within a category
- `title` MUST be non-empty
- `category` MUST match a valid category slug
- `difficulty` MUST be one of: 'easy', 'medium', 'hard' (defaults to 'easy')
- `tags` MUST be an array (can be empty)
- Question and answer content MUST be valid markdown

**Relationships**:

- Belongs to one **Category** (via `category` field)
- Has many **Tags** (via `tags` array)
- Has one **ProgressRecord** (via `id` in localStorage)
- Has one **FavoriteRecord** (via `id` in localStorage)
- Has one **RevealState** (via `id` in localStorage)

**Example**:

```yaml
---
id: 1
slug: primitive-detection
title: 'Comment détecter les types de valeurs primitives ou non-primitives en JavaScript ?'
category: javascript
difficulty: medium
tags: ['primitifs', 'types', 'variables']
---
# Question content here...

# Answer content here...
```

---

### 2. ProgressRecord (localStorage)

**Storage Key**: `question-progress`

**Purpose**: Track which questions a user has viewed and mastered

**Structure**:

```typescript
interface ProgressRecord {
  questionId: string // Question ID as string (e.g., "1", "2", "3")
  status: ProgressStatus // Current progress status
  lastViewed: number // Unix timestamp of last view (milliseconds)
  viewCount: number // Total number of times viewed
}

type ProgressStatus = 'not-seen' | 'seen' | 'mastered'
```

**State Transitions**:

```
not-seen (default)
    ↓ (user views question)
  seen
    ↓ (user clicks "Mark as Mastered")
mastered
    ↓ (user clicks "Mastered" again)
  seen
```

**Validation Rules**:

- `questionId` MUST be a string representation of a valid question ID
- `status` MUST be one of: 'not-seen', 'seen', 'mastered'
- `lastViewed` MUST be a valid Unix timestamp (milliseconds) or undefined
- `viewCount` MUST be a non-negative integer (defaults to 0)

**Storage Format**:

```typescript
// localStorage['question-progress']
type QuestionProgressState = {
  [questionId: string]: ProgressRecord
}

// Example:
{
  "1": {
    "status": "mastered",
    "lastViewed": 1699564800000,
    "viewCount": 5
  },
  "2": {
    "status": "seen",
    "lastViewed": 1699478400000,
    "viewCount": 2
  }
}
```

**Business Logic**:

- **Auto-mark as seen**: When a user views a question detail page for the first time
- **Manual mastery**: User explicitly marks a question as mastered
- **Toggle mastery**: Clicking "Mastered" again reverts to "seen"
- **View counter**: Increments on every page view

**Relationships**:

- Belongs to one **Question** (via `questionId`)
- One-to-one relationship (each question has at most one progress record)

---

### 3. FavoriteRecord (localStorage)

**Storage Key**: `question-favorites`

**Purpose**: Track which questions a user has favorited

**Structure**:

```typescript
interface FavoriteRecord {
  questionId: string // Question ID as string
  isFavorite: boolean // True if favorited, omitted if not
}
```

**Validation Rules**:

- `questionId` MUST be a string representation of a valid question ID
- If present in the map, the value MUST be `true`
- If not favorited, the key is omitted from the map (not set to `false`)

**Storage Format**:

```typescript
// localStorage['question-favorites']
type FavoritesState = {
  [questionId: string]: true   // Only favorited questions present
}

// Example:
{
  "1": true,
  "5": true,
  "12": true
}
```

**Business Logic**:

- **Add favorite**: Set `favorites[questionId] = true`
- **Remove favorite**: Delete `favorites[questionId]` from map
- **Toggle**: Add if absent, remove if present
- **Check favorite**: `questionId in favorites`

**Relationships**:

- Belongs to one **Question** (via `questionId`)
- One-to-one relationship (each question has at most one favorite record)

---

### 4. RevealState (localStorage)

**Storage Key**: `question-reveal-state`

**Purpose**: Track answer reveal interactions and timing metrics

**Structure**:

```typescript
interface RevealState {
  questionId: string // Question ID as string
  revealed: boolean // Current reveal state (true = visible)
  timeToReveal: number | null // Milliseconds from page load to first reveal
  revealCount: number // Total number of times answer was revealed
}
```

**Validation Rules**:

- `questionId` MUST be a string representation of a valid question ID
- `revealed` MUST be a boolean (defaults to false)
- `timeToReveal` MUST be a positive number (milliseconds) or null
- `timeToReveal` is set on first reveal and never changes
- `revealCount` MUST be a non-negative integer (defaults to 0)

**Storage Format**:

```typescript
// localStorage['question-reveal-state']
type AnswerRevealState = {
  [questionId: string]: RevealState
}

// Example:
{
  "1": {
    "revealed": true,
    "timeToReveal": 8234,     // User took 8.234 seconds to first reveal
    "revealCount": 3
  },
  "2": {
    "revealed": false,
    "timeToReveal": null,
    "revealCount": 0
  }
}
```

**Business Logic**:

- **First reveal**: Record `timeToReveal = Date.now() - pageLoadTime`, increment `revealCount`
- **Subsequent reveals**: Only increment `revealCount`, `timeToReveal` unchanged
- **Hide answer**: Set `revealed = false`
- **Statistics**: Calculate average time-to-reveal across all questions

**Metrics Computed**:

```typescript
interface GlobalRevealStats {
  totalReveals: number // Sum of all revealCounts
  questionsRevealed: number // Count of questions with revealCount > 0
  avgTimeToReveal: number // Average timeToReveal in seconds (rounded)
}
```

**Relationships**:

- Belongs to one **Question** (via `questionId`)
- One-to-one relationship (each question has at most one reveal state)

---

### 5. FilterState (In-Memory)

**Storage**: Vue reactive state (not persisted)

**Purpose**: Track active search and filter criteria

**Structure**:

```typescript
interface FilterState {
  searchQuery: string // Search text (title/tags)
  selectedDifficulties: DifficultyLevel[] // Selected difficulty filters
  selectedTags: string[] // Selected tag filters
  selectedStatus: FilterStatus // Progress status filter
  showOnlyFavorites: boolean // Favorites-only filter
}

type DifficultyLevel = 'easy' | 'medium' | 'hard'
type FilterStatus = 'all' | 'not-seen' | 'seen' | 'mastered'
```

**Validation Rules**:

- `searchQuery` can be any string (empty = no filter)
- `selectedDifficulties` MUST be an array of valid difficulty levels
- `selectedTags` MUST be an array of strings
- `selectedStatus` MUST be one of: 'all', 'not-seen', 'seen', 'mastered'
- `showOnlyFavorites` MUST be a boolean

**Business Logic**:

- **Search**: Case-insensitive, accent-insensitive matching on title and tags
- **Multiple difficulties**: OR logic (match any selected difficulty)
- **Multiple tags**: OR logic (match any selected tag)
- **Status filter**: Match exact status
- **Favorites filter**: Only show favorited questions
- **Combined filters**: AND logic across different filter types

**URL Synchronization**:

Filters are synchronized to URL query parameters:

```
?search=closure
&difficulty=medium,hard
&tags=scope,functions
&status=seen
&favorites=true
```

**Relationships**:

- UI state only (no direct entity relationships)
- Used to filter **Question** arrays in memory

---

### 6. QuizModeState (In-Memory)

**Storage**: Vue reactive state (not persisted)

**Purpose**: Track quiz mode settings

**Structure**:

```typescript
interface QuizModeState {
  mode: QuizMode // Current mode
  timerDuration: number // Timer duration in seconds
}

type QuizMode = 'standard' | 'quiz'
```

**Validation Rules**:

- `mode` MUST be one of: 'standard', 'quiz'
- `timerDuration` MUST be a positive integer (defaults to 30)

**Business Logic**:

- **Standard mode**: No timer, keyboard shortcuts enabled
- **Quiz mode**: 30-second countdown timer, keyboard shortcuts disabled
- **Auto-reveal**: Answer automatically reveals when timer reaches 0
- **Manual reveal**: User can reveal before timer expires (stops timer)

**Relationships**:

- Global UI state (no entity relationships)
- Affects behavior of **QuestionCard** component

---

## State Management Architecture

### Composables (Reactive State)

Each data domain is managed by a dedicated composable:

#### useFavorites()

**State**: `useState<FavoritesState>('question-favorites')`

**Methods**:

- `isFavorite(questionId: string): boolean`
- `toggleFavorite(questionId: string): void`
- `addFavorite(questionId: string): void`
- `removeFavorite(questionId: string): void`
- `getFavoriteIds: ComputedRef<string[]>`
- `getFavoriteCount: ComputedRef<number>`
- `clearAllFavorites(): void`

**Persistence**: Auto-sync to `localStorage['question-favorites']`

---

#### useQuestionProgress()

**State**: `useState<QuestionProgressState>('question-progress')`

**Methods**:

- `getProgress(questionId: string): ProgressRecord`
- `markAsSeen(questionId: string): void`
- `markAsMastered(questionId: string): void`
- `markAsNotMastered(questionId: string): void`
- `resetProgress(questionId: string): void`
- `resetAllProgress(): void`
- `getStats(): { total, seen, mastered, notSeen }`
- `getProgressPercentage(totalQuestions: number): number`
- `getMasteryPercentage(totalQuestions: number): number`

**Persistence**: Auto-sync to `localStorage['question-progress']`

---

#### useAnswerRevealState()

**State**: `useState<AnswerRevealState>('question-reveal-state')`

**Methods**:

- `getRevealState(questionId: string): RevealState`
- `markRevealed(questionId: string, timeToReveal: number): void`
- `markHidden(questionId: string): void`
- `getGlobalStats(): GlobalRevealStats`

**Persistence**: Auto-sync to `localStorage['question-reveal-state']`

---

#### useQuestionFilters()

**State**: Reactive refs (no persistence)

**Methods**:

- `filterQuestions(questions: Question[]): Question[]`
- `getAllUniqueTags(questions: Question[]): string[]`
- `getActiveFiltersCount(): number`
- `resetFilters(): void`
- `toggleDifficultyFilter(difficulty: DifficultyLevel): void`

**URL Sync**: Filters synchronized to URL query parameters via Vue Router

---

#### useQuizMode()

**State**: `useState<QuizModeState>('quiz-mode')`

**Methods**:

- `toggleMode(): void`
- `isQuizMode(): boolean`

**Persistence**: None (session-only state)

---

## Data Flow Diagrams

### Question Browsing Flow

```
User visits homepage
    ↓
Nuxt Content fetches questions from markdown files
    ↓
Questions rendered in list view
    ↓
User clicks question card
    ↓
Navigate to /[category]/[slug]
    ↓
Question detail page loads
    ↓
markAsSeen() called (updates localStorage)
    ↓
Progress state synced to UI
```

### Answer Reveal Flow

```
User views question page
    ↓
Page load timestamp recorded
    ↓
User clicks "Voir la réponse"
    ↓
Calculate timeToReveal = now - pageLoadTime
    ↓
markRevealed(questionId, timeToReveal)
    ↓
Update RevealState in localStorage
    ↓
Answer animates into view (300ms transition)
    ↓
Scroll to answer section
```

### Filter Application Flow

```
User updates filter (search, difficulty, tag, status, favorites)
    ↓
Filter state updated in memory
    ↓
URL query parameters updated via router.replace()
    ↓
filterQuestions() recomputes filtered list
    ↓
UI re-renders with filtered questions
```

### localStorage Sync Flow

```
User interacts with UI (favorite, mark as mastered, reveal answer)
    ↓
Composable method called (e.g., toggleFavorite())
    ↓
Update reactive state (useState)
    ↓
watch() detects state change
    ↓
JSON.stringify(state) → localStorage.setItem()
    ↓
State persisted in browser
```

---

## Data Integrity & Constraints

### Referential Integrity

**Question IDs**:

- All localStorage records reference question IDs
- If a question is deleted from content, orphaned records remain in localStorage (no cleanup)
- When loading, invalid question IDs are silently ignored (no errors)

**Category Consistency**:

- Questions must exist in matching category directory
- Category in frontmatter must match directory name
- Nuxt Content enforces this via file structure

### Unique Constraints

- **Question.id**: Globally unique across all categories
- **Question.slug**: Unique within a category
- **ProgressRecord.questionId**: One record per question
- **FavoriteRecord.questionId**: One record per question
- **RevealState.questionId**: One record per question

### Default Values

- **Question.difficulty**: 'easy' if not specified
- **Question.tags**: `[]` if not specified
- **ProgressRecord.status**: 'not-seen' if record doesn't exist
- **ProgressRecord.viewCount**: 0 if record doesn't exist
- **FavoriteRecord.isFavorite**: `false` if not in map
- **RevealState.revealed**: `false` if record doesn't exist
- **RevealState.timeToReveal**: `null` until first reveal
- **RevealState.revealCount**: 0 if record doesn't exist

---

## Data Migration & Versioning

### Current Version

**localStorage Schema Version**: 1.0 (implicit, no version field)

### Future Considerations

If schema changes are needed:

1. Add `schemaVersion` field to localStorage data
2. Implement migration functions in composables
3. Detect old schema on load and migrate automatically
4. Example:

```typescript
function migrateProgressData(data: unknown): QuestionProgressState {
  if (!data.schemaVersion || data.schemaVersion < 2) {
    // Migrate from v1 to v2
    // Add new fields, transform old data, etc.
  }
  return data as QuestionProgressState
}
```

### Backward Compatibility

Current implementation has no versioning. Future changes should:

- Maintain backward compatibility with existing localStorage data
- Gracefully handle missing fields
- Never break existing user data

---

## Privacy & Security

### No Server-Side Storage

**Privacy Benefits**:

- No user data leaves the browser
- No tracking or analytics on user progress
- No account system or authentication required
- GDPR-compliant (no PII collected or processed)

**Security Considerations**:

- XSS attacks could access localStorage (mitigated by CSP headers)
- User data vulnerable if device is compromised
- No encryption of localStorage data (browser responsibility)

### Data Export/Import

**Current State**: Not implemented

**Future Enhancement**: Allow users to export/import localStorage data as JSON for backup or device transfer

---

## Performance Considerations

### localStorage Access

- **Read**: On composable initialization (once per page load)
- **Write**: On every state mutation (throttled by Vue's reactivity)
- **Size**: Small datasets (~1-10 KB for typical usage)
- **Performance**: localStorage access is synchronous and fast for small data

### In-Memory Filtering

- **Current scale**: ~26 questions
- **Performance**: Client-side filtering is instant
- **Future scale**: Should handle 1000+ questions without issues
- **Optimization**: Virtual scrolling could be added if needed

### Question Content

- **Storage**: Embedded in static HTML at build time
- **Size**: ~5-10 KB per question (markdown + metadata)
- **Loading**: Instant (no API calls)
- **Caching**: Aggressive browser caching via content hashes

---

## Testing Considerations

### Unit Testing Data Models

```typescript
// Example: Testing ProgressRecord state transitions
describe('useQuestionProgress', () => {
  it('marks question as seen when viewed', () => {
    const { markAsSeen, getProgress } = useQuestionProgress()
    markAsSeen('1')
    expect(getProgress('1').status).toBe('seen')
  })

  it('transitions from seen to mastered', () => {
    const { markAsSeen, markAsMastered, getProgress } = useQuestionProgress()
    markAsSeen('1')
    markAsMastered('1')
    expect(getProgress('1').status).toBe('mastered')
  })

  it('toggles mastery back to seen', () => {
    const { markAsMastered, markAsNotMastered, getProgress } = useQuestionProgress()
    markAsMastered('1')
    markAsNotMastered('1')
    expect(getProgress('1').status).toBe('seen')
  })
})
```

### Integration Testing

```typescript
// Example: Testing localStorage persistence
describe('Favorites persistence', () => {
  it('persists favorites to localStorage', () => {
    const { toggleFavorite } = useFavorites()
    toggleFavorite('1')
    const stored = JSON.parse(localStorage.getItem('question-favorites'))
    expect(stored['1']).toBe(true)
  })

  it('restores favorites from localStorage on mount', () => {
    localStorage.setItem('question-favorites', JSON.stringify({ '1': true }))
    const { isFavorite } = useFavorites()
    expect(isFavorite('1')).toBe(true)
  })
})
```

---

## Conclusion

The data model for JS Interview Prep is **simple, type-safe, and client-centric**:

✅ **Static content** (markdown) for questions
✅ **localStorage** for user data persistence
✅ **Composables** for state management
✅ **No backend** dependencies
✅ **Type-safe** interfaces with TypeScript
✅ **Reactive** state with Vue 3

This architecture provides:

- **Privacy**: No user data transmitted to servers
- **Performance**: Instant data access from localStorage
- **Simplicity**: No database or API complexity
- **Scalability**: Can handle 1000+ questions without changes
- **Maintainability**: Clear separation of concerns via composables

The data model is **production-ready** and aligns perfectly with the static-first, privacy-focused design of the application.
