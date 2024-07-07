require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongo:27017/your_database_name";

console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);

module.exports = {
  MONGODB_URI,
  PORT
};