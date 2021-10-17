import React, {useState} from 'react' 
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, onClickUpdateLikes }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

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
        <p className="blog-author">by {blog.author}</p>
        <button className="view-details-btn" onClick={() => setBlogDetailsVisible(true)}>View</button>
      </div>
      <div className="show-all-blog-info" style={showWhenVisible}>
        <h4>{blog.title}</h4>
        <p className="blog-author">by {blog.author}</p>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <div className="upvotes-count">
          {blog.likes} <button className="like-btn" onClick={onClickUpdateLikes}>&#x2764;</button>
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
  blogs: PropTypes.array,
  setBlogs: PropTypes.func
}

export default Blog