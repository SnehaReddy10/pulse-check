import { z } from 'zod';

export const organizationSchema = z.object({
  name: z.string().min(3, 'Organization name must be at least 3 characters'),
  description: z.string().optional(),
});
