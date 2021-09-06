import React, {useState} from 'react' 

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newLikeAmount, setNewLikeAmount] = useState(0)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

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

  const addBlogListItem = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newBlogUrl,
      likes: newLikeAmount
    })

    setNewTitle('')
    setNewAuthor('')
    setNewBlogUrl('')
    setNewLikeAmount('')
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="add-blog-btn" onClick={() => setBlogFormVisible(true)}>Add new blog</button>
      </div>
      <div id="blog-form" className="blog-form" style={showWhenVisible}>
        <h3>Add new awesome blog</h3>
        <form onSubmit={addBlogListItem}>
          Blog title: <input
            id="blog-title-input"
            value={newTitle}
            onChange={handleTitleChange}
          /> <br></br>
          Blog author: <input
            id="blog-author-input"
            value={newAuthor}
            onChange={handleAuthorChange}
          /> <br></br>
          Blog URL: <input
            id="blog-url-input"
            value={newBlogUrl}
            onChange={handleBlogUrlChange}
          /> <br></br>
          Upvotes: <input
            id="blog-likes-input"
            value={newLikeAmount}
            onChange={handleLikesChange}
          /> <br></br>
          <button className="save-blog-btn" type="submit">Save</button>
        </form>
        <button className="cancel-btn" onClick={() => setBlogFormVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default BlogForm