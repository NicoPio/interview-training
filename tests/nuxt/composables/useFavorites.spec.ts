import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useFavorites } from '~/app/composables/useFavorites'
import { setupLocalStorageMock, clearLocalStorageMock } from '../../utils/mockLocalStorage'

describe('useFavorites', () => {
  beforeEach(() => {
    setupLocalStorageMock()
  })

  afterEach(() => {
    clearLocalStorageMock()
  })

  it('should initialize with empty favorites', () => {
    const { getFavoriteIds, getFavoriteCount } = useFavorites()
    expect(getFavoriteIds.value).toEqual([])
    expect(getFavoriteCount.value).toBe(0)
  })

  it('should add a favorite', () => {
    const { addFavorite, isFavorite, getFavoriteCount } = useFavorites()
    addFavorite('1')
    expect(isFavorite('1')).toBe(true)
    expect(getFavoriteCount.value).toBe(1)
  })

  it('should remove a favorite', () => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    addFavorite('1')
    expect(isFavorite('1')).toBe(true)
    removeFavorite('1')
    expect(isFavorite('1')).toBe(false)
  })

  it('should toggle favorite status', () => {
    const { toggleFavorite, isFavorite } = useFavorites()
    expect(isFavorite('1')).toBe(false)
    toggleFavorite('1')
    expect(isFavorite('1')).toBe(true)
    toggleFavorite('1')
    expect(isFavorite('1')).toBe(false)
  })

  it('should get all favorite IDs', () => {
    const { addFavorite, getFavoriteIds } = useFavorites()
    addFavorite('1')
    addFavorite('2')
    addFavorite('3')
    expect(getFavoriteIds.value).toEqual(['1', '2', '3'])
  })

  it('should clear all favorites', () => {
    const { addFavorite, clearAllFavorites, getFavoriteCount } = useFavorites()
    addFavorite('1')
    addFavorite('2')
    expect(getFavoriteCount.value).toBe(2)
    clearAllFavorites()
    expect(getFavoriteCount.value).toBe(0)
  })

  it('should persist to localStorage', async () => {
    const { addFavorite } = useFavorites()
    addFavorite('1')

    // Wait for watch to execute
    await nextTick()

    const stored = localStorage.getItem('question-favorites')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed['1']).toBe(true)
  })
})
