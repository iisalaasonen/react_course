const initialState = null

let timeoutID = null

const reducer = (state=initialState, action) => {
  switch (action.type) {
      case "SET_NOTIFICATION":
        return action.data
      case "CLEAR":
        return null
      default: 
      return state  
  }
}

export const setNotification = (msg, time) => {
  return async dispatch => {
    await dispatch({
      type: "SET_NOTIFICATION",
      data: msg
    })
    if(timeoutID !== null) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      timeoutID = null
      dispatch({type: "CLEAR"})
    }, time*1000)
  }
} 


export default reducer