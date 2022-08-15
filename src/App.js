import { useState } from 'react'
import Notes from './components/Note'

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

  const [notes, setNotes] = useState(props.notes)

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
  console.log('Sum', sum, part)
  return sum 
},0)

  return (
    <div>
      
      <Course course={course} />

      <h1>Notes</h1>

      {/* <ul>
        {notes.map((note) => 
        <li key = {note.id}>
          {note.content}
        </li>)}
      </ul> */}

      <ul>
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
      </form>

     
    </div>
  )
}

export default App