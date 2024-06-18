import { useState } from 'react'

const Blog = ({ blog, handleUpdate }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const addLike = () => {
    const newBlog = {...blog, likes: blog.likes + 1}
    handleUpdate(newBlog)
  }

  return(
    <div className="blog">
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>
        {detailsVisible ? "hide" : "view"}
      </button>
      <div style={{display: detailsVisible ? '' : 'none'}}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}
          <button
            onClick={addLike}>
              Like
          </button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )  
}

export default Blog