import React, { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'
import './App.css'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodRating = () => {
    setGood(good + 1)
  }

  const handleNeutralRating = () => {
    setNeutral(neutral + 1)
  }

  const handleBadRating = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button className={"goodBtn"} handleRating={handleGoodRating} text='GOOD' />
      <Button className={"neutralBtn"} handleRating={handleNeutralRating} text='NEUTRAL' />
      <Button className={"badBtn"} handleRating={handleBadRating} text='BAD' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
