import React from "react"
const ErrorNotification = ({ errorMessage }) => {
  const messageStyle = {
    fontSize: 20,
    color: "red",
    background: "lightgrey",
    padding: 10,
    borderRadius: 5,
    borderStyle: "solid",
    margin: 10

  }
  if (errorMessage === null) {
    return null
  }
  return (
    <div className="error" style={messageStyle}>{errorMessage}</div>
  )
}

export default ErrorNotification