/**
 * Vitest setup file
 * This file runs before all tests
 */

import { vi } from 'vitest'
import { ref, watch, computed, nextTick } from 'vue'
import { setupLocalStorageMock } from './utils/mockLocalStorage'

// Setup global mocks
setupLocalStorageMock()

// Mock Nuxt's useState composable
// This creates a simple state store that persists across calls within a test
const stateStore = new Map()

global.useState = vi.fn((key: string, init?: () => unknown) => {
  if (!stateStore.has(key)) {
    const initialValue = typeof init === 'function' ? init() : init ?? null
    stateStore.set(key, ref(initialValue))
  }
  return stateStore.get(key)
})

// Mock import.meta.client (Nuxt 4 global)
// @ts-expect-error - Mocking Nuxt global
import.meta.client = true

// Fallback for process.client (legacy)
global.process = global.process || {}
// @ts-expect-error - Mocking Nuxt global
global.process.client = true

// Make Vue composables globally available (auto-import behavior in Nuxt)
// @ts-expect-error - Mocking Nuxt auto-imports
global.watch = watch
// @ts-expect-error - Mocking Nuxt auto-imports
global.ref = ref
// @ts-expect-error - Mocking Nuxt auto-imports
global.computed = computed
// @ts-expect-error - Mocking Nuxt auto-imports
global.nextTick = nextTick

// Reset state between tests
beforeEach(() => {
  stateStore.clear()
})

// Mock console methods to avoid noise in tests (optional)
// vi.spyOn(console, 'warn').mockImplementation(() => {})
// vi.spyOn(console, 'error').mockImplementation(() => {})
