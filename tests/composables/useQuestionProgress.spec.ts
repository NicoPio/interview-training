import { describe, it, expect, beforeEach } from 'vitest'
import { useQuestionProgress } from '~/app/composables/useQuestionProgress'
import { setupLocalStorageMock, clearLocalStorageMock } from '../utils/mockLocalStorage'

describe('useQuestionProgress', () => {
  beforeEach(() => {
    setupLocalStorageMock()
  })

  afterEach(() => {
    clearLocalStorageMock()
  })

  it('should return not-seen status by default', () => {
    const { getProgress } = useQuestionProgress()
    const progress = getProgress('1')
    expect(progress.status).toBe('not-seen')
    expect(progress.viewCount).toBe(0)
  })

  it('should mark question as seen', () => {
    const { markAsSeen, getProgress } = useQuestionProgress()
    markAsSeen('1')
    const progress = getProgress('1')
    expect(progress.status).toBe('seen')
    expect(progress.viewCount).toBe(1)
    expect(progress.lastViewed).toBeTruthy()
  })

  it('should mark question as mastered', () => {
    const { markAsSeen, markAsMastered, getProgress } = useQuestionProgress()
    markAsSeen('1')
    markAsMastered('1')
    expect(getProgress('1').status).toBe('mastered')
  })

  it('should toggle mastery status', () => {
    const { markAsMastered, markAsNotMastered, getProgress } = useQuestionProgress()
    markAsMastered('1')
    expect(getProgress('1').status).toBe('mastered')
    markAsNotMastered('1')
    expect(getProgress('1').status).toBe('seen')
  })

  it('should increment view count on each seen', () => {
    const { markAsSeen, getProgress } = useQuestionProgress()
    markAsSeen('1')
    expect(getProgress('1').viewCount).toBe(1)
    markAsSeen('1')
    expect(getProgress('1').viewCount).toBe(2)
  })

  it('should calculate statistics correctly', () => {
    const { markAsSeen, markAsMastered, getStats } = useQuestionProgress()
    markAsSeen('1')
    markAsSeen('2')
    markAsMastered('3')

    const stats = getStats()
    expect(stats.seen).toBe(2)
    expect(stats.mastered).toBe(1)
    expect(stats.total).toBe(3)
  })

  it('should calculate progress percentage', () => {
    const { markAsSeen, markAsMastered, getProgressPercentage } = useQuestionProgress()
    markAsSeen('1')
    markAsMastered('2')

    const percentage = getProgressPercentage(10)
    expect(percentage).toBe(20) // 2 out of 10 = 20%
  })

  it('should calculate mastery percentage', () => {
    const { markAsMastered, getMasteryPercentage } = useQuestionProgress()
    markAsMastered('1')
    markAsMastered('2')

    const percentage = getMasteryPercentage(10)
    expect(percentage).toBe(20) // 2 out of 10 = 20%
  })

  it('should reset progress for a question', () => {
    const { markAsMastered, resetProgress, getProgress } = useQuestionProgress()
    markAsMastered('1')
    expect(getProgress('1').status).toBe('mastered')
    resetProgress('1')
    expect(getProgress('1').status).toBe('not-seen')
  })

  it('should reset all progress', () => {
    const { markAsSeen, markAsMastered, resetAllProgress, getStats } = useQuestionProgress()
    markAsSeen('1')
    markAsMastered('2')
    expect(getStats().total).toBe(2)
    resetAllProgress()
    expect(getStats().total).toBe(0)
  })

  it('should persist to localStorage', () => {
    const { markAsSeen } = useQuestionProgress()
    markAsSeen('1')

    const stored = localStorage.getItem('question-progress')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed['1'].status).toBe('seen')
  })
})
