let timeoutID = 0

const notificationReducer = (state=null, action) =>{
    switch (action.type){
        case 'NEW_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const setNotification = (notification, time) => {
    return async dispatch =>  {
        dispatch({
        type: 'NEW_NOTIFICATION',
        notification
    })

    //timeoutti voidaan peruuttaa funktiolla clearTimeout()
    clearTimeout(timeoutID)
    
    timeoutID = setTimeout( () => {
        dispatch({
            type: 'CLEAR_NOTIFICATION',
            notification: null
        })
    }, time * 1000)


}
}

export default notificationReducer