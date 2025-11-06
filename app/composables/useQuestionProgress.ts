export type ProgressStatus = 'not-seen' | 'seen' | 'mastered'

export interface QuestionProgressData {
  status: ProgressStatus
  lastViewed?: number
  viewCount: number
}

export interface QuestionProgressState {
  [questionId: string]: QuestionProgressData
}

/**
 * Composable to manage question progress across the app
 * Uses Nuxt's useState for shared state + localStorage for persistence
 */
export const useQuestionProgress = () => {
  // Shared reactive state (singleton via useState)
  const progressState = useState<QuestionProgressState>('question-progress', () => {
    // Initialize from localStorage on first load (client-side only)
    if (process.client) {
      const stored = localStorage.getItem('question-progress')
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
    watch(progressState, (newValue) => {
      localStorage.setItem('question-progress', JSON.stringify(newValue))
    }, { deep: true })
  }

  // Get progress for a specific question
  const getProgress = (questionId: string): QuestionProgressData => {
    return progressState.value[questionId] || {
      status: 'not-seen',
      viewCount: 0
    }
  }

  // Mark question as seen
  const markAsSeen = (questionId: string) => {
    const current = getProgress(questionId)
    progressState.value[questionId] = {
      ...current,
      status: current.status === 'not-seen' ? 'seen' : current.status,
      lastViewed: Date.now(),
      viewCount: current.viewCount + 1
    }
  }

  // Mark question as mastered
  const markAsMastered = (questionId: string) => {
    const current = getProgress(questionId)
    progressState.value[questionId] = {
      ...current,
      status: 'mastered',
      lastViewed: Date.now(),
      viewCount: current.viewCount
    }
  }

  // Mark question as not mastered (back to seen)
  const markAsNotMastered = (questionId: string) => {
    const current = getProgress(questionId)
    progressState.value[questionId] = {
      ...current,
      status: 'seen',
      lastViewed: Date.now(),
      viewCount: current.viewCount
    }
  }

  // Reset progress for a question
  const resetProgress = (questionId: string) => {
    delete progressState.value[questionId]
  }

  // Reset all progress
  const resetAllProgress = () => {
    progressState.value = {}
  }

  // Get statistics
  const getStats = () => {
    const allProgress = Object.values(progressState.value)
    return {
      total: allProgress.length,
      seen: allProgress.filter(p => p.status === 'seen').length,
      mastered: allProgress.filter(p => p.status === 'mastered').length,
      notSeen: 0 // This needs to be calculated with total questions count
    }
  }

  // Get progress percentage (requires total questions count)
  const getProgressPercentage = (totalQuestions: number) => {
    const stats = getStats()
    if (totalQuestions === 0) return 0
    return Math.round(((stats.seen + stats.mastered) / totalQuestions) * 100)
  }

  // Get mastery percentage
  const getMasteryPercentage = (totalQuestions: number) => {
    const stats = getStats()
    if (totalQuestions === 0) return 0
    return Math.round((stats.mastered / totalQuestions) * 100)
  }

  return {
    progressState,
    getProgress,
    markAsSeen,
    markAsMastered,
    markAsNotMastered,
    resetProgress,
    resetAllProgress,
    getStats,
    getProgressPercentage,
    getMasteryPercentage
  }
}
