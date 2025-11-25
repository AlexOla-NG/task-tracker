import { z } from 'zod';

export const itemCreateSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in-progress', 'done']).optional(),
});

export const itemUpdateSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in-progress', 'done']).optional(),
});

export const idSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');
