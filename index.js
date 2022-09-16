require('dotenv').config()
const express = require('express')
const app = express()
//const morgan = require('morgan')
const cors = require('cors')
//const Note = require('./models/note')
const Phone = require('./models/phone')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

let notes = [{
  id: 1,
  content: 'HTML is easy',
  date: '2022-05-30T17:30:31.098Z',
  important: true
},
{
  id: 2,
  content: 'Browser can execute only Javascript',
  date: '2022-05-30T18:39:34.091Z',
  important: false
},
{
  id: 3,
  content: 'GET and POST are the most important methods of HTTP protocol',
  date: '2022-05-30T19:20:14.298Z',
  important: true
}
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  notes.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  notes.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch(error =>  next(error))
})

app.delete('/api/notes/:id', (request, response,next) => {
  notes.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  // const note = {
  //   content: body.content,
  //   important: body.important,
  // }

  notes.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

//PERSONS................

app.get('/api/persons', (request, response) => {
  Phone.find({}).then(phone => {
    response.json(phone)
  })
})

app.get('/info', (request, response) => {
  // response.send(
  //     `<div> Phonebook has info for ${persons.length} people <br> ${new Date()} </div>`
  //     )
  // console.log(str)
  Phone.find({}).then(phone => {
    response.json(phone.length)
  })

})

app.get('/api/persons/:id', (request, response) => {
  Phone.findById(request.params.id).then(phone => {
    response.json(phone)
  })
})

app.delete('/api/persons/:id', (request, response,next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)
  // response.status(204).end()
  Phone.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const genId = () => {
//   min = Math.ceil(0)
//   max = Math.floor(1000)
//   return Math.floor(Math.random() * (max - min+1)+min)
// }

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  //const names = persons.map(n => n.name )

  // if (!body.name) {
  //     return response.status(400).json({
  //         error: 'name missing'
  //     })
  // } else if (!body.number) {
  //     return response.status(400).json({
  //         error: 'number missing'
  //     })
  // } else if (names.includes(body.name)) {
  //     return response.status(404).json({
  //         error: `name must be unique`
  //     })
  // }

  const phone = new Phone({
    name: body.name,
    number: body.number,
  })

  phone
    .save()
    .then(savedPhone => {
      response.json(savedPhone)
    })
    .catch(error => next(error))

  // persons = persons.concat(person)
  // response.json(person)
  // morgan.token('type', function (req, res) {
  //     return req.headers['content-type'] })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  // const phone = {
  //     name: body.name,
  //     number: body.number,
  // }

  Phone.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPhone => {
      response.json(updatedPhone)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// handler of requests with result to errors
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})