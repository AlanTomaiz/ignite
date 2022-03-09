import { Router } from 'express';

import createSpecificationCtrl from '@modules/Cars/useCases/createSpecification';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const SpecificationsRoutes = Router();

SpecificationsRoutes.post(
  '/',
  EnsureAuthenticated,
  EnsureAdmin,
  createSpecificationCtrl.handle,
);

export { SpecificationsRoutes };
