import React, { useState } from "react"

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anectode = ({votes, anecdotes}) => {
  let maxValue = 0
  let maxIdx = 0
  votes.forEach((element, index) => {
    if (element>maxValue) {
      maxValue = element
      maxIdx = index
    }

  })
  return (
    <>
    <h2>Anecdote with the most votes</h2>
    <p>{anecdotes[maxIdx]}</p>
    <p>has {maxValue} votes</p>
    </>
  )
}

const App = () => {

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients."
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const changeAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const changeVotes = () => {
    const copy = [... votes]
    copy[selected] += 1
    setVotes(copy)
  }
  return (
    <div className="container">
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" handleClick={changeVotes}/>
      <Button text="next anecdote" handleClick={changeAnecdote}/>
      <Anectode votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App;
