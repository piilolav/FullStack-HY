import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/allUsersReducer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers)

  useEffect( () => {
    dispatch(getUsers())
  }, [dispatch] )

  if (users === null) {
    return null
  }

  const listData = users.map((user) => (
    <ListItem key = {user.id}>
      <Link to={`/users/${user.id}`} >
        <ListItemText primary= {user.username} />
      </Link>
      <ListItemText primary= {user.blogs.length} />
    </ListItem>
  ))


  return (
    <div className='allUsers'>
      <h3>Users</h3>
      <List>{listData}</List>

    </div>
  )

}

export default Users