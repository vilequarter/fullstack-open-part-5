const loginWith = async (page, username, password) => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: "login" }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'add blog' }).click()
  await page.locator('input[name="Title"]').fill(blog.title)
  await page.locator('input[name="Author"]').fill(blog.author)
  await page.locator('input[name="Url"]').fill(blog.url)
  await page.getByRole('button', { name: "Create" }).click()

export { loginWith, createBlog }