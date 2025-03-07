import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
    public model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        const document = new this.model(data);
        return await document.save();
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(filter);
    }

    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        return await this.model.find(filter);
    }

    async findAllPaginated(filter: FilterQuery<T> = {}, page: number = 1, limit: number = 10): Promise<T[]> {
        return await this.model.find(filter).skip((page - 1) * limit).limit(limit);
    }

    async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async updateMany(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<void> {
        await this.model.updateMany(filter, data);
    }

    async deleteById(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }

    async deleteMany(filter: FilterQuery<T>): Promise<void> {
        await this.model.deleteMany(filter);
    }

    async count(filter: FilterQuery<T> = {}): Promise<number> {
        return await this.model.countDocuments(filter);
    }
}
