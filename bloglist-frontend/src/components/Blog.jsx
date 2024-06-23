import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove, loggedUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    handleUpdate(newBlog)
  }

  const removeBlog = () => {
    if(window.confirm(`Delete blog "${blog.title}"?`)){
      handleRemove(blog)
    }
  }

  return(
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      <div
        style={{ display: detailsVisible ? '' : 'none' }}
        className='toggleableContent'
      >
        <div>{blog.url}</div>
        <div>Likes: <div data-testid='likes'>{blog.likes}</div>
          <button
            onClick={addLike}
            id='likeButton'>
              Like
          </button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <button
          onClick={removeBlog}
          style={{ display: loggedUser && loggedUser.username === blog.user.username ? '' : 'none' }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Blog