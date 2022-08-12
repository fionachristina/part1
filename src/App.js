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
// const Display = (props) =>{
//   return(
//     <div>
//       {props.counter}
//     </div>
//   )
// }
const Display = ({counter}) => <div>{counter}</div>
const Button = ({onClick, text}) => <button onClick = {onClick}>{text}</button>
// const Button = (props) =>{
//   return(
//     <button onClick={props.onClick}>
//     {props.text}
//     </button>
//   )
// }
const History = ({allClicks}) =>{
  if (allClicks.length == 0) {
    return(
      <div>The application is used when the buttons are clicked</div>
    )
  }
return(
  <div> button press history: {allClicks.join('')}</div>
)
}
const Buttons = ({onClick,text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text,value}) => {
return(
  <div>
{text}{value}
</div>
)}
const Statistics = ({good, neutral, bad}) => {
  if (good || neutral || bad){
  return(
<div>
<p>neutral {neutral}</p>
<p>bad {bad}</p>
<p>all {good+neutral+bad}</p>
<p>neutral {(good+neutral+bad) / 3}</p>
      <p>positive {good/(good+neutral+bad) * 100}%</p>
</div>
  )
}
return(
  <div>no Feedback given</div>
)
}
const App = (props) => {
  const title = 'Give Feedback'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [alls, setAlls] = useState(0)
  // const courses = 'Half Stack application development'
  // const parts1 = 'Fundamentals of React'
   const exercises1 = 10
  // const parts2 = 'Using props to pass data'
   const exercises2 = 7
  // const parts3 = 'State of a component'
   const exercises3 = 14
  const [counter, setCounter] = useState(0)
  const increase = () => setCounter(counter + 1)
  const decrease = () => setCounter(counter - 1)
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
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [clicks, setClicks] = useState({
    lefts: 0, rights: 0
  })
  const handleLeftClicks = () => setClicks({...clicks, lefts:clicks.lefts+1})
  const handleRightClicks = () => setClicks({...clicks, rights:clicks.rights+1})
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left+1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right+1)
  }
  const Helllo = (name) => {
  const handler = () =>{
    console.log('hello', name)
  }
  return handler
  }
  const [value, setValue] = useState(10)
  const setToValue = (newValue) => () => {    
    console.log('value now', newValue)  // print the new value to console    
       setValue(newValue) 
       }  
  const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
      ]
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({ 0:0, 1:3, 2:0, 3:0, 4:0, 5:0, 6:0 })
  const random = (min, max) => {
  
    
    min = Math.ceil(0)
    max = Math.floor(6)
    return Math.floor(Math.random() * (max - min+1)+min)
  }

  return (
    <div>
      <div>
        <h1>Anecdotes</h1>
        <div>{vote[selected]}</div>
        {anecdotes[selected]}
        <Buttons text='vote' onClick={() => setVote(Number(vote[selected]) + 1)}/>
        <Buttons text='next anecdote'onClick={() => setSelected(random)}/>
        <h1>{title}</h1>
      <Buttons onClick={() => setGood(good + 1)} text='good'/>
      <Buttons onClick={() => setNeutral(neutral + 1)} text = 'neutral'/>
      <Buttons onClick={() => setBad(bad + 1)} text='bad'/>
      <h1>Statistics</h1>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={good+neutral+bad}/>
      <StatisticLine text='average' value={(good+neutral+bad) /3}/>
      <StatisticLine text='positive' value={good/(good+neutral+bad) * 100} />
      </div>
            {value}
      <button onClick={setToValue(1000)}>thousand</button>      
      <button onClick={setToValue(0)}>reset</button>      
      <button onClick={setToValue(value + 1)}>increment</button>
      <button onClick={Helllo('name')}>name</button>
      <div> {clicks.lefts} 
      <button onClick={handleLeftClicks}>lefts</button>
      <button onClick={handleRightClicks}>rights</button>
      {clicks.rights} </div>
      <History allClicks={allClicks}/>
      <div>
      {left}
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      </div>
      <button onClick={increase}>
        plus {counter}
      </button >
      <button onClick={reset}> Zero</button>
      <button onClick={() =>
    console.log('clicked')}>Console</button>
      {/* <div>{counter}</div> */}
      <Display counter={counter}/>
      <Button onClick={increase} text='Plus'/>
      <Button onClick= {reset} text='Reset'/>
      <Button onClick={decrease} text='Minus'/>
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