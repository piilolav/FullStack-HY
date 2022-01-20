import React from 'react'
// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'

const AnecdoteForm = (props) =>{
//    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        console.log('create new')
        const content = event.target.new_anecdote.value
        event.target.new_anecdote.value=''
//        dispatch(createAnecdote(content))
//        dispatch(createAnecdote(content))
//        dispatch(setNotification(`New anecdote: ${content} was added`, 3))
        props.createAnecdote(content)
        props.setNotification(`New anecdote: ${content} was added`, 3)
      }

      return (
        <form onSubmit={createNew} >
        <div><input name='new_anecdote' /></div>
        <button type='submit' >create</button>
      </form>

      )
}

export default connect(null, { createAnecdote, setNotification})(AnecdoteForm)