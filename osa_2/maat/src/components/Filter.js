import React from "react"

const Filter = ({handleOnChange}) => {
    return (
        <>
        filter countries <input placeholder={"Write a search term"} onChange={handleOnChange}/>
        </>
    )
}

export default Filter;