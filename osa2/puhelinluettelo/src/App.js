import React, { useEffect, useState } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import  PersonForm from './components/PersonForm'
import  PersonService from './services/persons'
import Notification from './components/Notification'
import './index.css'

// const Exists =({name}, {list}) =>{
//   if (list.findIndex({name}) ==-1) {
//     alert(`${name} is already added to phonebook`)
//     return false}
//   else {
//     return true}
//   }


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [newFilter, setFilter]=useState('')
  const [filterPersons, setFilteredPerson] =useState([])
  const [newMessage, setNewMessage] =useState(null)


/*   const hook =() =>{
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
   
  useEffect(hook, [])     */

  useEffect(()=>{
    console.log('effect')
    PersonService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setPersons(initialNotes)
    })
    
  }, [])
  console.log('render', persons.length, 'persons')
  

  function nameExists(name){
    return persons.some(function(el){
      return el.name===name
    })
  }
    const AddPerson =(event) =>{
      event.preventDefault()

      if (nameExists(newName)){
//        console.log(newName, " sekä " , nameExists(newName))
//        alert(`${newName} is already added to phonebook`)
//        setNewName('')
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const updatedPerson = persons.filter(person => person.name ===newName)
            const personId =updatedPerson[0].id
            
            const personObject ={ ...updatedPerson[0], number: newNumber }
                      
            PersonService
                .update(personId, personObject)
                .then(returnedPerson =>{
                  setPersons(persons.map(person => person.id !==personId ? person :returnedPerson))
                })
                .catch(error=>{
                  setNewMessage(
                    `The person ${updatedPerson[0].name} was already deleted from the server`
                  )
                  setTimeout(()=>{
                    setNewMessage(null)
                  },5000)
                })
                setNewName('')
                setNewNumber('')
                setNewMessage(`${updatedPerson[0].name} phonenumber was changed.`)
                setTimeout(()=>{
                  setNewMessage(null)
                },3000)
          }
          else{
            console.log(`${newName}'s contact information was not changed.`)
          }

      }
      else{
        const personObject ={
         name: newName,
         number: newNumber
         
        }
        //console.log(personObject.name, " added to Phonebook")
        PersonService
          .create(personObject)
         
          .then(returnedPerson =>{
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          
          setNewMessage(
            `${personObject.name} was added to phonebook`
          )
          setTimeout(()=>{
            setNewMessage(null)
          },3000)
        })
          .catch(error=>{
            setNewMessage(`Error: ${error.response.data.error}`)
            setTimeout(()=>{
              setNewMessage(null)
            },3000)
            console.log(error.response.data)
          })
    }
    }

    const deletePerson = (id) =>{
      const erasedPerson =persons.filter(person => person.id ===id)
      const personName = erasedPerson[0].name
      const personId = erasedPerson[0].id

      console.log(personName, personId)

      //windows confirm palauttaa booleanin
      if (window.confirm(`Do you want to delete ${personName}?`)){
        PersonService
          .remove(personId)
        console.log(`Person ${personName} removed`)
        setNewMessage(
          `${personName} was removed from phonebook`
        )
        setTimeout(()=>{
          setNewMessage(null)
        },3000)
        setPersons(persons.filter(person => person.id !== personId))
      }

      return(
        true
      )

    }
    
const handleNameChange =(event) =>{
//  console.log(event.target.value)
  setNewName(event.target.value)
}


const handleNumberChange =(event) =>{
//  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleFilter =(event) =>{
//  console.log(event.target.value)
//Hmmm filteri poistaa nyt kaikki vanhat. => Tallennetaan kaikki henkilöt vielä omaansa
  setFilter(event.target.value)   
//  setFilter(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  const regex =new RegExp( newFilter, 'i');
  const filteredPersons =() => persons.filter(person =>person.name.match(regex))
  setFilteredPerson(filteredPersons)

}
// <PersonForm onSubmit={AddPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange = {handleNumberChange} newNumber={newNumber} />
// Alla filtteri, joka ei toimi täysin oikein.
//<Filter value={newFilter} onChange={handleFilter} /> 
  return (
    <div>
      <h2>Phonebook </h2>
      <Notification message={newMessage} />
      <Filter value={newFilter} onChange={handleFilter} />
      <h2>Add a new</h2>
        <PersonForm onSubmit ={AddPerson} newName ={newName} handleNameChange ={handleNameChange} newNumber ={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        <Content persons={filterPersons} allPersons={persons} deletePerson={deletePerson} />
      </ul>
      
    </div>
  )

}

export default App