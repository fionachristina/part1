import { useState, useEffect } from 'react'
import Notes from './components/Note'
import axios from 'axios'

const Header = (props) =>{
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )

}

const Part =(props) =>{
  return(
    <div>{props.name} {props.exercises}</div>
  )
}

const Content = (props) =>{
  return(
    <div>
    {props.course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Total = (props) =>{
  const parts = props.course.parts.map(course => course.exercises)
  return (
    
    <div>
<p>Total of {parts.reduce((s, p) => s + p)} exercises</p>
    </div>
    
  )
}

const Course = (props) =>{
  return(
    <div>
      <Header course={props.course}/>
      <Content  course={props.course}/>
      <Total  course={props.course}/>
    </div>
  )

}


const App = (props ) => {

  //const [notes, setNotes] = useState(props.notes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
    )
  
  const addNote = (event) =>{
    event.preventDefault()
    const noteObject = {
      id: notes.length +1 ,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
    console.log('button clicked ', event.target)
 }

 const hanndleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
 }

 const course = {
  id: 1,
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Redux',
      exercises: 11,
      id: 4
    }
  ]
}

const total = course.parts.reduce((sum, part) => {
  sum = sum + part.exercises
  // console.log('Sum', sum, part)
  return sum 
},0)

const [person, setPerson] = useState([{
  name:'Arto Hellas',
  number: '1234'
}])

const [newName, setNewName] =useState('')

const [newNumber, setNewNumber] = useState('')

const [filter, setFilter] = useState('a')

const personArray = person.map(p => p.name)

const addPerson = (event) =>{
  event.preventDefault()
  const personObject ={
    name: newName,
    number: newNumber 
  }

  if (personArray.includes(personObject.name)){
    alert( `${newName} is already added to phonebook`)
  }
  else{
    setPerson(person.concat(personObject))
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

useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}, [])

  return (
    <div>
 
      <h2>PhoneBook</h2>
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
        <h2>Numbers</h2>

        <ul>
          {person.map((pers, i) => <li key={'person'+i}>{pers.name} {pers.number}</li>)}
        </ul>
         
        <div>
          <h2>Filter</h2>
          <div>
           Filter shown with <input 
           value={filter}
           onChange={handleFilterChange}
           />
          </div>
        {personArray
          .filter((person,i) => person
          .includes(filter))
          .map((filteredName,i) => (
        <li key={i}>
          {filteredName}
        </li>
      ))}
    </div>
    
      </form>
     
      {/* <Course course={course} /> */}

      {/* <h1>Notes</h1> */}

      {/* <ul>
        {notes.map((note) => 
        <li key = {note.id}>
          {note.content}
        </li>)}
      </ul> */}

      {/* <ul>
        {notes.map(note => 
        <Notes key = {note.id} note={note}/>
        )}
      </ul>

      <form onSubmit={addNote}>
          <input 
          value={newNote}
          onChange={hanndleNoteChange}
          />
          <button type='submit'>save</button>
      </form> */}

     
    </div>
  )
}

export default App