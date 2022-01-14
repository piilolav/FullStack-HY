import React, { useState } from 'react'

const BlogForm =({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange=(event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange=(event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (

    <form onSubmit={addBlog}>
      <div><h2>create new blog</h2></div>
      <div>
            Title: <input id='title' value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
            Author: <input id='author' value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
            Url: <input id='url' value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button id='create-button' type="submit">create</button>
      </div>
    </form>
  )

}

export default BlogForm
