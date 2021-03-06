import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog.js'
import BlogForm from './components/BlogForm.js'
import ErrorMessage from './components/ErrorMessage.js'
import Notification from './components/Notification.js'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login' 
import { notificationMessage } from './reducers/notificationReducer.js'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"
import {
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Container
} from '@material-ui/core'
import './App.css'

const UserView = ({users}) => {
  const id = useParams().id
  const user = users.find(u => u.id === id) 
  if (user === undefined) {
    return null
  }

  return (
    <div className="main-container">
      <h2 className="page-title">{user.name}</h2>
      <h4 className="added-blogs">Added blogs</h4>
      <ul className="user-blogs">
        {user.blogs
          .map(blog =>
            <li key={blog.id} className="list-items">{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const BlogView = ({blogs, onClickUpdateLikes}) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id) 
  if (blog === undefined) {
    return null
  }
  return (
    <div className="main-container">
      <h4 className="page-title">{blog.title}</h4>
      <p className="blog-author">by {blog.author}</p>
      <a href={blog.url} target="_blank" rel="noreferrer" className="blog-url">{blog.url}</a>
      <div>
        {blog.likes} <button className="like-btn" onClick={()=>onClickUpdateLikes(blog.id, blog.user.id, blog.title, blog.author, blog.url, blog.likes)}>&#x2764;</button>
      </div>
    </div>
  )
}


const App = (props) => {
  const [blogs, setBlogs] = useState([]) 
  const [users, setUsers] = useState([]) 
   const [errorMessage, setErrorMessage] = useState(null)
  //const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAllUsers()
      .then(users => {
        setUsers(users)
      })
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [dispatch])

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
      props.notificationMessage(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
      setTimeout(() => {
        props.notificationMessage("")
      }, 3000)
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const loginForm = () => (
    <form className="login-form" onSubmit={handleLogin}>
      <div>
        Username: <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password: <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-btn" className="login-btn" type="submit">Login</button>
    </form>      
  )

  const blogsList = () => (
    <div className="main-container">
      <div className="blogs-container">
        <h1 className="page-title">Blog List</h1>
        {blogs
          .sort(function(a, b) {
            return b.likes - a.likes;
          })
          .map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} onClickUpdateLikes={() => onClickUpdateLikes(blog.id, blog.user.id, blog.title, blog.author, blog.url, blog.likes)}/>
        )}
      </div>
      {/* <Notification message={notificationMessage}/> */}
      <Notification />
      <BlogForm createBlog={addBlogListItem} />
    </div>
  )

  const userList = () => (
    <div className="main-container">
      <h1 className="page-title">Users</h1>
      <div className="user-container">
        <ul>
          {users.map(user=>
            <li key={user.id} className="list-items"><Link to={`/users/${user.id}`}>{user.name}</Link> has created <strong>{user.blogs.length}</strong> blogs</li>)}
        </ul>
      </div>
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
    <Container>
      <div>
        <ErrorMessage errorMessage={errorMessage}/>
        {user === null ?
          loginForm():
          <div>
            <Router>
              <AppBar position="static"  style={{ background: 'rgb(97 152 234)' }}>
                <Toolbar>
                  <Button color="inherit" component={Link} to="/">
                    Blogs
                  </Button>
                  <Button color="inherit" component={Link} to="/users">
                    users
                  </Button>
                  <div className="log-info">
                    <p>{user.name} logged-in</p>
                    <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
                  </div>                 
                </Toolbar>
              </AppBar>
              <Switch>
                <Route path="/users/:id">
                  <UserView users={users}/>
                </Route>
                <Route path="/blogs/:id">
                  <BlogView blogs={blogs} onClickUpdateLikes={onClickUpdateLikes}/>
                </Route>
                <Route path="/users">
                  {userList()}
                </Route>
                <Route path="/">
                  {blogsList()}
                </Route>
              </Switch>
            </Router>
          </div>
        } 
      </div>
    </Container>
  )
}

const mapDispatchToProps  = {
  notificationMessage
}

export default connect(null, mapDispatchToProps)(App)