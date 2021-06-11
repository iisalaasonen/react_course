import React, { useState, useEffect } from "react"
import './App.css';
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm";
import Person from "./components/Person"
import personService from "./services/persons"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setSearch] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const showPersons = persons.filter(person => person.name.includes(newSearch))

  useEffect(() => {
    personService.getAll()
    .then(persons => setPersons(persons))
    .catch(error => console.log(`${error}`))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
    
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addAll = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber,
    }
    const findPerson = persons.find(p => p.name === newName)
    if (findPerson === undefined) {
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setMessage(`Added ${newName}`)
        setTimeout(() => setMessage(null), 5000)
        
      })
      .catch(error => console.log(`${error}`))
    } else {
      const result = window.confirm(`${newName} is already added to the phonebook, 
      replace the old number with a new one?`)
      if (result) {
        const replacePerson = { ...findPerson, number: newNumber}
        personService.update(findPerson.id, replacePerson)
        .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== findPerson.id ? p : returnedPerson))
            setMessage(`Replaced ${replacePerson.name} phone number`)
            setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          console.log(`${error}`)
          setErrorMessage(`Information of ${replacePerson.name} has already been removed from server`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
      } else {
        console.log('do nothing')
      }
    }
  
}

const deleteContact = (id) => {
  const person = persons.find(p => p.id === id)
  const result = window.confirm(`Delete ${person.name} ?`)
  if (result) {
    personService.deletePerson(id)
    .then(response => console.log(response))
    .catch(error => console.log(`${error}`))
    const newPersons = persons.filter(p => p.id !== id)
    setPersons(newPersons)
    setMessage(`Deleted ${person.name}`)
    setTimeout(() => setMessage(null), 5000)
  } else {
    console.log('no delete')
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnChange={handleSearchChange} searchText={newSearch}/>
      <h3>Add a new </h3>
      <Notification message={message}/>
      <ErrorNotification errorMessage={errorMessage}/>
      <PersonForm handleNumber={handleNumberChange} handleName={handleNameChange} addAll={addAll}
      newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <ul>
        {showPersons.map(person => {
          return (
             <Person
              key={person.id}
              person={person}
              deletePerson={() => deleteContact(person.id)}
              />
          )
        })}
      </ul>

    </div>
  )

}

export default App;
