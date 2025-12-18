// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectat ✔️');
  } catch (err) {
    console.error('Eroare la conectarea la MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
