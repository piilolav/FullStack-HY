import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

/* ID tehdään backendissä
const getId = () => (100000 * Math.random()).toFixed(0)
*/
/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

// const initialState = anecdotesAtStart.map(asObject)
// oli ennen state = initialState
const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE': {
      const id = action.data.id
      const votedAnecdote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote ={
        ...votedAnecdote,
        votes: votedAnecdote.votes +1 
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    }
    case 'NEW_ANECDOTE':{
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES':{
      return action.data
    }
    default:
      return state
  }
}

export const voteAnecdote=(anecdote) =>{
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update({...anecdote, votes:  anecdote.votes +1})
    dispatch({    type: 'VOTE',
    data: votedAnecdote
    })
  }
}

export const createAnecdote = (content) =>{

    return async dispatch =>{
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch({
        type: 'NEW_ANECDOTE',
        data: newAnecdote
    })
    }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer