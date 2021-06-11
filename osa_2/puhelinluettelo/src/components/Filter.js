import React from "react"

const Filter = ({handleOnChange}) => {
    return (
        <>
        filter to show <input placeholder={"Write a search term"} onChange={handleOnChange}/>
        </>
    )
}

export default Filter;