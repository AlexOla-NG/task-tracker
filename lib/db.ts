import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase(uri: string) {
  if (!uri) throw new Error('MONGODB_URI required');
  if (isConnected) return mongoose.connection;

  await mongoose.connect(uri);
  isConnected = true;
  return mongoose.connection;
}

export async function disconnectDatabase() {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
}
