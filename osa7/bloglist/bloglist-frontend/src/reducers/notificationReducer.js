let timeoutID = 0

const notificationReducer = (state=null, action) => {
  switch (action.type){
  case 'NEW_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = (notification, time, notificationType) => {
  return async dispatch =>  {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: { notification, notificationType }
    })

    //timeoutti voidaan peruuttaa funktiolla clearTimeout()
    clearTimeout(timeoutID)

    timeoutID = setTimeout( () => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data :null
        // data: { notification: null, notificationType: null }
      })
    }, time * 1000)


  }
}

export default notificationReducer