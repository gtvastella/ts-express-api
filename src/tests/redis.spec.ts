import { FakeRedisDb } from '../cache/redis';

describe('FakeRedisDb', () => {
    let fakeRedis: FakeRedisDb;

    beforeEach(() => {
        fakeRedis = FakeRedisDb.getInstance();
    });

    afterEach(async () => {
        await fakeRedis.disconnect();
    });

    test('should connect to FakeRedis', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await fakeRedis.connect();
        expect(consoleSpy).toHaveBeenCalledWith('FakeRedis connected');
    });

    test('should disconnect from FakeRedis', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await fakeRedis.disconnect();
        expect(consoleSpy).toHaveBeenCalledWith('FakeRedis disconnected');
    });

    test('should set and get a value', async () => {
        await fakeRedis.set('key', 'value');
        const result = await fakeRedis.get('key');
        expect(result).toBe('value');
    });

    test('should return null for non-existing key', async () => {
        const result = await fakeRedis.get('non-existing-key');
        expect(result).toBeNull();
    });

    test('should set and get a JSON value', async () => {
        const jsonValue = { foo: 'bar' };
        await fakeRedis.setJson('jsonKey', jsonValue);
        const result = await fakeRedis.getJson('jsonKey');
        expect(result).toEqual(jsonValue);
    });

    test('should return null for non-existing JSON key', async () => {
        const result = await fakeRedis.getJson('non-existing-json-key');
        expect(result).toBeNull();
    });

    test('should check if a key exists', async () => {
        await fakeRedis.set('existingKey', 'value');
        const exists = await fakeRedis.exists('existingKey');
        expect(exists).toBe(true);
    });

    test('should return false for non-existing key', async () => {
        const exists = await fakeRedis.exists('non-existing-key');
        expect(exists).toBe(false);
    });
});