import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogappUser'
    )
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setNotification([
        `${username} logged in successfully`,
        false
      ])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch(exception) {
      setNotification(['Invalid username or password', true])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logout')

    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser');
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      await blogService.create(newBlog)
      setNotification([
        `Blog ${newBlog.title} by ${newBlog.author} created`,
        false
      ])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs(await blogService.getAll())

    } catch(exception) {
      setErrorMessage(['Unable to add blog', true])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>

      <Notification message={notification} />

      {user === null
        ? <LoginForm 
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          />
        : <>
            <h2>blogs</h2>
            <div>{`${user.name} logged in`}
              <button onClick={handleLogout}>Logout</button>
            </div>
            <CreateBlogForm 
            handleCreateBlog={handleCreateBlog}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            title={title}
            author={author}
            url={url}
            />
            <br/>
            <div>
              {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
              )}
            </div>
          </>
      }
    </div>
  )
}

export default App