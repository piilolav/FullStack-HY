import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom/cjs/react-router-dom.min'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import LoginForm from './components/LoginForm'
//import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { initializeBlogs, createBlog, likeBlog, eraseBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import NavBar from './components/NavBar'


const App = () => {
  const dispatch =  useDispatch()
  const history = useHistory()
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const blogFormRef=useRef()

  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  //blogs from db
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])
  // logged user info
  useEffect(() => {
    dispatch(setUser)
  }, [dispatch])
  /*
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')

  }
  */
  /*
  const handleLogout = async(event) => {
    event.preventDefault()
    dispatch(userLogout())
    dispatch(setNotification(
      'Successfully logged out',
      3,
      'success'
    ))

  } */

  const blogStyle = {
    paddingTop: 7,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addBlog =async (addedBlog) => {
    try{
      blogFormRef.current.toggleVisibility()
      //const createdBlog = await blogService
      //  .create(addedBlog)
      dispatch(createBlog(addedBlog))

      dispatch(setNotification(
        `Blog ${addedBlog.title} was added`,
        3,
        'success'
      ))

    } catch(exeption){
      dispatch(setNotification(
        `Error while adding blog ${addedBlog.title}`,
        3,
        'error'
      ))
    }
  }

  const updateBlog = async (updatedBlog) => {
    try{
      dispatch(likeBlog(updatedBlog))
      dispatch(setNotification(
        `Blog ${updatedBlog.title} was updated`,
        3,
        'success'
      ))
    } catch (exeption){
      dispatch(setNotification(
        `Error updating blog: ${updatedBlog.title}`,
        3,
        'error'
      ))
    }
  }

  const sortLikes = (x1,x2) => {
    return x2.likes -x1.likes
  }

  const removeBlog = async (removedBlog) => {
    try{
      if(window.confirm(`Delete the blog ${removedBlog.title} by ${removedBlog.author} ?`)){
        dispatch(eraseBlog(removedBlog.id))

        dispatch(setNotification(
          `Blog ${removedBlog.title} was deleted`,
          3,
          'success'
        ))

        history.push('/')

      }
    } catch(exeption){

      dispatch(setNotification(
        `Error deleting blog: ${removedBlog.title}`,
        3,
        'error'
      ))
    }

  }


  const userMatch = useRouteMatch('/users/:id')
  const userBlogs = userMatch
    ? blogs.filter(blog => blog.user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const currentBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null


  if (user === null) {
    return (
      /*
      <div className='container'>
        <Notification  />
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
      </div> */
      <div className='container'>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <NavBar />
      <Notification />
      <h2>Blogs</h2>

      <Switch>
        <Route path='/users/:id'>
          <SingleUser blogs= {userBlogs} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={currentBlog} updateBlog={updateBlog} removeBlog={removeBlog} />
        </Route>
        <Route path='/users'>
          <Users> </Users>
        </Route>

        <Route path='/'>

          <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>

          {blogs
            .sort(sortLikes)
            .map(blog =>
              <div key ={blog.id} style = {blogStyle}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
            )}

        </Route>
      </Switch>
    </div>

  )


}

export default App