import React, { useState, useEffect } from 'react'
import Blog from './Blog.js'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newLikeAmount, setNewLikeAmount] = useState(0)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

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

  return (
    <div className="main-container">
      <div className="blogs-container">
        <h1 className="app-title">Blog List</h1>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
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
}

export default App 