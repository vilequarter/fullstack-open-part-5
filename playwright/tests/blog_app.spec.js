const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Mr. Testman',
        username: 'Test',
        password: 'namtseT .rM'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown by default', async ({ page }) => {
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: "login" })).toBeVisible()
    await expect(page.getByRole('button', { name: "cancel" })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('Test')
      await page.locator('input[name="Password"]').fill('namtseT .rM')
      await page.getByRole('button', { name: "login" }).click()
      await expect(page.getByText('Mr. Testman logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('Test')
      await page.locator('input[name="Password"]').fill('failing password')
      await page.getByRole('button', { name: "login" }).click()
      await expect(page.getByText('Invalid username or password')).toBeVisible()
    })
  })
})