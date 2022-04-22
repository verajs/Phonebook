const { response } = require("express");
const express = require("express");
const cors = require('cors')
const morgan = require("morgan")
const app = express();
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('tiny', ':body'))


app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Aleksandr Scriabin",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Yerin Baek",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Satoshi Nakamoto",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Larry David",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Welcome to the Phonebook API!</h1>");
});

app.get("/info", (request, response) => {
  const date = new Date();
  const length = persons.length;
  response.send(
    `<p>Phonebook has info for ${length} people</p> <p>${date}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  app.use(morgan('tiny'))
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  let max = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  max += 1;
  max = Math.floor(Math.random() * (9999999999 - max + 1) + max);
  return max;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "name and number are missing",
    });
  } else if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  } else if (
    persons.map((person) => person.name).includes(body.name) === true
  ) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else if (
    persons.map((person) => person.number).includes(body.number) === true
  ) {
    return response.status(400).json({
      error: "number must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
