import { z } from 'zod';

export const CustomerGetSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido'),
});

export type CustomerGetModel = z.infer<typeof CustomerGetSchema>;
