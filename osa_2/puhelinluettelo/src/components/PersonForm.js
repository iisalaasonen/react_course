import React from "react"

const PersonForm = (props) => {
    const {handleNumber, handleName, addAll, newName, newNumber} = props
    return (
        <>
        <form onSubmit={addAll}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
    )
}

export default PersonForm;