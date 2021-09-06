import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import BlogForm from './components/BlogForm.js'
import ErrorMessage from './components/ErrorMessage.js'
import Notification from './components/Notification.js'
import blogService from './services/blogs'
import loginService from './services/login' 
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
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

  const addBlogListItem = (blogObject) => {
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setNotificationMessage(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
      setBlogs(blogs.concat(returnedBlog))
    })
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
        {blogs
          .sort(function(a, b) {
            return b.likes - a.likes;
          })
          .map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} onClickUpdateLikes={() => onClickUpdateLikes(blog.id, blog.user.id, blog.title, blog.author, blog.url, blog.likes)}/>
        )}
      </div>
      <Notification message={notificationMessage}/>
      <BlogForm createBlog={addBlogListItem} />
    </div>
  )

  const onClickUpdateLikes = (blogId, uUser, uTitle, uAuthor, uUrl, uLikes) => {
    const blogObject = {
      user: uUser,
      title: uTitle,
      author: uAuthor,
      url: uUrl,
      likes: uLikes + 1
    }

    blogService
      .updateLikes(blogId, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === blogId ? returnedBlog : b));
      })
  }

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

//TODO: 5.14. - 5.16.