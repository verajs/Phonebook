const Contact = require('../models/contact');
const contactRouter = require('express').Router();

contactRouter.get("/info", (request, response, next) => {
  const date = new Date();
  Contact.find({})
    .then((persons) => {
      response.send(
        `<p>Phonebook has info for ${persons.length} persons</p> <p>${date}</p>`
      );
    })
    .catch((error) => next(error));
});

contactRouter.get("/", (request, response, next) => {
  Contact.find({}).then((notes) => {
    response.json(notes); 
  }).catch((error) => next(error));
});

contactRouter.get("/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

contactRouter.delete("/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

contactRouter.post("/", async (request, response, next) => {
  const { name, number } = request.body;

  const person = new Contact({
    name: name,
    number: number
  });

  try {
    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (exception) {
    next(exception);
  }
});

contactRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Contact.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = contactRouter;