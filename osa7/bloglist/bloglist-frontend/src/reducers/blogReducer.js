import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  // console.log('ACTION: ', action)
  switch (action.type){
  case 'NEW_BLOG':
    return[...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'INCREASE_LIKES': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id ===id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes +1
    }
    return state.map(blog =>
      blog.id !==id ? blog : changedBlog)
  }
  case 'REMOVE_BLOG': {
    return state.filter( blog => blog.id !== action.data.id)
  }
  case 'ADD_COMMENT':{
    return state.map( item => item.id !== action.data.id ? item : action.data)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}


// tarvitaan varmaan myös tieto userista
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  const id = blog.id
  return  async dispatch => {
    blogService.update(blog)
    dispatch({
      type: 'INCREASE_LIKES',
      data: { id }
    })
  }
}

export const eraseBlog = (id) => {
  return async dispatch => {
    blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const addComment = (id, comment) => {
  console.log('its TIME ')
  console.log(id, comment)
  return async dispatch => {
    const updatedBlog = await blogService.newComment(id, comment)
    console.log(updatedBlog)
    dispatch({
      type: 'ADD_COMMENT',
      data: updatedBlog
    })
  }
}


export default blogReducer