const express = require('express')
const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Aleksandr Scriabin", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Yerin Baek", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Satoshi Nakamoto", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Larry David", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => { 
    response.send('<h1>Welcome to the Phonebook API!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

