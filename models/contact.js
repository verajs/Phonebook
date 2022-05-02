const mongoose = require('mongoose')

const url = `mongodb+srv://phonebook:${process.env.password}@phonebook.t1qs1.mongodb.net/Phonebook?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Contact", phoneSchema)