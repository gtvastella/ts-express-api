import { BaseRepository } from './BaseRepository';
import { Customer, CustomerModel } from '../models/Customer';
import { CustomerCreateException, CustomerUpdateException } from '../exceptions';
import { UpdateQuery } from 'mongoose';

export class CustomerRepository extends BaseRepository<Customer> {
    constructor() {
        super(CustomerModel);
    }

    async create(data: { name: string, email: string, phone: string }): Promise<Customer> {
        try {
            return await super.create(data);
        } catch (error) {
            if ((error as Error).message.includes('duplicate key error')) {
                throw new CustomerCreateException('Email já cadastrado', 402);
            }
            throw new CustomerCreateException('Erro genérico ao criar o cliente:', 400, error);
        }
    }

    async updateById(id: string, data: UpdateQuery<Customer>): Promise<Customer | null> {
        try {
            return await super.updateById(id, data);
        } catch (error) {
            if ((error as Error).message.includes('duplicate key error')) {
                throw new CustomerUpdateException('Email já cadastrado', 400);
            }
            throw new CustomerUpdateException('Erro genérico ao atualizar o cliente:', 400, error);
        }
    }
    
    async findByEmail(email: string): Promise<Customer | null> {
        return await this.model.findOne({ email });
    }

    async findByName(name: string): Promise<Customer[]> {
        return await this.model.find({ name: { $regex: name, $options: 'i' } });
    }

    async updateStatusById(id: string, status: string): Promise<Customer | null> {
        return await this.updateById(id, { status });
    }

    async countActiveCustomers(): Promise<number> {
        return await this.count({ enabled: true });
    }
}
