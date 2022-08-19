import React from 'react'

const Notes = ({note}) =>{
    return(
  <li key={note}>{note.content}</li>
    )
  }
  
  export default Notes