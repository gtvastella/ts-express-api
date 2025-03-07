import { CustomerListSchema } from '../schemas/CustomerListSchema';

describe('CustomerListSchema', () => {
  it('should validate a valid object with default values', () => {
    const data = {};
    expect(() => CustomerListSchema.parse(data)).not.toThrow();
  });

  it('should validate a valid object with numeric values', () => {
    const data = { limit: 20, page: 2 };
    expect(() => CustomerListSchema.parse(data)).not.toThrow();
  });

  it('should validate a valid object with string numeric values', () => {
    const data = { limit: '15', page: '3' };
    expect(() => CustomerListSchema.parse(data)).not.toThrow();
  });

  it('should fail if limit is not a positive integer', () => {
    const data = { limit: -5, page: 1 };
    expect(() => CustomerListSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'too_small',
            message: expect.any(String),
            path: ['limit'],
          }),
        ]),
      })
    );
  });
  
  it('should fail if page is not a positive integer', () => {
    const data = { limit: 10, page: 0 };
    expect(() => CustomerListSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'too_small',
            message: expect.any(String),
            path: ['page'],
          }),
        ]),
      })
    );
  });

  it('should fail if limit is not a number or numeric string', () => {
    const data = { limit: 'invalid', page: 1 };
    expect(() => CustomerListSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_string',
            message: expect.any(String),
            path: ['limit'],
          }),
        ]),
      })
    );
  });

  it('should fail if page is not a number or numeric string', () => {
    const data = { limit: 10, page: 'abc' };
    expect(() => CustomerListSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_string',
            message: expect.any(String),
            path: ['page'],
          }),
        ]),
      })
    );
  });
});