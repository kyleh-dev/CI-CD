import { useState, useEffect } from 'react'
import Blog from './components/Blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import signUpService from './services/signup'
import authService from './services/auth'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [quote, setQuote] = useState('')
  const [errormessage, setErrorMessage] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showsignup, setShowSignUp] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const LoggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if(LoggedUser) {
      const user = JSON.parse(LoggedUser)
      setUser(user)
      authService.setToken(user.token)
      authService.verifyToken()
        .then(data => console.log('auth: ', data))
        .catch(err => {
          console.log('auth failed: ', err.response?.data)
          window.localStorage.removeItem('loggedBlogAppUser')
          setUser(null)
        })
    }
  }, [])

  const addblog = event => {
    event.preventDefault()
      const config = {
      title: title,
      author: author,
      source_url: url,
      quote: quote
      }
      blogService.create(config)
        .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
        .catch(err => setErrorMessage(err))

      console.log(blogs)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassword('')
    }
    catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSignUp = async event => {
    event.preventDefault()
    try {
      await signUpService.signup({ username, password })
      setUserName('')
      setPassword('')
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Sign up failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    try{
      setUser(null)
    } catch (err) {
      setErrorMessage('logout failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username <input type="text" placeholder='user name' value={username} onChange={({ target }) => setUserName(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          password <input type="text" placeholder='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </label>
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const signupForm = () => (
    <form onSubmit={handleSignUp}>
      <div>
        <label>
          username <input type="text" placeholder='user name' value={username} onChange={({ target }) => setUserName(target.value) }/>
        </label>
      </div>
      <div>
        <label>
          password <input type="text" placeholder='password' value={password} onChange={({ target }) => setPassword(target.value) }/>
        </label>
      </div>
      <button type='submit'>sign up</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errormessage}/>
      {!user && (
        <div>
        {showsignup ? signupForm() : loginForm()}
        <button onClick={() => setShowSignUp(!showsignup)}>
          { showsignup ? 'Already have an account? log in' : 'Need an account? Sign up'}
        </button>
        </div>
      )}
      {user && (
      <div>
        <p>Welcome, {user.name} is logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      )}
      <Togglable buttonLabel='create new blog'>
        <BlogForm 
          addBlog={addblog}
          title={title}
          author={author}
          url={url}
          quote={quote}
          handleTitle={({ target }) => setTitle(target.value)}
          handleAuthor={({ target }) => setAuthor(target.value)}
          handleUrl={({ target }) => setUrl(target.value)}
          handleQuote={({ target }) => setQuote(target.value)}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App