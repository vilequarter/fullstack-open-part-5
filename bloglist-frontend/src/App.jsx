import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      //localStorage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch(exception) {
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logout')

    setUser(null)
    //clear localStorage
    window.localStorage.removeItem('loggedBlogappUser');
  }

  return (
    <div>

      <Notification message={errorMessage} />

      {user === null
        ? <LoginForm 
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          />
        : 
        <>
          <h2>blogs</h2>
          <div>{`${user.name} logged in`}
            <button onClick={handleLogout}>Logout</button>
          </div>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}</>
      }
    </div>
  )
}

export default App