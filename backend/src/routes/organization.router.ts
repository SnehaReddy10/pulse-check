import { Router } from 'express';
import { CreateOrganizationController } from '../controllers/organization/create-organization.controller';

export const organizationRouter = Router();

organizationRouter.post('/', CreateOrganizationController);
