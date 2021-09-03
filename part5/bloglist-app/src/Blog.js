import React, {useState} from 'react' 
import PropTypes from 'prop-types'
import blogService from './services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

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

  const onClickDeleteBlog = (blogId, blogTitle, blogAuthor) => {
    blogService
      .deleteBlog(blogId)
      .then(() => {
        if (window.confirm(`Remove blog ${blogTitle} by ${blogAuthor}?`)) {
            setBlogs(blogs.filter(blog => blog.id !== blogId))
        }
      })
  }

  return (
    <div className="blog-container">
      <div style={hideWhenVisible}>
        <h4>{blog.title}</h4>
        <button className="view-details-btn" onClick={() => setBlogDetailsVisible(true)}>View</button>
      </div>
      <div style={showWhenVisible}>
        <h4>{blog.title}</h4>
        <p className="blog-author">by {blog.author}</p>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <div className="upvotes-count">
          {blog.likes} <button className="like-btn" onClick={() => onClickUpdateLikes(blog.id, blog.user.id, blog.title, blog.author, blog.url, blog.likes)}>&#x2764;</button>
        </div>
        <div className="hide-remove-btns">
          <button className="hide-btn" onClick={() => setBlogDetailsVisible(false)}>Hide</button>
          <button className="delete-btn" onClick={() => onClickDeleteBlog(blog.id, blog.title, blog.author)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog