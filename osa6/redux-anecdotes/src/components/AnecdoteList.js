import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

//halutaan tietokantaan päivittää koko anecdote
const Anecdote = ({anecdote}) =>{
  const dispatch = useDispatch()

  const vote = () =>{
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 3))

  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}></button>
      </div>
    </div>
  )

  
}

const AnecdoteList = () => {
//    const anecdotes = useSelector(state => state.anecdote)
      const anecdotes = useSelector(state => {
        if(state.filter === null) {
          return state.anecdote

        }

        const regex = new RegExp(state.filter, 'i')
        return state.anecdote.filter(anecdote => anecdote.content.match(regex))
        
      })
   
    const sortVotes = (x1,x2) => {
        return x2.votes -x1.votes
    }

    return(
        anecdotes.sort(sortVotes).map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)
      )

}

export default AnecdoteList