const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown by default', async ({ page }) => {
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: "login" })).toBeVisible()
    await expect(page.getByRole('button', { name: "cancel"})).toBeVisible()
  })
})