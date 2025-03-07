import { z } from 'zod';

export const CustomerListSchema = z.object({
  limit: z.union([z.number().int().min(1), z.string().regex(/^\d+$/).transform(Number).refine(val => val > 0)]).default(10),
  page: z.union([z.number().int().min(1), z.string().regex(/^\d+$/).transform(Number).refine(val => val > 0)]).default(1),
}).refine(data => data.limit > 0 && data.page > 0, {
  message: "Os valores de 'limit' e 'page' devem ser maiores que zero",
});

export type CustomerListModel = z.infer<typeof CustomerListSchema>;
