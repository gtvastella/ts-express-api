import { CustomerGetSchema } from '../schemas/CustomerGetSchema';

describe('CustomerGetSchema', () => {
  it('should validate a valid object', () => {
    const data = { id: '507f1f77bcf86cd799439011' };
    expect(() => CustomerGetSchema.parse(data)).not.toThrow();
  });

  it('should fail if the ID is not a valid 24-character hex string', () => {
    const data = { id: 'invalid-id' };
    expect(() => CustomerGetSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_string',
            message: 'ID inválido',
            path: ['id'],
          }),
        ]),
      })
    );
  });

  it('should fail if the ID is too short', () => {
    const data = { id: '507f1f77bcf86cd7' };
    expect(() => CustomerGetSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_string',
            message: 'ID inválido',
            path: ['id'],
          }),
        ]),
      })
    );
  });

  it('should fail if the ID is too long', () => {
    const data = { id: '507f1f77bcf86cd799439011507f1f77' };
    expect(() => CustomerGetSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_string',
            message: 'ID inválido',
            path: ['id'],
          }),
        ]),
      })
    );
  });
});