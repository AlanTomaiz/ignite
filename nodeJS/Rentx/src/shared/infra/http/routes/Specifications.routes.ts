import { Router } from 'express';

import createSpecificationCtrl from '@modules/cars/useCases/createSpecification';
import listCategoriesCtrl from '@modules/cars/useCases/listSpecifications';
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
