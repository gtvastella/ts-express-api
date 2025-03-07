import Redis, { Redis as RedisClient } from 'ioredis';
import { RedisException } from '../exceptions';

export class RedisDb {
    private static instance: RedisDb;
    private client: RedisClient;

    private constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379'), 
            password: process.env.REDIS_PASSWORD, 
        });
    }

    public static getInstance(): RedisDb {
        if (!RedisDb.instance) {
            RedisDb.instance = new RedisDb();
        }
        return RedisDb.instance;
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log('Redis connected');
        } catch (error) {
            console.error('Redis connection error', error);
            throw new RedisException('Erro ao conectar com o Redis:', 500, error);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.client.quit();
            console.log('Redis disconnected');
        } catch (error) {
            console.error('Redis disconnection error', error);
            throw new RedisException('Erro ao desconectar do Redis:', 500, error);
        }
    }

    public async get(key: string): Promise<string | null> {
        try {
            const result = await this.client.get(key);
            return result;
        } catch (error) {
            console.error('Error getting key from Redis', error);
            throw new RedisException('Erro ao buscar chave no Redis:', 500, error);
        }
    }
    
    public async getJson(key: string): Promise<any | null> {
        try {
            const result = await this.client.get(key);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.error('Error getting key from Redis', error);
            throw new RedisException('Erro ao buscar chave no Redis:', 500, error);
        }
    }

    public async setJson(key: string, value: any): Promise<string> {
        try {
            const result = await this.client.set(key, JSON.stringify(value));
            return result;
        } catch (error) {
            console.error('Error setting key in Redis', error);
            throw new RedisException('Erro ao setar chave no Redis:', 500, error);
        }
    }

    public async set(key: string, value: string): Promise<string> {
        try {
            const result = await this.client.set(key, value);
            return result;
        } catch (error) {
            console.error('Error setting key in Redis', error);
            throw new RedisException('Erro ao setar chave no Redis:', 500, error);
        }
    }

    public async exists(key: string): Promise<boolean> {
        try {
            const result = await this.client.exists(key);
            return result === 1;
        } catch (error) {
            console.error('Error checking if key exists in Redis', error);
            throw new RedisException('Erro ao verificar se chave existe no Redis:', 500, error);
            return false;
        }
    }
}

export class FakeRedisDb {
    private static instance: FakeRedisDb;
    private store: Map<string, string>;

    private constructor() {
        this.store = new Map();
    }

    public static getInstance(): FakeRedisDb {
        if (!FakeRedisDb.instance) {
            FakeRedisDb.instance = new FakeRedisDb();
        }
        return FakeRedisDb.instance;
    }

    public async connect(): Promise<void> {
        console.log('FakeRedis connected');
    }

    public async disconnect(): Promise<void> {
        console.log('FakeRedis disconnected');
    }

    public async get(key: string): Promise<string | null> {
        return this.store.get(key) || null;
    }

    public async getJson(key: string): Promise<any | null> {
        const result = this.store.get(key);
        return result ? JSON.parse(result) : null;
    }

    public async setJson(key: string, value: any): Promise<string> {
        this.store.set(key, JSON.stringify(value));
        return 'OK';
    }

    public async set(key: string, value: string): Promise<string> {
        this.store.set(key, value);
        return 'OK';
    }

    public async exists(key: string): Promise<boolean> {
        return this.store.has(key);
    }
}