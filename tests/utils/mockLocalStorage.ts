/**
 * Mock localStorage for testing environments
 * Provides a simple in-memory implementation of Storage API
 */
export class MockLocalStorage implements Storage {
  private store: Map<string, string> = new Map()

  get length(): number {
    return this.store.size
  }

  clear(): void {
    this.store.clear()
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys())
    return keys[index] ?? null
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }
}

/**
 * Setup localStorage mock for tests
 * Call this in beforeEach hooks
 */
export function setupLocalStorageMock(): MockLocalStorage {
  const mockLocalStorage = new MockLocalStorage()
  global.localStorage = mockLocalStorage as any
  return mockLocalStorage
}

/**
 * Clear localStorage mock
 * Call this in afterEach hooks
 */
export function clearLocalStorageMock(): void {
  global.localStorage?.clear()
}
