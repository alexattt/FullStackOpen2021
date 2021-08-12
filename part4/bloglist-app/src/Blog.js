import React from 'react'

const Blog = ({ blog }) => {

  return (
    <div className="blog-container">
      <h4>{blog.title}</h4>
      <p className="blog-author">by {blog.author}</p>
      <a href="#">{blog.url}</a>
      <p className="upvotes-count">{blog.likes} &#x2764;</p>
    </div>
  )
}

export default Blog