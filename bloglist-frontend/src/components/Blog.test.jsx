import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }
    
    container = render (
      <Blog
        blog={blog}
        handleUpdate={null}
        handleRemove={null}
        loggedUser={null}
      />
    ).container
  })

  test('renders initially visible content', () => {
    const title = screen.getByText('React patterns', { exact: false })
    const author = screen.getByText('Michael Chan', { exact: false })
  })

  test('does not render initially invisible content', () => {
    const element = container.querySelector('.toggleableContent')
    expect(element).toHaveStyle('display: none')
  })
})
