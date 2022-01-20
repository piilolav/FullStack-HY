import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import Filter from './components/Filter'

const App = () => {

  const dispatch =useDispatch()
  useEffect(()=> {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2> create anecdote</h2>
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App