import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Audit', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/interview-training/')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    console.log('\n=== ACCESSIBILITY AUDIT RESULTS ===')
    console.log(`✅ Passed: ${accessibilityScanResults.passes.length} rules`)
    console.log(`❌ Violations: ${accessibilityScanResults.violations.length} rules`)
    console.log(`⚠️  Incomplete: ${accessibilityScanResults.incomplete.length} rules`)

    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n=== VIOLATIONS DETAILS ===')
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`\n❌ ${violation.id} (${violation.impact})`)
        console.log(`   ${violation.description}`)
        console.log(`   Help: ${violation.helpUrl}`)
        console.log(`   ${violation.nodes.length} element(s) affected`)
        violation.nodes.forEach((node, index) => {
          console.log(
            `     ${index + 1}. ${node.html.substring(0, 100)}${node.html.length > 100 ? '...' : ''}`
          )
        })
      })
    }

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have accessibility issues on question detail page', async ({ page }) => {
    await page.goto('http://localhost:3000/interview-training/')
    await page.waitForLoadState('networkidle')

    // Navigate to a question detail page
    const firstQuestion = page.locator('a[href*="/javascript/"]').first()
    if (await firstQuestion.isVisible()) {
      await firstQuestion.click()
      await page.waitForLoadState('networkidle')

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

      console.log('\n=== QUESTION PAGE ACCESSIBILITY AUDIT ===')
      console.log(`✅ Passed: ${accessibilityScanResults.passes.length} rules`)
      console.log(`❌ Violations: ${accessibilityScanResults.violations.length} rules`)

      if (accessibilityScanResults.violations.length > 0) {
        console.log('\n=== VIOLATIONS ===')
        accessibilityScanResults.violations.forEach((violation) => {
          console.log(`\n❌ ${violation.id} (${violation.impact})`)
          console.log(`   ${violation.description}`)
        })
      }

      expect(accessibilityScanResults.violations).toEqual([])
    }
  })
})
