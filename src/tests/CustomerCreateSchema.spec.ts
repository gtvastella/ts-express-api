import { CustomerCreateSchema } from '../schemas/CustomerCreateSchema';

describe('CustomerCreateSchema', () => {
  it('should validate a valid object', () => {
    const data = {
      nome: 'John Doe',
      email: 'john@email.com',
      telefone: '11987654321',
    };

    expect(() => CustomerCreateSchema.parse(data)).not.toThrow();
  });

  it('should fail if the name is too short', () => {
    const data = {
      nome: 'Jo',
      email: 'john@email.com',
      telefone: '11987654321',
    };

    expect(() => CustomerCreateSchema.parse(data)).toThrow(
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
    const data = {
      nome: 'John Doe',
      email: 'invalid-email',
      telefone: '11987654321',
    };

    expect(() => CustomerCreateSchema.parse(data)).toThrow(
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

  it('should fail if the phone number has less than 10 or more than 11 digits', () => {
    const data = {
      nome: 'John Doe',
      email: 'john@email.com',
      telefone: '12345',
    };

    expect(() => CustomerCreateSchema.parse(data)).toThrow(
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
