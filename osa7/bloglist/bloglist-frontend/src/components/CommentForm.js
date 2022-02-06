import React, { useState } from 'react'

//import blogReducer from '../reducers/blogReducer'

const CommentForm = (blog) => {

  const [newComment, setNewComment] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewComment(event.target.value)
  }

  const addComment = () => {
    //event.prevent.default()
    const id = blog.id
    console.log(id)
    //console.log(newComment)
    //blogReducer.addComment(id, event.target.value)
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <p>
          <input value={newComment} onChange={handleChange} />
        </p>
        <button type='submit'>Comment</button>
      </form>
    </div>
  )
}

export default CommentForm