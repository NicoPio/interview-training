export interface FavoritesState {
  [questionId: string]: boolean
}

/**
 * Composable to manage question favorites across the app
 * Uses Nuxt's useState for shared state + localStorage for persistence
 */
export const useFavorites = () => {
  // Shared reactive state (singleton via useState)
  const favoritesState = useState<FavoritesState>('question-favorites', () => {
    // Initialize from localStorage on first load (client-side only)
    if (process.client) {
      const stored = localStorage.getItem('question-favorites')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          return {}
        }
      }
    }
    return {}
  })

  // Sync state to localStorage on changes (client-side only)
  if (process.client) {
    watch(favoritesState, (newValue) => {
      try {
        localStorage.setItem('question-favorites', JSON.stringify(newValue))
      } catch {
        // Silently fail in private/incognito mode or when storage is full
      }
    }, { deep: true })
  }

  // Check if a question is favorited
  const isFavorite = (questionId: string): boolean => {
    return favoritesState.value[questionId] === true
  }

  // Toggle favorite status
  const toggleFavorite = (questionId: string) => {
    if (favoritesState.value[questionId]) {
      const { [questionId]: _, ...rest } = favoritesState.value
      favoritesState.value = rest
    } else {
      favoritesState.value[questionId] = true
    }
  }

  // Add to favorites
  const addFavorite = (questionId: string) => {
    favoritesState.value[questionId] = true
  }

  // Remove from favorites
  const removeFavorite = (questionId: string) => {
    const { [questionId]: _, ...rest } = favoritesState.value
    favoritesState.value = rest
  }

  // Get all favorite question IDs
  const getFavoriteIds = computed(() => {
    return Object.keys(favoritesState.value).filter(id => favoritesState.value[id])
  })

  // Get count of favorites
  const getFavoriteCount = computed(() => {
    return getFavoriteIds.value.length
  })

  // Clear all favorites
  const clearAllFavorites = () => {
    favoritesState.value = {}
  }

  return {
    favoritesState,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    getFavoriteIds,
    getFavoriteCount,
    clearAllFavorites
  }
}
