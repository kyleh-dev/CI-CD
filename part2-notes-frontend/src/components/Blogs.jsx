import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const showWhenVisibile = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
  <div style={blogStyle}>
    <div data-testid="blog-intro" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
      {blog.title} {blog.author} 
    <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    </div>
    <div style={showWhenVisibile}>
      <div>{blog.quote}</div>
      <div>{blog.source_url}</div>
    </div>
  </div>
  
  
  )
}

export default Blog