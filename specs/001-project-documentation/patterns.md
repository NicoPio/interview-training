# Composable Patterns - JS Interview Prep

This document outlines the state management patterns used in the application.

## useState Pattern

All composables use Nuxt's `useState` for singleton shared state:

```typescript
const state = useState<StateType>('unique-key', () => initialValue)
```

### Key Principles

1. **Singleton State**: Each composable manages a single domain of state
2. **localStorage Sync**: State is persisted and restored from browser storage
3. **SSR-Safe**: `process.client` guards for browser-only APIs
4. **Type-Safe**: Full TypeScript inference for state and methods

## Implemented Composables

### useFavorites

**Purpose**: Manage question favorites with localStorage persistence

**State**: `FavoritesState` - Map of questionId to boolean
**Storage Key**: `'question-favorites'`

**Methods**:

- `isFavorite(questionId)` - Check if question is favorited
- `toggleFavorite(questionId)` - Toggle favorite status
- `addFavorite(questionId)` - Add to favorites
- `removeFavorite(questionId)` - Remove from favorites
- `getFavoriteIds` - Get all favorite question IDs (computed)
- `getFavoriteCount` - Get total favorites count (computed)
- `clearAllFavorites()` - Clear all favorites

**Pattern**:

```typescript
const favoritesState = useState<FavoritesState>('question-favorites', () => {
  if (process.client) {
    const stored = localStorage.getItem('question-favorites')
    return stored ? JSON.parse(stored) : {}
  }
  return {}
})

watch(
  favoritesState,
  (newValue) => {
    if (process.client) {
      localStorage.setItem('question-favorites', JSON.stringify(newValue))
    }
  },
  { deep: true }
)
```

---

### useQuestionProgress

**Purpose**: Track viewing and mastery status for questions

**State**: `QuestionProgressState` - Map of questionId to ProgressRecord
**Storage Key**: `'question-progress'`

**State Transitions**:

```
not-seen (default) → seen → mastered ↔ seen
```

**Methods**:

- `getProgress(questionId)` - Get progress record for question
- `markAsSeen(questionId)` - Mark as seen (auto-called on page view)
- `markAsMastered(questionId)` - Mark as mastered
- `markAsNotMastered(questionId)` - Revert to seen
- `resetProgress(questionId)` - Reset single question
- `resetAllProgress()` - Reset all progress
- `getStats()` - Get statistics (total, seen, mastered)
- `getProgressPercentage(total)` - Calculate progress %
- `getMasteryPercentage(total)` - Calculate mastery %

**ProgressRecord Schema**:

```typescript
{
  status: 'not-seen' | 'seen' | 'mastered'
  lastViewed?: number  // Unix timestamp
  viewCount: number    // Increments on each view
}
```

---

### useAnswerRevealState

**Purpose**: Track answer reveal interactions and timing

**State**: `AnswerRevealState` - Map of questionId to RevealState
**Storage Key**: `'question-reveal-state'`

**Methods**:

- `getRevealState(questionId)` - Get reveal state for question
- `markRevealed(questionId, timeToReveal)` - Mark answer as revealed
- `markHidden(questionId)` - Mark answer as hidden
- `getGlobalStats()` - Get global reveal statistics

**RevealState Schema**:

```typescript
{
  revealed: boolean
  timeToReveal: number | null // Milliseconds from load to first reveal
  revealCount: number // Total reveals for this question
}
```

**Metrics**:

- `totalReveals` - Sum of all reveal counts
- `questionsRevealed` - Count of questions with revealCount > 0
- `avgTimeToReveal` - Average time to first reveal (seconds)

---

### useQuestionFilters

**Purpose**: Multi-criteria filtering for question list

**State**: In-memory reactive refs (no persistence)

**Filter Types**:

- `searchQuery` - Text search (title/tags, accent-insensitive)
- `selectedDifficulties` - Array of difficulty levels
- `selectedTags` - Array of tags
- `selectedStatus` - Progress status filter
- `showOnlyFavorites` - Boolean filter

**Methods**:

- `filterQuestions(questions)` - Apply all active filters
- `getAllUniqueTags(questions)` - Get available tags
- `getActiveFiltersCount()` - Count active filters
- `resetFilters()` - Clear all filters
- `toggleDifficultyFilter(difficulty)` - Toggle difficulty

**URL Synchronization**:

```typescript
watch([filters...], () => {
  router.replace({ query: buildQueryParams() })
})
```

**Filter Logic**: Combined with AND logic across filter types

---

### useQuizMode

**Purpose**: Global quiz mode state

**State**: `QuizModeState` - Mode and timer settings
**Storage**: No persistence (session-only)

**Methods**:

- `toggleMode()` - Switch between standard and quiz
- `isQuizMode()` - Check if quiz mode is active

**Quiz Behavior**:

- 30-second countdown timer
- Auto-reveal on timer expiration
- Keyboard shortcuts disabled

---

## Common Patterns

### localStorage Sync Pattern

All persistent composables follow this pattern:

```typescript
// 1. Initialize from localStorage
const state = useState('key', () => {
  if (process.client) {
    const stored = localStorage.getItem('key')
    return stored ? JSON.parse(stored) : defaultValue
  }
  return defaultValue
})

// 2. Watch and sync changes
if (process.client) {
  watch(
    state,
    (newValue) => {
      localStorage.setItem('key', JSON.stringify(newValue))
    },
    { deep: true }
  )
}
```

### SSR-Safe Guards

Always guard browser APIs:

```typescript
if (process.client) {
  // Browser-only code
}
```

### Type Safety

Always type state and return values:

```typescript
const state = useState<StateType>('key', () => initialValue)

function method(): ReturnType {
  // ...
}
```

---

## Error Handling

### localStorage Unavailability

All composables gracefully handle localStorage errors:

```typescript
try {
  localStorage.setItem(key, value)
} catch (error) {
  // Silently fail, continue with in-memory state
}
```

### Fallback Values

All getters return sensible defaults:

```typescript
const getProgress = (id: string) => {
  return (
    state.value[id] || {
      status: 'not-seen',
      viewCount: 0,
    }
  )
}
```

---

## Testing Patterns

### Mock localStorage

```typescript
import { setupLocalStorageMock } from '~/tests/utils/mockLocalStorage'

beforeEach(() => {
  setupLocalStorageMock()
})
```

### Test State Transitions

```typescript
const { markAsSeen, markAsMastered, getProgress } = useQuestionProgress()
markAsSeen('1')
expect(getProgress('1').status).toBe('seen')
markAsMastered('1')
expect(getProgress('1').status).toBe('mastered')
```

---

## Best Practices

1. ✅ Use `useState` for shared state
2. ✅ Guard browser APIs with `process.client`
3. ✅ Sync to localStorage via `watch`
4. ✅ Provide sensible defaults
5. ✅ Type everything with TypeScript
6. ✅ Handle localStorage errors gracefully
7. ✅ Use deep watchers for object/array state
8. ✅ Initialize from localStorage on mount
9. ✅ Clear separation of concerns (one composable per domain)
10. ✅ Computed properties for derived state
