import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  return(
    <div className="blog">
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>
        {detailsVisible ? "hide" : "view"}
      </button>
      <div style={{display: detailsVisible ? '' : 'none'}}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}<button>Like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )  
}

export default Blog