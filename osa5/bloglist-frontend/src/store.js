import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

// huom. tämän ei varmaan pitäisi  olla täällä
/*
anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes)))
*/

export default store