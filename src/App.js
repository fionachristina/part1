import { useState } from "react";

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

const Hello = (props) =>{
  const bornYear = () =>{
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }
  return(
    <>
      <p>Hello {props.name}, you are {props.age} years</p>
      <p>So you're probably born in {bornYear()}</p>
    </>
  )
}

const Hi = ({name, age}) =>{
  const bornYear = new Date().getFullYear() - age
  return(
    <>
    <p>
      Hi, {name}, you are {age} years old. So that means you were born in {bornYear}
    </p>
    </>
  )

}

const App = (props) => {

  // const courses = 'Half Stack application development'
  // const parts1 = 'Fundamentals of React'
   const exercises1 = 10
  // const parts2 = 'Using props to pass data'
   const exercises2 = 7
  // const parts3 = 'State of a component'
   const exercises3 = 14

  const [counter, setCounter] = useState(0)

  const increase = () => setCounter(counter + 1)

  const reset = () => setCounter(0)

  // setTimeout(() => {
  //   setCounter(counter + 1)
  // },1000);

  // console.log('rendering...', counter)

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

  // console.log(parts)
// console.log(parts)
  const name = 'Fiona'
  const age = 23

  const handleClick = () =>{
    console.log('clicked')
  }

  return (
    <div>

      <button onClick={increase}>
        plus {counter}
      </button >
      <button onClick={reset}> Zero</button>
      <button onClick={() =>
    console.log('clicked')}>Console</button>

    
      {/* <div>{counter}</div> */}
      <Hi name = {name} age = {age}/>
      <Hello name = {name} age = {age}/>
      <Hello name="Maya" age={26 + 10} />
      <Header course={course}/>
      <Content parts />
      <Content name={parts} />
      <Total number={exercises1 + exercises2 + exercises3} /> 

    </div>
  )
}

export default App