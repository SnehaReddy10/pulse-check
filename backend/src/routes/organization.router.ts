import { Router } from 'express';
import { CreateOrganizationController } from '../controllers/organization/create-organization.controller';
import { GetAllOrganizationsController } from '../controllers/organization/get-all-organizations.controller';
import { UpdateOrganizationController } from '../controllers/organization/update-organization.controller';

export const organizationRouter = Router();

organizationRouter.post('/', CreateOrganizationController);
organizationRouter.get('/', GetAllOrganizationsController);
organizationRouter.put('/:id', UpdateOrganizationController);
