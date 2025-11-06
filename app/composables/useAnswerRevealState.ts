export interface RevealStateData {
  revealed: boolean
  revealedAt?: number
  revealCount: number
  timeToReveal?: number // Time taken before first reveal
}

export interface RevealStatsState {
  [questionId: string]: RevealStateData
}

/**
 * Composable to manage answer reveal state with persistence
 * Tracks when answers are revealed and provides statistics
 */
export const useAnswerRevealState = () => {
  // Shared state via Nuxt useState
  const revealState = useState<RevealStatsState>('answer-reveal-state', () => {
    // Initialize from localStorage on first load (client-side only)
    if (process.client) {
      const stored = localStorage.getItem('answer-reveal-state')
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

  // Sync to localStorage on changes (client-side only)
  if (process.client) {
    watch(revealState, (newValue) => {
      localStorage.setItem('answer-reveal-state', JSON.stringify(newValue))
    }, { deep: true })
  }

  // Get reveal state for a question
  const getRevealState = (questionId: string): RevealStateData => {
    return revealState.value[questionId] || {
      revealed: false,
      revealCount: 0
    }
  }

  // Mark answer as revealed
  const markRevealed = (questionId: string, timeToReveal?: number) => {
    const current = getRevealState(questionId)
    revealState.value[questionId] = {
      revealed: true,
      revealedAt: Date.now(),
      revealCount: current.revealCount + 1,
      timeToReveal: timeToReveal || current.timeToReveal
    }
  }

  // Mark answer as hidden
  const markHidden = (questionId: string) => {
    const current = getRevealState(questionId)
    if (current) {
      revealState.value[questionId] = {
        ...current,
        revealed: false
      }
    }
  }

  // Reset reveal state for a question
  const resetRevealState = (questionId: string) => {
    delete revealState.value[questionId]
  }

  // Get global statistics
  const getGlobalStats = () => {
    const allStates = Object.values(revealState.value)
    const totalReveals = allStates.reduce((sum, state) => sum + state.revealCount, 0)
    const questionsRevealed = allStates.filter(s => s.revealCount > 0).length

    const timesToReveal = allStates
      .filter(s => s.timeToReveal !== undefined)
      .map(s => s.timeToReveal!)

    const avgTimeToReveal = timesToReveal.length > 0
      ? timesToReveal.reduce((sum, time) => sum + time, 0) / timesToReveal.length
      : 0

    return {
      totalReveals,
      questionsRevealed,
      avgTimeToReveal: Math.round(avgTimeToReveal / 1000) // Convert to seconds
    }
  }

  return {
    revealState,
    getRevealState,
    markRevealed,
    markHidden,
    resetRevealState,
    getGlobalStats
  }
}
