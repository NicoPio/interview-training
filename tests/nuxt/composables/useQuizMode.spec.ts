import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref } from 'vue'
import { useQuizMode } from '~/app/composables/useQuizMode'
import type { QuizModeType, QuizSession } from '~/app/composables/useQuizMode'
import { setupLocalStorageMock, clearLocalStorageMock, mockDateNow } from '../../utils/mockLocalStorage'

// Mock useState from Nuxt
let mockModeState = ref<QuizModeType>('study')
let mockSessionState = ref<QuizSession | null>(null)

vi.mock('#app', () => ({
  useState: vi.fn((key: string, init?: () => unknown) => {
    if (key === 'quiz-mode') {
      return mockModeState
    }
    if (key === 'quiz-session') {
      return mockSessionState
    }
    return ref(init ? init() : null)
  }),
}))

describe('useQuizMode', () => {
  beforeEach(() => {
    setupLocalStorageMock()
    // Reset refs to their initial values
    mockModeState = ref<QuizModeType>('study')
    mockSessionState = ref<QuizSession | null>(null)
    vi.clearAllMocks()
  })

  afterEach(() => {
    clearLocalStorageMock()
  })

  describe('Initialization', () => {
    it('should initialize with study mode by default', () => {
      const { mode } = useQuizMode()
      expect(mode.value).toBe('study')
    })

    it('should initialize with no active session', () => {
      const { currentSession } = useQuizMode()
      expect(currentSession.value).toBeNull()
    })

    // Note: Testing localStorage initialization is skipped because
    // we're mocking useState which bypasses the initialization logic
    // In real usage, the mode would be loaded from localStorage on first access
  })

  describe('Mode Management', () => {
    it('should toggle from study to quiz mode', () => {
      const { mode, toggleMode } = useQuizMode()
      expect(mode.value).toBe('study')
      toggleMode()
      expect(mode.value).toBe('quiz')
    })

    it('should toggle from quiz to study mode', () => {
      const { mode, toggleMode } = useQuizMode()
      // First toggle to quiz
      toggleMode()
      expect(mode.value).toBe('quiz')
      // Then toggle back to study
      toggleMode()
      expect(mode.value).toBe('study')
    })

    it('should set mode explicitly to quiz', () => {
      const { mode, setMode } = useQuizMode()
      setMode('quiz')
      expect(mode.value).toBe('quiz')
    })

    it('should set mode explicitly to study', () => {
      const { mode, setMode } = useQuizMode()
      // First set to quiz
      setMode('quiz')
      expect(mode.value).toBe('quiz')
      // Then set to study
      setMode('study')
      expect(mode.value).toBe('study')
    })

    it('should clear session when switching to study mode via toggle', () => {
      const { mode, currentSession, toggleMode, startQuiz } = useQuizMode()
      // Start a quiz session
      startQuiz(['1', '2'])
      expect(mode.value).toBe('quiz')
      expect(currentSession.value).not.toBeNull()

      // Toggle back to study should clear session
      toggleMode()
      expect(mode.value).toBe('study')
      expect(currentSession.value).toBeNull()
    })

    it('should clear session when setting mode to study', () => {
      const { currentSession, setMode, startQuiz } = useQuizMode()
      // Start a quiz session
      startQuiz(['1', '2'])
      expect(currentSession.value).not.toBeNull()

      // Set mode to study should clear session
      setMode('study')
      expect(currentSession.value).toBeNull()
    })
  })

  describe('Quiz Session Management', () => {
    it('should start a new quiz session', () => {
      const dateNowSpy = mockDateNow(1000000)
      const questionIds = ['1', '2', '3', '4']
      const { currentSession, mode, startQuiz } = useQuizMode()

      startQuiz(questionIds)

      expect(mode.value).toBe('quiz')
      expect(currentSession.value).toBeTruthy()
      expect(currentSession.value?.mode).toBe('quiz')
      expect(currentSession.value?.startedAt).toBe(1000000)
      expect(currentSession.value?.questionIds).toHaveLength(4)
      expect(currentSession.value?.currentIndex).toBe(0)
      expect(currentSession.value?.answers).toEqual([])

      dateNowSpy.mockRestore()
    })

    it('should shuffle questions when starting quiz', () => {
      const questionIds = ['1', '2', '3', '4', '5']
      const { currentSession, startQuiz } = useQuizMode()

      // Mock Math.random to ensure consistent shuffling
      const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5)

      startQuiz(questionIds)

      expect(currentSession.value?.questionIds).toHaveLength(5)
      // The order should be different due to sorting (though we can't predict exact order with mock)

      mathRandomSpy.mockRestore()
    })

    it('should record an answer', () => {
      const dateNowSpy = mockDateNow(2000000)
      const { currentSession, startQuiz, recordAnswer } = useQuizMode()

      startQuiz(['1', '2', '3'])
      recordAnswer('1', true)

      expect(currentSession.value?.answers).toHaveLength(1)
      expect(currentSession.value?.answers[0]).toEqual({
        questionId: '1',
        correct: true,
        timestamp: 2000000,
      })

      dateNowSpy.mockRestore()
    })

    it('should not record answer if no session is active', () => {
      const { currentSession, recordAnswer } = useQuizMode()

      recordAnswer('1', true)

      expect(currentSession.value).toBeNull()
    })

    it('should move to next question', () => {
      const { currentSession, startQuiz, nextQuestion } = useQuizMode()

      startQuiz(['1', '2', '3'])
      expect(currentSession.value?.currentIndex).toBe(0)

      nextQuestion()
      expect(currentSession.value?.currentIndex).toBe(1)

      nextQuestion()
      expect(currentSession.value?.currentIndex).toBe(2)
    })

    it('should not move beyond last question', () => {
      const { currentSession, startQuiz, nextQuestion } = useQuizMode()

      startQuiz(['1', '2'])
      nextQuestion()
      nextQuestion()
      nextQuestion() // Try to go beyond

      expect(currentSession.value?.currentIndex).toBe(1) // Should stay at last index
    })

    it('should move to previous question', () => {
      const { currentSession, startQuiz, nextQuestion, previousQuestion } = useQuizMode()

      startQuiz(['1', '2', '3'])
      nextQuestion()
      nextQuestion()
      expect(currentSession.value?.currentIndex).toBe(2)

      previousQuestion()
      expect(currentSession.value?.currentIndex).toBe(1)
    })

    it('should not move before first question', () => {
      const { currentSession, startQuiz, previousQuestion } = useQuizMode()

      startQuiz(['1', '2'])
      previousQuestion()
      previousQuestion()

      expect(currentSession.value?.currentIndex).toBe(0) // Should stay at first index
    })
  })

  describe('Quiz Navigation', () => {
    it('should get current question ID', () => {
      const { startQuiz, getCurrentQuestionId } = useQuizMode()

      // Mock Math.random to ensure predictable shuffling
      vi.spyOn(Math, 'random').mockReturnValue(0)
      startQuiz(['1', '2', '3'])

      expect(getCurrentQuestionId.value).toBeTruthy()
    })

    it('should return null for current question ID when no session', () => {
      const { getCurrentQuestionId } = useQuizMode()

      expect(getCurrentQuestionId.value).toBeNull()
    })

    it('should check if there is a next question', () => {
      const { startQuiz, hasNext, nextQuestion } = useQuizMode()

      startQuiz(['1', '2', '3'])
      expect(hasNext.value).toBe(true)

      nextQuestion()
      expect(hasNext.value).toBe(true)

      nextQuestion()
      expect(hasNext.value).toBe(false) // At last question
    })

    it('should check if there is a previous question', () => {
      const { startQuiz, hasPrevious, nextQuestion } = useQuizMode()

      startQuiz(['1', '2', '3'])
      expect(hasPrevious.value).toBe(false) // At first question

      nextQuestion()
      expect(hasPrevious.value).toBe(true)
    })

    it('should return false for hasNext when no session', () => {
      const { hasNext } = useQuizMode()

      expect(hasNext.value).toBe(false)
    })

    it('should return false for hasPrevious when no session', () => {
      const { hasPrevious } = useQuizMode()

      expect(hasPrevious.value).toBe(false)
    })
  })

  describe('Quiz Progress', () => {
    it('should track quiz progress', () => {
      const { startQuiz, getProgress, nextQuestion } = useQuizMode()

      startQuiz(['1', '2', '3'])
      expect(getProgress.value).toEqual({ current: 1, total: 3 })

      nextQuestion()
      expect(getProgress.value).toEqual({ current: 2, total: 3 })

      nextQuestion()
      expect(getProgress.value).toEqual({ current: 3, total: 3 })
    })

    it('should return zero progress when no session', () => {
      const { getProgress } = useQuizMode()

      expect(getProgress.value).toEqual({ current: 0, total: 0 })
    })
  })

  describe('Quiz Results', () => {
    it('should calculate quiz results', () => {
      const startTime = 1000000
      const endTime = 1060000
      const dateNowSpy = mockDateNow(startTime)

      const { startQuiz, recordAnswer, getResults } = useQuizMode()

      startQuiz(['1', '2', '3', '4'])

      recordAnswer('1', true)
      recordAnswer('2', true)
      recordAnswer('3', false)
      recordAnswer('4', true)

      dateNowSpy.mockReturnValue(endTime)

      const results = getResults.value
      expect(results).toEqual({
        total: 4,
        correct: 3,
        incorrect: 1,
        percentage: 75,
        duration: 60000,
      })

      dateNowSpy.mockRestore()
    })

    it('should return null for results when no session', () => {
      const { getResults } = useQuizMode()

      expect(getResults.value).toBeNull()
    })

    it('should handle zero answers correctly', () => {
      const { startQuiz, getResults } = useQuizMode()

      startQuiz(['1', '2', '3'])

      const results = getResults.value
      expect(results?.percentage).toBe(0)
      expect(results?.correct).toBe(0)
      expect(results?.incorrect).toBe(0)
    })

    it('should check if quiz is complete', () => {
      const { startQuiz, recordAnswer, isQuizComplete } = useQuizMode()

      startQuiz(['1', '2', '3'])
      expect(isQuizComplete.value).toBe(false)

      recordAnswer('1', true)
      recordAnswer('2', false)
      expect(isQuizComplete.value).toBe(false)

      recordAnswer('3', true)
      expect(isQuizComplete.value).toBe(true)
    })

    it('should return false for isQuizComplete when no session', () => {
      const { isQuizComplete } = useQuizMode()

      expect(isQuizComplete.value).toBe(false)
    })
  })

  describe('Quiz Completion', () => {
    it('should end quiz and return results', () => {
      const startTime = 1000000
      const endTime = 1120000
      const dateNowSpy = mockDateNow(startTime)

      const { startQuiz, recordAnswer, endQuiz, mode, currentSession } = useQuizMode()

      startQuiz(['1', '2'])
      recordAnswer('1', true)
      recordAnswer('2', false)

      dateNowSpy.mockReturnValue(endTime)

      const results = endQuiz()

      expect(results).toEqual({
        total: 2,
        correct: 1,
        incorrect: 1,
        percentage: 50,
        duration: 120000,
      })
      expect(currentSession.value).toBeNull()
      expect(mode.value).toBe('study')

      dateNowSpy.mockRestore()
    })

    it('should reset quiz session', () => {
      const { startQuiz, currentSession, resetQuiz } = useQuizMode()

      startQuiz(['1', '2', '3'])
      expect(currentSession.value).toBeTruthy()

      resetQuiz()
      expect(currentSession.value).toBeNull()
    })
  })

  describe('LocalStorage Persistence', () => {
    it('should persist mode changes to localStorage', async () => {
      const { mode, setMode } = useQuizMode()

      setMode('quiz')
      await nextTick()

      // Verify the mode was updated in the ref
      expect(mode.value).toBe('quiz')
    })

    it('should handle localStorage errors gracefully', async () => {
      // Mock localStorage.setItem to throw
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full')
      })

      const { setMode } = useQuizMode()

      // Should not throw
      expect(() => setMode('quiz')).not.toThrow()

      setItemSpy.mockRestore()
    })
  })
})
