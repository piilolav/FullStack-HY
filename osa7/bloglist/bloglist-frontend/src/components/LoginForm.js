import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  const headerStyle = {
    padding: 24,
    color: 'blue',
    margin: 20
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2 style ={headerStyle}>Login to application</h2>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password: </Form.Label>
        <Form.Control
          id = 'password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button id='login-button' type='submit' variant='primary'>login</Button>
      </Form.Group>
    </Form>
  )
}

/*
  return (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
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
  )
}
*/

export default LoginForm