import React , { useState } from 'react'

const Blog= (props) => {
  const blog = props.blog
  const [, setBlogObject]=useState(blog)
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility =() => {
    setVisible(!visible)
  }

  const buttonLabel= visible ?'hide' : 'view'

  const likeBlog=() => {
    const updatedBlog =({
      ...blog,
      likes: blog.likes+1
    })

    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 7,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle ={
    color: 'white',
    background: 'blue',
    border: 'solid'
  }
  //Note: Crashes if likes or user missing..
  //         <p>{blog.user.name}</p>
  const removeBlog = () => props.removeBlog(blog)

  return(
    <div style={blogStyle} className='blogs'>
      <div>
        <p>{blog.title} by: {blog.author} <button onClick={toggleVisibility}>{buttonLabel} </button></p>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button id='like-button' onClick={likeBlog}>like</button></p>

        <button id='remove' onClick={removeBlog} style={buttonStyle} >delete</button>
      </div>


    </div>
  )

}




export default Blog