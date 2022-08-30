import React from 'react'

const Notes = ({note, toggleImportance}) =>{
  const label = note.important
  ? 'Make not important'
  : 'Make important'

    return(
      <div>
      <li className='note' key={note}>{note.content}</li>
      <button onClick={toggleImportance}>{label}</button>
      </div>
    )
  }
  
  export default Notes