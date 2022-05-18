const { response } = require("express");
const express = require("express");
const cors = require('cors')
require('dotenv').config()
const morgan = require("morgan")
const app = express();
app.use(express.static('build'))
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('tiny', ':body'))
app.use(express.json());
const mongoose = require ('mongoose')
const Contact = require('./models/contact')

app.get("/", (request, response) => {
  response.send("<h1>Welcome to the Phonebook API!</h1>");
});

app.get("/info", (request, response) => {
  const date = new Date();
  Contact.find({}).then(persons => {
    response.send(
      `<p>Phonebook has info for ${persons.length} persons</p> <p>${date}</p>`
    );
  })
});

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name && body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
 else if (!body.name) {
  return response.status(400).json({
    error: "name is missing",
  });
} else if (!body.number) {
  return response.status(400).json({
    error: "number is missing",
  });
} 


  const person = new Contact ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
