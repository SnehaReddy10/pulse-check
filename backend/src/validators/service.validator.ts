import { z } from 'zod';
import { ErrorMessages } from '../constants/error-messages';

export const serviceSchema = z.object({
  name: z.string().min(1, ErrorMessages.Service.NameRequired),
  description: z.string().optional(),
  status: z.enum([
    'Operational',
    'Degraded Performance',
    'Partial Outage',
    'Major Outage',
  ]),
  organizationId: z.string().min(1, ErrorMessages.Organization.IDRequired),
});
