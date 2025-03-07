import { Schema, model, Document } from 'mongoose';

export interface BaseModel extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export const BaseModelSchema = new Schema<BaseModel>({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const BaseModel = model<BaseModel>('BaseModel', BaseModelSchema);
