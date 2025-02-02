import { Router } from 'express';
import { CreateServiceController } from '../controllers/service/create-service.controller';

export const serviceRouter = Router();

serviceRouter.post('/', CreateServiceController);
