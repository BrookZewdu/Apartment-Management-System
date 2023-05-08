// src/config/database.ts
import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
  // For a local MongoDB instance, replace "my-db" with your database name

  const mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/my-db';
  console.log('mongoURI', mongoURI);
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
};
