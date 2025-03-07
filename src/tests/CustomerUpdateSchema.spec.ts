import { CustomerUpdateSchema } from '../schemas/CustomerUpdateSchema';

describe('CustomerUpdateSchema', () => {
  it('should validate a valid object with only required fields', () => {
    const data = { id: '507f1f77bcf86cd799439011' };
    expect(() => CustomerUpdateSchema.parse(data)).not.toThrow();
  });

  it('should validate a valid object with all optional fields', () => {
    const data = {
      id: '507f1f77bcf86cd799439011',
      nome: 'John Doe',
      email: 'john@email.com',
      telefone: '11987654321',
      ativo: true,
    };
    expect(() => CustomerUpdateSchema.parse(data)).not.toThrow();
  });

  it('should fail if the ID is not a valid 24-character hex string', () => {
    const data = { id: 'invalid-id' };
    expect(() => CustomerUpdateSchema.parse(data)).toThrow(
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

  it('should fail if the name is too short', () => {
    const data = { id: '507f1f77bcf86cd799439011', nome: 'Jo' };
    expect(() => CustomerUpdateSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'too_small',
            message: 'O nome deve ter pelo menos 3 caracteres',
            path: ['nome'],
          }),
        ]),
      })
    );
  });

  it('should fail if the email is invalid', () => {
    const data = { id: '507f1f77bcf86cd799439011', email: 'invalid-email' };
    expect(() => CustomerUpdateSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_string',
            message: 'E-mail inválido',
            path: ['email'],
          }),
        ]),
      })
    );
  });

  it('should fail if the phone number is invalid', () => {
    const data = { id: '507f1f77bcf86cd799439011', telefone: '12345' };
    expect(() => CustomerUpdateSchema.parse(data)).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: 'invalid_string',
            message: 'O telefone deve conter 10 ou 11 dígitos',
            path: ['telefone'],
          }),
        ]),
      })
    );
  });
});
