import client, { ChannelModel, Connection, Channel, Message } from 'amqplib';
import { RabbitMQException } from '../exceptions';
import { LogRepository } from '../repositories/LogRepository';

export class RabbitMq {
    private static instance: RabbitMq;
    private channelModel: ChannelModel | null = null;
    private channel: Channel | null = null;
    private logRepository: LogRepository | null = null;
    private readonly rabbitMqUrl: string = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
    private readonly queue: string = process.env.RABBITMQ_QUEUE || '';

    private constructor() { 
        this.connect();
        this.logRepository = new LogRepository();
    }

    public static getInstance(): RabbitMq {
        if (!RabbitMq.instance) {
            RabbitMq.instance = new RabbitMq();
        }
        return RabbitMq.instance;
    }

    public async connect(): Promise<void> {
        let attempts = 0;
        const maxAttempts = 5;
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        while (attempts < maxAttempts) {
            try {
                if (this.channelModel && this.channel) {
                    console.log('RabbitMQ is already connected');
                    return;
                }

                this.channelModel = await client.connect(this.rabbitMqUrl);
                this.channel = await this.channelModel.createChannel();
                console.log('RabbitMQ connected');
                await this.consume();
                return;

            } catch (error) {
                attempts++;
                console.error(`Error connecting to RabbitMQ (Attempt ${attempts} of ${maxAttempts})`, error);
                if (attempts >= maxAttempts) {
                    throw new RabbitMQException('Failed to connect to RabbitMQ after multiple attempts');
                }
                await delay(15000); 
            }
        }
    }

    public async publish(message: string): Promise<void> {
        if (!this.channel) {
            throw new RabbitMQException('Channel is not connected');
        }

        try {
            await this.channel.assertQueue(this.queue, { durable: true });
            this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true });
            console.log(`Message sent to queue ${this.queue}: ${message}`);
        } catch (error) {
            console.error('Error publishing message to RabbitMQ', error);
            throw new RabbitMQException('Failed to publish message to RabbitMQ');
        }
    }

    public async consume(): Promise<void> {
        if (!this.channel) {
            throw new RabbitMQException('Channel is not connected');
        }

        try {
            await this.channel.assertQueue(this.queue, { durable: true });
            this.channel.consume(this.queue, async (message: Message | null) => {
                if (message) {
                    const messageContent = message.content.toString();
                    console.log(`Received message from queue ${this.queue}: ${messageContent}`);
                    this.logRepository?.create({ isError : false, message: messageContent });
                    this.channel?.ack(message);
                }
            }, { noAck: false });
            console.log(`Started consuming messages from queue ${this.queue}`);
        } catch (error) {
            console.error('Error consuming messages from RabbitMQ', error);
            throw new RabbitMQException('Failed to consume messages from RabbitMQ');
        }
    }
}

export class FakeRabbitMq {
    private static instance: FakeRabbitMq;
    private queue: string[] = [];

    private constructor() { }

    public static getInstance(): FakeRabbitMq {
        if (!FakeRabbitMq.instance) {
            FakeRabbitMq.instance = new FakeRabbitMq();
        }
        return FakeRabbitMq.instance;
    }

    public async connect(): Promise<void> {
        console.log('Fake RabbitMQ connected');
    }

    public async publish(message: string): Promise<void> {
        console.log(`Fake message sent to queue: ${message}`);
        this.queue.push(message);
    }

    public async simulateProcessing(): Promise<void> {
        const messages = await this.getMessages();
        for (const message of messages) {
            console.log(`Processing message: ${message}`);
            this.queue = this.queue.filter(m => m !== message);
        }
    }

    public async getMessages(): Promise<string[]> {
        await this.delay(500);
        return this.queue;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}