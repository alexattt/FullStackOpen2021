import React, { useState, useEffect } from 'react'
import Blog from './Blog.js'
import ErrorMessage from './ErrorMessage.js'
import Notification from './Notification.js'
import blogService from './services/blogs'
import loginService from './services/login' 
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newLikeAmount, setNewLikeAmount] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Login failed, username or password is incorrect!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }

  const addBlogListItem = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newBlogUrl,
      likes: newLikeAmount
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setNotificationMessage(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewBlogUrl('')
      setNewLikeAmount('')
    })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    if (event.target.value != null) {
      setNewLikeAmount(event.target.value)
    }
  }

  const loginForm = () => (
    <form className="login-form" onSubmit={handleLogin}>
      <div>
        Username: <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password: <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="login-btn" type="submit">Login</button>
    </form>      
  )

  const blogsList = () => (
    <div className="main-container">
      <div className="blogs-container">
        <h1 className="app-title">Blog List</h1>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
      <Notification message={notificationMessage}/>
      <div className="blog-form">
        <h3>Add new awesome blog</h3>
        <form onSubmit={addBlogListItem}>
          Blog title: <input
            value={newTitle}
            onChange={handleTitleChange}
          /> <br></br>
          Blog author: <input
            value={newAuthor}
            onChange={handleAuthorChange}
          /> <br></br>
          Blog URL: <input
            value={newBlogUrl}
            onChange={handleBlogUrlChange}
          /> <br></br>
          Upvotes: <input
            value={newLikeAmount}
            onChange={handleLikesChange}
          /> <br></br>
          <button className="save-blog-btn" type="submit">Save</button>
        </form>
      </div>
    </div>
  )

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage}/>
      {user === null ?
        loginForm():
        <div>
          <div className="log-info">
            <p>{user.name} logged-in</p>
            <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
          </div>
          {blogsList()}
        </div>
      } 
    </div>
  )
}

export default App 