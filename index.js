const express = require('express')
const morgan = require('morgan')
const app = express()

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }

  app.use(express.json())
// app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
//   }
  
//   app.use(unknownEndpoint)

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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
      })
      if (note) {    
        response.json(note)  
    } else {    
        response.status(404).end()  
    }
      console.log(note)
    response.json(note)
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
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
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<div> Phonebook has info for ${persons.length} people <br> ${new Date()} </div>`
        
        )
    console.log(str)

})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = JSON.stringify(persons.find(person => {
        return person.id === id
    } ))

    if (person) {
        response.send(` ${person} `)
    } else{
        response.status(404).end()
    }
   console.log(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const genId = () => {
    min = Math.ceil(0)
    max = Math.floor(1000)
    return Math.floor(Math.random() * (max - min+1)+min)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = persons.map(n => n.name )

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (names.includes(body.name)) {
        return response.status(404).json({
            error: `name must be unique`
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: genId()
    }

    persons = persons.concat(person)
    response.json(person)
    morgan.token('type', function (req, res) { 
        return req.headers['content-type'] })
})
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })