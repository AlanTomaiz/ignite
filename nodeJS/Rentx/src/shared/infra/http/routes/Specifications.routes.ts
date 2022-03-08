import { Router } from 'express';

import createSpecificationCtrl from '@modules/Cars/useCases/createSpecification';

const SpecificationsRoutes = Router();

SpecificationsRoutes.post('/', createSpecificationCtrl.handle);

export { SpecificationsRoutes };
