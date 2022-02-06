import React , { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import CommentForm from './CommentForm'
import { addComment } from '../reducers/blogReducer'

const Blog= (props) => {
  const blog = props.blog
  const [, setBlogObject]=useState(blog)
  const [visible, setVisible] = useState(false)
  const [newComment, setNewComment] = useState('')
  const loggedUser = useSelector(state => state.user)


  useEffect(() => {
    setVisible(loggedUser.username === blog.user.username)
  }, [])

  const likeBlog=() => {
    const updatedBlog =({
      ...blog,
      likes: blog.likes+1
    })

    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const buttonStyle ={
    color: 'white',
    background: 'blue',
    border: 'solid'
  }
  //Note: Crashes if likes or user missing..
  //         <p>{blog.user.name}</p>
  const removeBlog = () => props.removeBlog(blog)

  const CommentField = () => {
    if(blog.comments.length ===0 ){
      return (
        <div> <p>No comments yet, be first to leave a comment. </p> </div>
      )
    }
    else{
      return(
        blog.comments.map(comment => <li key={comment}> {comment} </li>)
      )
    }
  }

  const handleCommentChange = (event) => {
    console.log(event.target.value)
    setNewComment(event.target.value)
  }

  const createComment = () => {
    //event.preventDefault()
    const id =blog.id
    const comment = newComment
    console.log('pushed a button')
    addComment(id, comment)
  }

  return(
    <div className='blogs'>
      <h2>{blog.title} by: {blog.author} </h2>
      <p><a href={blog.url}> {blog.url}</a></p>
      <p>likes: {blog.likes} <button id='like-button' onClick={likeBlog}>like</button></p>
      <p>created by: {blog.user.name}</p>
      {visible && (
        <button id='remove' onClick={removeBlog} style={buttonStyle} >delete</button>
      )}
      <div>
        <h3>Comments</h3>
        <form onSubmit={createComment}>
          <p>
            <input value={newComment} onChange={handleCommentChange} />
          </p>
          <button type='submit'>Comment</button>
        </form>
        <CommentField />
      </div>
    </div>
  )

}




export default Blog