import mongoose from 'mongoose';
import { MongoException } from '../exceptions';

export class MongoDb {
    private static instance: MongoDb;
    private connection: any;
    private constructor() { }

    public static getInstance(): MongoDb {
        if (!MongoDb.instance) {
            MongoDb.instance = new MongoDb();
        }
        return MongoDb.instance;
    }
    public async connect(): Promise<void> {
        const maxRetries = 5;
        const retryDelay = 15000;
        let attempts = 0;

        while (attempts < maxRetries) {
            try {
                const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_COLLECTION}`;
                this.connection = await mongoose.connect(url);
                console.log('MongoDB connected');
                return;
            } catch (error) {
                attempts++;
                console.error(`MongoDB connection attempt ${attempts} failed`, error);
                if (attempts >= maxRetries) {
                    throw new MongoException('Erro ao conectar com o MongoDB após várias tentativas:', 500, error);
                }
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    }
    public async disconnect(): Promise<void> {
        try {
            await this.connection.disconnect();
            console.log('MongoDB disconnected');
        } catch (error) {
            console.error('MongoDB disconnection error', error);
            throw new MongoException('Erro ao desconectar do MongoDB:', 500, error);
        }
    }
}

export class FakeMongoDb {
    private static instance: FakeMongoDb;
    private constructor() { }

    public static getInstance(): FakeMongoDb {
        if (!FakeMongoDb.instance) {
            FakeMongoDb.instance = new FakeMongoDb();
        }
        return FakeMongoDb.instance;
    }

    public async connect(): Promise<void> {
        console.log('FakeMongoDb connected');
    }

    public async disconnect(): Promise<void> {
        console.log('FakeMongoDb disconnected');
    }
}