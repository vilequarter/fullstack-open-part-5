const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Test', 'namtseT .rM')
    })
    
    test('a new blog can be created', async ({ page }) => {
      const newBlog = {
        title: "NewBlogTest",
        author: "The Testerrrr",
        url: "www.testblog.blog"
      }
      await createBlog(page, newBlog)
      await expect(page.getByText(`Blog ${newBlog.title} by ${newBlog.author} created`)).toBeVisible()
      await expect(page.getByText(`${newBlog.title} ${newBlog.author}`)).toBeVisible()
      await expect(page.getByRole('button', { name: "View" })).toBeVisible()
    })

    describe('With blogs created', () => {
      beforeEach(async ({ page }) => {
        const newBlog = {
          title: "NewBlogTest",
          author: "The Testerrrr",
          url: "www.testblog.blog"
        }
        await createBlog(page, newBlog)
      })

      test('a blog can be liked', async ({ page }) => {
        
      })
  
      test('only a user who created a blog can see the delete button', async ({ page }) => {
  
      })
  
      test('user who created a blog can delete it' , async ({ page }) => {
  
      })
    })
  })

  describe('Blog sorting', () => {
    test('blog list is sorted by descending likes', async ({ page }) => {

    })
  })
})