import { Schema, model, Document } from 'mongoose';
import { BaseModel, BaseModelSchema } from './BaseModel';

export interface Customer extends BaseModel {
  name: string;
  email: string;
  phone: string;
  enabled: boolean;
}

const CustomerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

const CustomerModel = model<Customer>('Customer', CustomerSchema);

export { CustomerModel };
