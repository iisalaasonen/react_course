import React from "react"

const Notification = ({message}) => {
    const messageStyle = {
            fontSize: 20, 
            color: "green", 
            background: "lightgrey",
            padding: 10,
            borderRadius: 5,
            borderStyle: "solid", 
            margin: 10

    }
    if (message === null){
        return null
    }
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification;