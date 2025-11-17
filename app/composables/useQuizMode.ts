export type QuizModeType = 'study' | 'quiz'

export interface QuizAnswer {
  questionId: string
  correct: boolean
  timestamp: number
}

export interface QuizSession {
  mode: QuizModeType
  startedAt: number
  questionIds: string[]
  currentIndex: number
  answers: QuizAnswer[]
}

/**
 * Composable to manage quiz mode across the app
 * Uses Nuxt's useState for shared state + localStorage for mode persistence
 */
export const useQuizMode = () => {
  // Shared mode state (singleton via useState)
  const mode = useState<QuizModeType>('quiz-mode', () => {
    // Initialize from localStorage on first load (client-side only)
    if (process.client) {
      const stored = localStorage.getItem('quiz-mode')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          return parsed === 'quiz' ? 'quiz' : 'study'
        } catch {
          return 'study'
        }
      }
    }
    return 'study'
  })

  // Sync mode to localStorage on changes (client-side only)
  if (process.client) {
    watch(mode, (newValue) => {
      try {
        localStorage.setItem('quiz-mode', JSON.stringify(newValue))
      } catch {
        // Silently fail in private/incognito mode or when storage is full
      }
    })
  }

  // Current quiz session (shared but not persisted to localStorage)
  const currentSession = useState<QuizSession | null>('quiz-session', () => null)

  // Toggle between study and quiz mode
  const toggleMode = () => {
    mode.value = mode.value === 'study' ? 'quiz' : 'study'
    // Clear session when switching modes
    if (mode.value === 'study') {
      currentSession.value = null
    }
  }

  // Set mode explicitly
  const setMode = (newMode: QuizModeType) => {
    mode.value = newMode
    if (newMode === 'study') {
      currentSession.value = null
    }
  }

  // Start a new quiz session
  const startQuiz = (questionIds: string[]) => {
    // Shuffle questions
    const shuffled = [...questionIds].sort(() => Math.random() - 0.5)

    currentSession.value = {
      mode: 'quiz',
      startedAt: Date.now(),
      questionIds: shuffled,
      currentIndex: 0,
      answers: [],
    }

    mode.value = 'quiz'
  }

  // Record an answer
  const recordAnswer = (questionId: string, correct: boolean) => {
    if (!currentSession.value) return

    currentSession.value.answers.push({
      questionId,
      correct,
      timestamp: Date.now(),
    })
  }

  // Move to next question
  const nextQuestion = () => {
    if (!currentSession.value) return
    if (currentSession.value.currentIndex < currentSession.value.questionIds.length - 1) {
      currentSession.value.currentIndex++
    }
  }

  // Move to previous question
  const previousQuestion = () => {
    if (!currentSession.value) return
    if (currentSession.value.currentIndex > 0) {
      currentSession.value.currentIndex--
    }
  }

  // Get current question ID
  const getCurrentQuestionId = computed(() => {
    if (!currentSession.value) return null
    return currentSession.value.questionIds[currentSession.value.currentIndex]
  })

  // Check if there's a next question
  const hasNext = computed(() => {
    if (!currentSession.value) return false
    return currentSession.value.currentIndex < currentSession.value.questionIds.length - 1
  })

  // Check if there's a previous question
  const hasPrevious = computed(() => {
    if (!currentSession.value) return false
    return currentSession.value.currentIndex > 0
  })

  // Get quiz progress
  const getProgress = computed(() => {
    if (!currentSession.value) return { current: 0, total: 0 }
    return {
      current: currentSession.value.currentIndex + 1,
      total: currentSession.value.questionIds.length,
    }
  })

  // Get quiz results
  const getResults = computed(() => {
    if (!currentSession.value) return null

    const { answers } = currentSession.value
    const total = answers.length
    const correct = answers.filter((a) => a.correct).length
    const incorrect = total - correct
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    return {
      total,
      correct,
      incorrect,
      percentage,
      duration: Date.now() - currentSession.value.startedAt,
    }
  })

  // Check if quiz is complete
  const isQuizComplete = computed(() => {
    if (!currentSession.value) return false
    return currentSession.value.answers.length === currentSession.value.questionIds.length
  })

  // End quiz and get final results
  const endQuiz = () => {
    const results = getResults.value
    currentSession.value = null
    mode.value = 'study'
    return results
  }

  // Reset quiz session
  const resetQuiz = () => {
    currentSession.value = null
  }

  return {
    mode,
    currentSession,
    toggleMode,
    setMode,
    startQuiz,
    recordAnswer,
    nextQuestion,
    previousQuestion,
    getCurrentQuestionId,
    hasNext,
    hasPrevious,
    getProgress,
    getResults,
    isQuizComplete,
    endQuiz,
    resetQuiz,
  }
}
