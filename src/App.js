const Header = (course) =>{
  return (
    <>
    
    <h1>{course.course}</h1>
    </>
  )
}

const Content = (contents) =>{
  return (
    <>
    <p>{contents.name} {contents.number}</p>
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
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  console.log(course)

  return (
    <div>
      <Header course={course}/>
      <Content name={part1} number={exercises1}/>
      <Content name={part2} number={exercises2}/>
      <Content name={part3} number={exercises3}/>
      <Total number={exercises1 + exercises2 + exercises3} />
    
    </div>
  )
}

export default App