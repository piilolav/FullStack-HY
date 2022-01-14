import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //  const [newBlog, setNewBlog] =useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef=useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setSuccessMessage('Succesfully logged in')
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage(null)
    setSuccessMessage('Successfully logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    },3000)

  }

  const addBlog =async (addedBlog) => {
    try{
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService
        .create(addedBlog)
      setSuccessMessage(
        `Blog ${addedBlog.title} was added`
      )
      setErrorMessage(null)
      setBlogs(blogs.concat(createdBlog))
      setTimeout(() => {
        setSuccessMessage(null)
      },3000)
    } catch(exeption){
      setErrorMessage(`Error while adding blog ${addedBlog.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      },3000)
    }
  }

  const updateBlog = async (updatedBlog) => {
    try{
      const modifiedBlog = await blogService
        .update(updatedBlog)
      setSuccessMessage(
        `Blog ${updatedBlog.title} was updated`
      )
      setErrorMessage(null)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : modifiedBlog))
      setTimeout(() => {
        setSuccessMessage(null)
      },3000)
    } catch (exeption){
      setErrorMessage(
        `Error updating blog: ${updatedBlog.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }
  }

  const sortLikes = (x1,x2) => {
    return x2.likes -x1.likes
  }

  const removeBlog = async (removedBlog) => {
    try{
      if(window.confirm(`Delete the blog ${removedBlog.title} by ${removedBlog.author} ?`)){
        blogService
          .remove(removedBlog.id)
        setSuccessMessage(
          `Blog ${removedBlog.title} was deleted`
        )
        setErrorMessage(null)
        setBlogs(blogs.filter(blog => blog.id !== removedBlog.id))
        setTimeout(() => {
          setSuccessMessage(null)
        },3000) }
    } catch(exeption){
      setErrorMessage(
        `Error deleting blog: ${removedBlog.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }

  }


  if (user === null) {
    return (
      <div>
        <Notification errorMessage={errorMessage} successMessage={successMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
        username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
        password
            <input
              id = 'password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <h2>blogs</h2>
      <p> {user.name} logged in <button onClick={handleLogout} type='submit'>logout</button> </p>



      <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>



      {blogs.sort(sortLikes).map(blog =>
        <Blog
          key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}

    </div>

  )


}

export default App