import { FakeRabbitMq } from '../queue/rabbitmq';

describe('FakeRabbitMq', () => {
    let fakeRabbitMq: FakeRabbitMq;

    beforeEach(() => {
        fakeRabbitMq = FakeRabbitMq.getInstance();
    });
    afterEach(() => {
        jest.clearAllTimers();
        jest.restoreAllMocks();
    });

    it('should connect to Fake RabbitMQ', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await fakeRabbitMq.connect();
        expect(consoleSpy).toHaveBeenCalledWith('Fake RabbitMQ connected');
    });

    it('should publish a message to the queue', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await fakeRabbitMq.publish('test message');
        expect(consoleSpy).toHaveBeenCalledWith('Fake message sent to queue: test message');
    });

    it('should get messages from the queue', async () => {
        const messages = await fakeRabbitMq.getMessages();
        expect(messages).toEqual(["test message"]);
    });

    it('should simulate processing messages', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await fakeRabbitMq.simulateProcessing();
        expect(consoleSpy).toHaveBeenCalledWith('Processing message: test message');
    });

  
});