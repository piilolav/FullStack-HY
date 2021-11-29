
import React, { useState } from 'react'

const Header =({text}) =>(
  <h1>{text}</h1>
)

const Button =(props) =>(
  <button onClick ={props.handleClick}>
    {props.text}
  </button>
)

function GetMax(arr) {
  
  if(arr.length===0){
    return -1;
  }
  
  var max = Math.max(arr[0]);
  var maxIndex=0;

  
  for (var i=0; i<arr.length;i++){
    if (arr[i]>max) {
      maxIndex=i;
      
    }
  }
  return maxIndex
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes]=useState(Array(7).fill(0))
  
 // var points = new Array(7).fill(0)

  const setToValue =newValue =>{
    setSelected(newValue)
  }

  //const [votes, setVotes] = { 0: 0, 1: 0, 2: 0, 3: 0, 4:0 , 5:0 , 6:0}
  


  const voteButton = () => {
      const copy = [...votes]
      copy[selected] +=1
      setVotes(copy)
  }
  

  return (
    <div>
      <Header text={"Anecdote of the day"}/>
      {anecdotes[selected]}  
      <p>This has {votes[selected] } votes.</p>
      <Button handleClick = {voteButton} text ="Vote" />
      <Button handleClick ={ () => setToValue( Math.floor(Math.random()*7)) } text="Next anecdote"/>
      <Header text={"Anecdote with most votes"} />
      {anecdotes[GetMax(votes)]}
      <p>has {votes[GetMax(votes)]} votes</p>
      
    </div>
  )
}

export default App
