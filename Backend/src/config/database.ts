// src/config/database.ts
import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
  // For a local MongoDB instance, replace "my-db" with your database name

  const mongoURI = 'mongodb://127.0.0.1:27017/Rental';

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
};
