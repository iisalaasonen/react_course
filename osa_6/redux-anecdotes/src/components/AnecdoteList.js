import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter==="") return anecdotes
    return (
      anecdotes.filter(a => a.content.includes(filter))
 
    )
    })
  anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    const voted = anecdotes.find(a => a.id === id)
    dispatch(addVote(voted))
    const msg = `you voted '${voted.content}'`
    dispatch(setNotification(msg, 5))
  }
    return (
        <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
             {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

export default AnecdoteList