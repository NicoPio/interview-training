import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAnswerRevealState } from '~/app/composables/useAnswerRevealState'
import { setupLocalStorageMock, clearLocalStorageMock, mockDateNow } from '../utils/mockLocalStorage'

describe('useAnswerRevealState', () => {
  beforeEach(() => {
    setupLocalStorageMock()
  })

  afterEach(() => {
    clearLocalStorageMock()
    vi.restoreAllMocks()
  })

  it('should initialize with default state', () => {
    const { getRevealState } = useAnswerRevealState()
    const state = getRevealState('1')
    expect(state.revealed).toBe(false)
    expect(state.timeToReveal).toBeNull()
    expect(state.revealCount).toBe(0)
  })

  it('should mark answer as revealed', () => {
    const { markRevealed, getRevealState } = useAnswerRevealState()
    markRevealed('1', 5000) // 5 seconds

    const state = getRevealState('1')
    expect(state.revealed).toBe(true)
    expect(state.timeToReveal).toBe(5000)
    expect(state.revealCount).toBe(1)
  })

  it('should increment reveal count on subsequent reveals', () => {
    const { markRevealed, getRevealState } = useAnswerRevealState()
    markRevealed('1', 5000)
    markRevealed('1', 0) // Subsequent reveal

    const state = getRevealState('1')
    expect(state.revealCount).toBe(2)
    expect(state.timeToReveal).toBe(5000) // Time stays the same (first reveal)
  })

  it('should mark answer as hidden', () => {
    const { markRevealed, markHidden, getRevealState } = useAnswerRevealState()
    markRevealed('1', 5000)
    expect(getRevealState('1').revealed).toBe(true)

    markHidden('1')
    expect(getRevealState('1').revealed).toBe(false)
  })

  it('should calculate global statistics', () => {
    const { markRevealed, getGlobalStats } = useAnswerRevealState()
    markRevealed('1', 3000) // 3 seconds
    markRevealed('2', 5000) // 5 seconds
    markRevealed('1', 0) // Reveal #1 again

    const stats = getGlobalStats()
    expect(stats.totalReveals).toBe(3) // 2 + 1
    expect(stats.questionsRevealed).toBe(2)
    expect(stats.avgTimeToReveal).toBe(4) // (3000 + 5000) / 2 / 1000 = 4 seconds
  })

  it('should handle questions with no reveals', () => {
    const { getGlobalStats } = useAnswerRevealState()
    const stats = getGlobalStats()
    expect(stats.totalReveals).toBe(0)
    expect(stats.questionsRevealed).toBe(0)
    expect(stats.avgTimeToReveal).toBe(0)
  })

  it('should persist to localStorage', () => {
    const { markRevealed } = useAnswerRevealState()
    markRevealed('1', 5000)

    const stored = localStorage.getItem('question-reveal-state')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed['1'].revealed).toBe(true)
    expect(parsed['1'].timeToReveal).toBe(5000)
  })
})
