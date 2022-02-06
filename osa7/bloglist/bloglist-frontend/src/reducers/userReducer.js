import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  // console.log('State  now:', state)
  switch (action.type){
  case 'SET_USER':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export  const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  // console.log('WHAT', loggedUserJSON)
  if (loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    //blogService.setToken(user.token)
    return{
      type: 'SET_USER',
      data: user
    }
  }
  return { type: 'LOGOUT' }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return { type: 'LOGOUT' }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      //console.log('Im loggin in now...')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser())
      dispatch(setNotification(
        'succesfully logged in',
        3,
        'success'
      ))

    }  catch (error){
      dispatch(setNotification(
        'Error logging in ',
        3,
        'error'
      ))
    }
  }
}

export default userReducer