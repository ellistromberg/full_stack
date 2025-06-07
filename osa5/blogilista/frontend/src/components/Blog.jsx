import { useState } from 'react'

const Blog = ({ blog, onLike, onRemove, user }) => {
  console.log('Blog prop:', blog.user)
  const [visible, setVisible] = useState(false)

  const userCanRemove = blog.user.username === user.username

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>likes {blog.likes}
          <button onClick={onLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {userCanRemove && (
          <button onClick={onRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog