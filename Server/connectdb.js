const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${encodeURIComponent(`${process.env.MONGODB_PASSWORD}`)}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; 
  }
};

module.exports = connectDB;
