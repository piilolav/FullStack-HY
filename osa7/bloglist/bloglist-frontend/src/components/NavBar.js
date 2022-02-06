/* eslint-disable react/react-in-jsx-scope */
import { useSelector,useDispatch } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/userReducer'
import {  Navbar, Nav } from 'react-bootstrap'


const NavBar = () => {
  const dispatch =useDispatch()
  const user = useSelector(state => state.user)
  const padding ={
    padding: 6,
    color: 'white'
  }

  const buttonStyle = {
    padding: 6,
    color: 'blue',
    border_radius: '50%',
    bg: 'white',
    border: 0
  }

  const handleLogout = () => {
    dispatch(userLogout())
    dispatch(setNotification(
      'Successfully logged out',
      3,
      'success'
    ))

  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style = {padding} to='/'>home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style = {padding} to='/users'>users</Link>
          </Nav.Link>
          <Nav >
            {user.name} logged in <button onClick={handleLogout} type='submit' style ={buttonStyle}>logout</button>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  )
}
export default NavBar