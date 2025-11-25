import mongoose, { Schema, Document } from 'mongoose';

export type ItemStatus = 'todo' | 'in-progress' | 'done';

export interface IItem extends Document {
  title: string;
  description?: string;
  status: ItemStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema<IItem>(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);
