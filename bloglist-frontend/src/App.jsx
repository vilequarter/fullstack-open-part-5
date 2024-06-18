import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const loginFormRef = useRef()
  const blogFormRef = useRef()

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

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(newBlog)
      setNotification([
        `Blog ${newBlog.title} by ${newBlog.author} created`,
        false
      ])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setBlogs(await blogService.getAll())

    } catch(exception) {
      setNotification(['Unable to add blog', true])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdate = async (newBlog) => {
    try {
      await blogService.update(newBlog.id, newBlog)
      //notification?
      setBlogs(await blogService.getAll())
    } catch(exception) {
      setNotification(['Unable to update blog', true])
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>

      <Notification message={notification} />

      <Toggleable buttonLabel="Login" ref={loginFormRef}>
        <LoginForm 
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      </Toggleable>

      {user !== null
        ? <div>{`${user.name} logged in`}
            <button onClick={handleLogout}>Logout</button>
          </div>
        : <></>
      }

      <h2>Blogs</h2>
      <Toggleable buttonLabel="add blog" ref={blogFormRef}>
        <CreateBlogForm 
          handleCreateBlog={handleCreateBlog}
        />
      </Toggleable>
      <br/>
      <div>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} />
        )}
      </div>
    </div>
  )
}

export default App