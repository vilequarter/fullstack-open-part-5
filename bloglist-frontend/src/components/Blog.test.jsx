import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    mockHandler = vi.fn()

    container = render (
      <Blog
        blog={blog}
        handleUpdate={mockHandler}
        handleRemove={null}
        loggedUser={null}
      />
    ).container
  })

  test('renders initially visible content', () => {
    const title = screen.getByText('React patterns', { exact: false })
    const author = screen.getByText('Michael Chan', { exact: false })
  })

  test('does not render initially hidden content', () => {
    const element = container.querySelector('.toggleableContent')
    expect(element).toHaveStyle('display: none')
  })

  test('clicking the show button renders hidden content', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view', { exact: false })
    await user.click(button)

    const element = container.querySelector('.toggleableContent')
    expect(element).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls the event hander twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view', { exact: false })
    await user.click(viewButton)
    const likeButton = container.querySelector('#likeButton')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
