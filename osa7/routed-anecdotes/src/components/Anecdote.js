import React from "react"
import { useParams } from "react-router"

  const Anecdote = ( {anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    return (
      <div>
        <h2> {anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}> {anecdote.info} </a> </p>
      </div>
    )}

    export default Anecdote