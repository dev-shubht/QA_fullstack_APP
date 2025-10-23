import mongoose from 'mongoose';

export async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/teamqa';
  
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoUri, {
     
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000, 
    });
    console.log('Connected to MongoDB successfully');
    global.useFileDb = false;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error('Server cannot start without MongoDB connection');
    process.exit(1); 
  }
}