import React from "react";

const Total = ({content}) => {
    const total = content.reduce( (s, p) => {
        const value = s + p.exercises
        return value 
      }, 0)
    return(
      <>
        <p>Number of exercises {total}</p>
      </>
    )
  }

export default Total;