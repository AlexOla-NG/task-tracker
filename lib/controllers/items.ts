import { connectToDatabase } from '../db';
import ItemModel, { IItem } from '../models/Item';
import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI || '';

export async function getItems(): Promise<IItem[]> {
  await connectToDatabase(dbUri);
  return ItemModel.find().sort({ createdAt: -1 }).exec();
}

export async function createItem(payload: Partial<IItem>): Promise<IItem> {
  await connectToDatabase(dbUri);
  const item = new ItemModel(payload);
  return item.save();
}

export async function getItemById(id: string): Promise<IItem | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ObjectId');
  await connectToDatabase(dbUri);
  return ItemModel.findById(id).exec();
}

export async function updateItemById(id: string, payload: Partial<IItem>): Promise<IItem | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ObjectId');
  await connectToDatabase(dbUri);
  return ItemModel.findByIdAndUpdate(id, payload, { new: true }).exec();
}

export async function deleteItemById(id: string): Promise<IItem | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ObjectId');
  await connectToDatabase(dbUri);
  return ItemModel.findByIdAndDelete(id).exec();
}
