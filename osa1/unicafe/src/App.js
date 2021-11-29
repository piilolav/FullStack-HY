import React, { useState } from 'react'

const Header=(props)=>{
  return (
    <h1>{props.name}</h1>
  )
}

const StatisticLine =({text, value}) =>{
  
  if (text ==="Positive"){
    return(
      <tr>
        <td>
          {text} {value} %
        </td>
      </tr>
    )
  }
  
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  )
}

const Statistics = ({clicks}) => {
  
  const total = clicks.good + clicks.bad + clicks.neutral 
  const positive =clicks.good /total*100
  const average = (clicks.good - clicks.bad)/total 
  
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }


  //Tämä varmaan voisi olla fiksumpikin...

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={clicks.good} />
          <StatisticLine text="Neutral" value={clicks.neutral} />
          <StatisticLine text="Bad" value={clicks.bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
    </div>
    
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // tehdään taulukko painetuille
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () =>
    setClicks({...clicks, good: clicks.good + 1})

  const handleNeutralClick = () =>
    setClicks({...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () =>
    setClicks({...clicks, bad: clicks.bad + 1})


  return (
    <div>
      <Header name="Customer feedback" />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header name="Statistics" />
      <Statistics clicks={clicks} />
    </div>
  )
}

export default App