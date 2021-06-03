import React, { useState } from "react"

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const mean = (good*1 + neutral*0 + bad*(-1))/all
  const positive = good/all*100

  if (all === 0) {
    return (
      <p>no feedback given</p>
    )
  }

  return (
    <>
    <h2>statistics</h2>
    <table>
      <thead>
      <tr>
        <th>Stat</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{mean}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{positive} %</td>
      </tr>
      </tbody>
    </table>
    </>
  )
}

const Button = ({text, handleClick}) => {

  return (
    <button className="buttons" onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div className="container">
      <h2>give feedback</h2>
      <Button text="good" handleClick={handleGood}/>
      <Button text="neutral" handleClick={handleNeutral}/>
      <Button text="bad" handleClick={handleBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
