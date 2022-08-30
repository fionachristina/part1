import React from 'react'

const Numbers = ({persons, deletePhone}) =>{
  
    return(
      <div>
      <li key={persons}>{persons.name} {persons.number}</li>        
      <button onClick={deletePhone}>Delete</button>
      </div>
    )
  }
  
  export default Numbers