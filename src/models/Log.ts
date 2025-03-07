import { Schema, model, Document } from 'mongoose';
import { BaseModel, BaseModelSchema } from './BaseModel';

export interface Log extends BaseModel {
    isError: boolean;
    message: string;
}

const LogSchema = new Schema<Log>({
    isError: { type: Boolean, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const LogModel = model<Log>('Log', LogSchema);

export { LogModel };
