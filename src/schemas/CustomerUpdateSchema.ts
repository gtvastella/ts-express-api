import { z } from 'zod';

export const CustomerUpdateSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido'),
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres').optional(),
  email: z.string().email('E-mail inválido').optional(),
  telefone: z.string().regex(/^\d{10,11}$/, 'O telefone deve conter 10 ou 11 dígitos').optional(),
  ativo: z.boolean().optional(),
});

export type CustomerUpdateModel = z.infer<typeof CustomerUpdateSchema>;
