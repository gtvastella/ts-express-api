import { z } from 'zod';

export const CustomerCreateSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().regex(/^\d{10,11}$/, 'O telefone deve conter 10 ou 11 dígitos'),
});

export type CustomerCreateModel = z.infer<typeof CustomerCreateSchema>;
