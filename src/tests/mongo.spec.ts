import { FakeMongoDb } from '../db/mongo';

describe('FakeMongoDb', () => {
  let fakeMongoDb: FakeMongoDb;

  beforeEach(() => {
    fakeMongoDb = FakeMongoDb.getInstance();
  });

  test('should create an instance of FakeMongoDb', () => {
    expect(fakeMongoDb).toBeInstanceOf(FakeMongoDb);
  });

  test('should return the same instance of FakeMongoDb', () => {
    const anotherInstance = FakeMongoDb.getInstance();
    expect(fakeMongoDb).toBe(anotherInstance);
  });

  test('should connect to FakeMongoDb', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await fakeMongoDb.connect();
    expect(consoleSpy).toHaveBeenCalledWith('FakeMongoDb connected');
    consoleSpy.mockRestore();
  });

  test('should disconnect from FakeMongoDb', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await fakeMongoDb.disconnect();
    expect(consoleSpy).toHaveBeenCalledWith('FakeMongoDb disconnected');
    consoleSpy.mockRestore();
  });
});