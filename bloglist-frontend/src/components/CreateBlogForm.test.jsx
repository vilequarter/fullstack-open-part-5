import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
  test('event handler is called with correct details', async () => {
    const createBlog = vi.fn()
    const container = render (
      <CreateBlogForm
        handleCreateBlog={createBlog}
      />
    ).container
    const user = userEvent.setup()
    const submitButton = screen.getByRole('button')
    const titleInput = container.querySelector('#titleInput')
    const authorInput = container.querySelector('#authorInput')
    const urlInput = container.querySelector('#urlInput')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'Test Url')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('Test Url')
  })
})