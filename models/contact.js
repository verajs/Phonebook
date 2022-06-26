const mongoose = require('mongoose')



// const numberValidators = [
//   {
//     // Minimum length validator
//     validator: (number) => {
//       if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
//         return false;
//       }
//       return true;
//     },
//     msg: "must be at least 8 digits",
//   },
//   {
//     // Regex validator to allow only numbers
//     validator: (number) => {
//       return /^\d{2,3}-\d+$/.test(number);
//     },
//     msg: "invalid phone number",
//   },
// ];

  const phoneSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 1,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

 

module.exports = mongoose.model("Contact", phoneSchema)