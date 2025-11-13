import { vi } from 'vitest'

/**
 * Wait for next tick (useful for async updates)
 */
export const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0))

/**
 * Wait for multiple ticks
 */
export const waitFor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mock Date.now() to return a specific timestamp
 */
export function mockDateNow(timestamp: number) {
  const originalDateNow = Date.now
  vi.spyOn(Date, 'now').mockReturnValue(timestamp)
  return () => {
    Date.now = originalDateNow
  }
}

/**
 * Create a mock question object for testing
 */
export function createMockQuestion(overrides?: Partial<Question>) {
  return {
    id: '1',
    slug: 'test-question',
    title: 'Test Question',
    category: 'javascript',
    difficulty: 'easy' as const,
    tags: ['test', 'mock'],
    ...overrides,
  }
}

interface Question {
  id: string
  slug: string
  title: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}
