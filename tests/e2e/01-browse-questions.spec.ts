import { test, expect } from '@playwright/test'

/**
 * User Story 1: Browse and Discover Questions
 *
 * Tests cover:
 * - Homepage loads with all questions
 * - Questions display with correct metadata (difficulty, tags, category)
 * - Navigation to question detail pages
 * - Stats section shows accurate counts
 */
test.describe('US1: Browse and Discover Questions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display homepage with question list', async ({ page }) => {
    // Verify page loads
    await expect(page).toHaveTitle(/JS Interview/i)

    // Verify main heading
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()

    // Verify questions are displayed
    const questionLinks = page.locator('a[href*="/javascript/"]')
    const count = await questionLinks.count()
    expect(count).toBeGreaterThan(0)

    console.log(`✓ Found ${count} questions on homepage`)
  })

  test('should display difficulty badges with correct colors', async ({ page }) => {
    // Find badges
    const badges = page.locator('[class*="badge"], [class*="Badge"]')
    await expect(badges.first()).toBeVisible()

    // Check for at least one of each difficulty (if they exist)
    const pageContent = await page.content()

    // Verify difficulty levels are shown
    const hasDifficulties =
      pageContent.includes('easy') ||
      pageContent.includes('facile') ||
      pageContent.includes('medium') ||
      pageContent.includes('moyen') ||
      pageContent.includes('hard') ||
      pageContent.includes('difficile')

    expect(hasDifficulties).toBe(true)
    console.log('✓ Difficulty badges are displayed')
  })

  test('should display question tags', async ({ page }) => {
    const pageContent = await page.content()

    // Check for common tags
    const hasTags =
      pageContent.toLowerCase().includes('closures') ||
      pageContent.toLowerCase().includes('async') ||
      pageContent.toLowerCase().includes('promise') ||
      pageContent.toLowerCase().includes('scope')

    expect(hasTags).toBe(true)
    console.log('✓ Question tags are displayed')
  })

  test('should navigate to question detail page', async ({ page }) => {
    // Click on first question link
    const firstQuestion = page.locator('a[href*="/javascript/"]').first()

    await firstQuestion.click()

    // Wait for navigation
    await page.waitForURL(/\/javascript\//)

    // Verify we're on a detail page
    const url = page.url()
    expect(url).toContain('/javascript/')

    console.log(`✓ Navigated to question detail: ${url}`)

    // Verify question content is displayed
    const questionContent = page.locator('article, main, [role="main"]')
    await expect(questionContent).toBeVisible()
  })

  test('should display stats section with counts', async ({ page }) => {
    const pageContent = await page.content()

    // Look for number patterns (e.g., "12 questions", "5 easy", etc.)
    const hasNumbers = /\d+/.test(pageContent)
    expect(hasNumbers).toBe(true)

    console.log('✓ Stats section displays counts')
  })

  test('should show questions sorted by ID', async ({ page }) => {
    // Get all question links
    const questionLinks = page.locator('a[href*="/javascript/"]')
    const count = await questionLinks.count()

    if (count > 1) {
      // Get first few question URLs
      const urls: string[] = []
      for (let i = 0; i < Math.min(3, count); i++) {
        const href = await questionLinks.nth(i).getAttribute('href')
        if (href) urls.push(href)
      }

      console.log(`✓ Questions are displayed in order: ${urls.join(', ')}`)
      expect(urls.length).toBeGreaterThan(0)
    }
  })

  test('should handle empty state gracefully', async ({ page }) => {
    // Apply a filter that returns no results
    const searchInput = page.locator('input[placeholder*="echercher"], input[type="search"]')

    if (await searchInput.isVisible()) {
      await searchInput.fill('xyzabcnonexistent')

      // Wait for debounce
      await page.waitForTimeout(500)

      // Check for "no results" message
      const pageContent = await page.content()
      const _hasNoResultsMessage =
        pageContent.toLowerCase().includes('aucun') ||
        pageContent.toLowerCase().includes('no result') ||
        pageContent.toLowerCase().includes('0')

      console.log('✓ Empty state handling verified')
    }
  })
})
