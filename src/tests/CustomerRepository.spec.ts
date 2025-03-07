import { CustomerRepository } from '../repositories/CustomerRepository';
import { CustomerModel } from '../models/Customer';
import { CustomerCreateException } from '../exceptions';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('CustomerRepository', () => {
    let customerRepository: CustomerRepository;
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        customerRepository = new CustomerRepository();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await CustomerModel.deleteMany({});
    });

    describe('create', () => {
        it('should create a new customer', async () => {
            const data = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
            const customer = await customerRepository.create(data);
            expect(customer).toHaveProperty("_id");
            expect(customer.name).toBe(data.name);
            expect(customer.email).toBe(data.email);
            expect(customer.phone).toBe(data.phone);
        });

        it('should throw CustomerCreateException if email is duplicate', async () => {
            const data = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
            await customerRepository.create(data);
            await expect(customerRepository.create(data)).rejects.toThrow(CustomerCreateException);
        });
    });

    describe('findByEmail', () => {
        it('should find a customer by email', async () => {
            const data = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
            await customerRepository.create(data);
            const customer = await customerRepository.findByEmail(data.email);
            expect(customer).not.toBeNull();
            expect(customer?.email).toBe(data.email);
        });
    });

    describe('findByName', () => {
        it('should find customers by name', async () => {
            const data1 = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
            const data2 = { name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321' };
            await customerRepository.create(data1);
            await customerRepository.create(data2);
            const customers = await customerRepository.findByName('Doe');
            expect(customers.length).toBe(2);
        });
    });

    describe('countActiveCustomers', () => {
        it('should count active customers', async () => {
            const data1 = { name: 'John Doe', email: 'john@example.com', phone: '1234567890', enabled: true };
            const data2 = { name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321', enabled: false };
            await customerRepository.create(data1);
            await customerRepository.create(data2);
            const count = await customerRepository.countActiveCustomers();
            expect(count).toBe(1);
        });
    });
});