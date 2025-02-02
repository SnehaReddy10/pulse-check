import { Router } from 'express';
import { CreateServiceController } from '../controllers/service/create-service.controller';
import { GetAllServicesForOrganization } from '../controllers/service/get-all-services-by-organization.controller';

export const serviceRouter = Router();

serviceRouter.post('/', CreateServiceController);
serviceRouter.get('/:organizationId', GetAllServicesForOrganization);
