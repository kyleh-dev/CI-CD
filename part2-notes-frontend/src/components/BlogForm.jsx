import { useState, useEffect } from 'react'

const BlogForm = ({
  addBlog,
  // title,
  // author, 
  // url,
  // quote,
  // handleTitle,
  // handleAuthor,
  // handleUrl,
  // handleQuote
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [quote, setQuote] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
      quote
    }
    addBlog(newBlog)
  }
  return (
  <div>
    <h2>Create New</h2>

    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title <input type="text"  value={title} onChange={({ target }) => setTitle(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Author <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Url <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Quote <input type="text" value={quote} onChange={({ target }) => setQuote(target.value)} />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
  )
}

export default BlogForm 

