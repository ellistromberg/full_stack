import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (person) {
      console.log(`Updating ${person.name}`)
      const updatedPerson = { ...person, number: newNumber }
      
      personService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification(
              `Updated ${returnedPerson.name}`
            )
            setNotificationType('ok')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          }
        })
        .catch(error => {
          setNotification(
            `Information of ${person.name} has already been removed from the server`
          )
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
          setPersons(persons.filter(p => p.id !== person.id))
        })
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(
          `Added ${returnedPerson.name}`
        )
        setNotificationType('ok')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    console.log(`Deleting ${person.name}`)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification(
            `Deleted ${person.name}`
          )
          setNotificationType('ok')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} type={notificationType} />
      <Filter search={search} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App