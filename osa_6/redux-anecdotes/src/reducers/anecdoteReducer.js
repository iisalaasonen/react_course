
import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return state.map(a => a.id !== action.data.id ? a : action.data)
    case "CREATE":
      return state.concat(action.data)
    case "INIT_ANECDOTES":
      return action.data
    default: 
      return state
  }

}

export const addVote = (anecdoteObject) => {
  const newVote = anecdoteObject.votes + 1
  const changed = {...anecdoteObject, votes: newVote}
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdoteObject.id, changed)
    dispatch({
      type: "VOTE",
      data: updatedAnecdote
    })
  }

}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "CREATE",
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

export default reducer