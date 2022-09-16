import { useState, useEffect } from 'react'
import Notes from './components/Note'
import Numbers from './components/Phonebook'
import noteService from './services/notes'
import personService from './services/phonebook'
import Footer from './components/Footer'
import DetailedCountry from './components/DetailedCountry'
import axios from 'axios'

const App = (props ) => {

  //NOTES.....
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
    )
  
  const [errorMessage, setErrorMessage] = useState('Notes notification...')
  
  const addNote = (event) =>{
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5
    }

    noteService
    .create(noteObject)
    .then(returnedNote=> {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
 }

 const hanndleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
 }

useEffect(() => {
  noteService
  .getAll()
  .then(initialNotes =>{
    setNotes(initialNotes)
  }
 )
}, [])

const toggleImportanceOf = (id) => { 
  const note = notes.find(n => n.id === id)
  console.log(note)
  const changedNote = {...note, important: !note.important}

noteService
.update(id, changedNote)
.then(returnedNote => {
  setNotes(notes.map(n => n.id !== id 
    ? n
    : returnedNote
    ))
})
.catch(error => {
  setErrorMessage(`The note ${note.content} was already removed from the server`)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000);
  setNotes(notes.filter(n => n.id !== id))
})
}

const NoteNotification = ({message}) =>{
  if (message === null){
    return null;
  }

  return(
    <div className='error'>
      {message}
    </div>
  )
}
//PEOPLE.....
const [person, setPerson] = useState([])

const [newName, setNewName] =useState('')

const [newNumber, setNewNumber] = useState('')

const [filter, setFilter] = useState('a')

const [personMessage, setPersonMessage] = useState('Person notification...')

const PersonNotification = ({personMessage}) =>{
  if (personMessage === null){
   return null
  }
  return(
   <div className='errorNumbers'>
     {personMessage}
   </div>
  )
 }

const addPerson = (event, id) =>{
event.preventDefault()
  const personObject ={
      name: newName,
      number: newNumber 
    }

  const no = person.find(p => p.name === newName)
  const changedPerson = {...no, number: newNumber}

  if (person.map(p => p.name).includes(personObject.name)){
    window.confirm( `${newName} is already added to phonebook, replace the old number with new one?`)
    ? personService
      .updatePersons(no.id, changedPerson)
      .then(returnedPerson =>{
        setPerson(person.map(p=> p.id !== no.id
        ? p
        : returnedPerson
        ))
        setPersonMessage(`${newNumber} has replaced ${no.number} for ${no.name}`)
        setTimeout(() => {
          setPersonMessage(null)
        }, 5000);
      })
      .catch(error =>{ 
        setPersonMessage(error.response.data.error)
      setTimeout(() => {
        setPersonMessage(null)
      }, 5000);
      })
    : alert(`${newName}'s number has not been replaced`)
      
  }
  else{
    personService
    .createPerson(personObject)
    .then(returnedPerson => {
      setPerson(person.concat(returnedPerson))
      setPersonMessage(
        `${newName} has been added`
      )
      setTimeout(() => {
        setPersonMessage(null)
      }, 5000);
    })
    .catch(error =>{
      setPersonMessage(error.response.data.error)
      setTimeout(() => {
        setPersonMessage(null)
      }, 5000);
    })
  }
  setNewName('')
  setNewNumber('')
}

const handleNewPerson = (event) =>{
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNewNumber = (event) =>{
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) =>{
  console.log(event.target.value)
  setFilter(event.target.value)
}

const deletePhoneId = (id) => {

  const pers = person.find(p => p.id === id)
  console.log(id)
  
  personService
  .deletePersonWithId(id)
  .then(returnedPerson => {
    setPerson(person.filter(currentPerson => currentPerson.id !== id))
    setPersonMessage(
      `${pers.name} deleted`
    )
    setTimeout(() => {
      setPersonMessage(null)
    }, 5000);
  })
  .catch(error => {
    setPersonMessage(
      `${pers.name} was already deleted`
    )
    setTimeout(() => {
      setPersonMessage(null)
    }, 5000);
  })
}

useEffect(() => {
  personService
.getAllPersons()
.then(allPeople =>{

  setPerson(allPeople)

})
}, [])

//console.log(person)

//COUNTRIES.....

const [countryInput, setCountryInput] = useState('a')

const [countries, setCountries] = useState([])

const [countriesData, setCountriesData] = useState([])

const [searchResults, setSearchResults] = useState([])

const handleCountries = (event) =>{
  event.preventDefault()
  console.log(event.target.value)
  setCountryInput(event.target.value)
}

useEffect(() => {
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response => 
    setCountries(response.data)
    )
}, [])

useEffect(() => {
  let data = countries.map(country => 
    {return {
    countryName: country.name,
    countryLanguage: country.languages,
    countryCapital: country.capital,
    countryArea: country.area,
    countryFlag: country.flag
  }})

  setCountriesData(data)
}, [countries])

useEffect(() =>{
  setSearchResults(countriesData
  .filter((country, i) => {
    console.log(country)
    return country.countryName.common.toLowerCase().includes(countryInput)
  }))
}, [countryInput]) //monitoring country input

console.log(countriesData)

  return (
    <div>
    
      <h1>PhoneBook</h1>
  <PersonNotification personMessage={personMessage}/>
      <form onSubmit={addPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handleNewPerson} 
          />
          <div>
            number: <input 
            value={newNumber}
            onChange={handleNewNumber} 
            />
          </div>
        </div>
        <div>
          <button type = 'submit'>add</button>
        </div>
        </form>
        <h1>Numbers</h1>
        <ul>
        {person
        .map(p => <Numbers 
        key = {p.id} 
        persons={p}
        deletePhone = {() => deletePhoneId(p.id)}
        />
        )}
      </ul> 
        <div>
          <h2>Filter</h2>
          <div>
           Filter shown with <input 
           value={filter}
           onChange={handleFilterChange}
           />
          </div>
        {person
          .map(p => p.name)
          .filter((person,i) => person
          .toLowerCase()
          .includes(filter))
          .map((filteredName,i) => (
            <li key={i}>
              {filteredName}
            </li>
      ))}
    </div>
    
  
     
      {/* <Course course={course} /> */}

      <h1>Notes</h1>

      <NoteNotification message={errorMessage}/>

      <ul>
        {notes.map(note => 
        <Notes 
        key = {note.id} 
        note={note}
        toggleImportance = {() => toggleImportanceOf(note.id)}
        />
        )}
      </ul>

      <form onSubmit={addNote}>
          <input 
          value={newNote}
          onChange={hanndleNoteChange}
          />
          <button type='submit'>save</button>
      </form>
       <div>
      <h1>Countries</h1>
      find countries <input 
      value={countryInput}
      onChange={handleCountries}
      />
{/* 
      {searchResults.length < 10 
      ? <div> Less than 10 </div> 
      : searchResults.length < 20 
      ? <div> less than 20 </div> 
      : <div> more than 20 </div>} */}

      {searchResults.length < 10 && searchResults.length > 1
      ? searchResults.map((filteredCountry,i) => 
        <li key={i}>
        {filteredCountry.countryName.common}
      </li>
     )
     :searchResults.length === 1
     ? <DetailedCountry filteredCountry={searchResults[0]}/>
     : <div>Too many matches, specify another filter</div>

    }
      </div>
      <Footer />
    </div>
  )
}

export default App