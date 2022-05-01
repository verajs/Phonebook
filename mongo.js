const mongoose = require("mongoose");

if (process.argv.length > 3) {
  const password = process.argv[2];

  const contactName = process.argv[3];

  const contactNumber = process.argv[4];

  const url = `mongodb+srv://phonebook:${password}@phonebook.t1qs1.mongodb.net/Phonebook?retryWrites=true&w=majority`;

  mongoose.connect(url);

  const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Contact = mongoose.model("Contact", phoneSchema);

  const contact = new Contact({
    name: contactName,
    number: contactNumber,
  });

  contact.save().then((result) => {
    console.log(`added ${contactName} (${contactNumber}) to phonebook`);
    mongoose.connection.close();
  });
} else {
  const password = process.argv[2];
  const url = `mongodb+srv://phonebook:${password}@phonebook.t1qs1.mongodb.net/Phonebook?retryWrites=true&w=majority`;
  mongoose.connect(url);
  const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Contact = mongoose.model("Contact", phoneSchema);

  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}
