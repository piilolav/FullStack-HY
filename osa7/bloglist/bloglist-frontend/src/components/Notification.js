import React from 'react'
import { useSelector } from 'react-redux'


const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}


// const Notification = ({ successMessage, errorMessage })
const Notification = () => {
  const  notification = useSelector(
    state => state.notification)
  // console.log(type)
  //  console.log(notification)

  if (notification ===null){
    return null
  } else if (notification.notificationType ==='success'){
    // console.log(notification.type)
    return (
      <div className='success' style={success}>
        {notification.notification}
      </div>
    )
  }else {
    //    console.log(type)
    // console.log(notification.type)
    return(
      <div className='error' style={error} >
        {notification.notification}
      </div>
    )
  }
/* Vanha versio
  if (successMessage === null && errorMessage === null) {
    return null
  }else if (successMessage){
    return (
      <div className='success' style={success}>
        {successMessage}
      </div>
    )
  } else {
    return(
      <div className='error' style={error} >
        {errorMessage}
      </div>
    )
  }
  */
}

export default Notification