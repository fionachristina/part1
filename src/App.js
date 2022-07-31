const Header = (course) =>{
  return (
    <>
    
    <h1>{course.course}</h1>
    </>
  )
}

const Content = (parts) =>{

  return (
    <>
  <p>{parts.name} {parts.exercises}</p>
  
    </>
  )
}

const Total = (total) =>{
  return (
    <>
    <p>Number of exercises {total.number}</p>
    </>
  )
}

const App = () => {

  // const courses = 'Half Stack application development'
  // const parts1 = 'Fundamentals of React'
   const exercises1 = 10
  // const parts2 = 'Using props to pass data'
   const exercises2 = 7
  // const parts3 = 'State of a component'
   const exercises3 = 14



  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }

  const part = [part1, part2, part3]

  const parts = part.map((value) => [value.name, value.exercises]  )

  console.log(parts)

  return (
    <div>
     
  
      <Header course={course}/>
      <Content parts />
      <Content name={parts} />
      <Total number={exercises1 + exercises2 + exercises3} /> 

    </div>
  )
}

export default App