require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

//const Note = require('./models/note')
const Phone = require('./models/phone')

app.use(express.static('build'))
app.use(express.json())


app.use(cors())

let notes = [  
    {    
        id: 1,    
        content: "HTML is easy",    
        date: "2022-05-30T17:30:31.098Z",    
        important: true  
    },  
    {    
        id: 2,    
        content: "Browser can execute only Javascript",    
        date: "2022-05-30T18:39:34.091Z",    
        important: false  
    },  
    {    
        id: 3,    
        content: "GET and POST are the most important methods of HTTP protocol",    
        date: "2022-05-30T19:20:14.298Z",    
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
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)      
        } else {        
            response.status(404).end()      
        }
    })
    .catch(error =>  next(error))
  })

app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

  let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(person => person.id !== id)
    // response.status(204).end()
    Phone.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const genId = () => {
    min = Math.ceil(0)
    max = Math.floor(1000)
    return Math.floor(Math.random() * (max - min+1)+min)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = persons.map(n => n.name )

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
    
    phone.save().then(savedPhone => {
        response.json(savedPhone)
      })

    // persons = persons.concat(person)
    // response.json(person)
    // morgan.token('type', function (req, res) { 
    //     return req.headers['content-type'] })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const phone = {
        name: body.name,
        number: body.number,
    }
  
    Phone.findByIdAndUpdate(request.params.id, phone, { new: true })
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