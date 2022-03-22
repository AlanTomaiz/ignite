import { Router } from 'express';

import createSpecificationCtrl from '@modules/Cars/useCases/createSpecification';
import listCategoriesCtrl from '@modules/Cars/useCases/listSpecifications';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const SpecificationsRoutes = Router();

SpecificationsRoutes.get('/', listCategoriesCtrl.handle);

SpecificationsRoutes.post(
  '/',
  EnsureAuthenticated,
  EnsureAdmin,
  createSpecificationCtrl.handle,
);

export { SpecificationsRoutes };
