import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import AnecdoteForm from './components/AnecdoteForm'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'

const App = () => {
 
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    //jokin alla ei toimi..
    

    setNotification(`You added a new anecdote ${anecdote.content}`)
    setTimeout(() =>{
      setNotification(null)
    },3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
      <Menu />
      {notification}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes ={anecdotes} ></Anecdote>
        </Route>
        <Route path ="/about">
        <About />
        </Route>
        <Route path ="/create">
        <AnecdoteForm addNew={addNew} />
        </Route>
        <Route path="/">
      <AnecdoteList anecdotes={anecdotes} />
      </Route>
      
      </Switch>
      </Router>
      <Footer />
      
    </div>
  )
}

export default App;