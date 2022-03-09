import { Router } from 'express';
import multer from 'multer';

import createCarController from '@modules/Cars/useCases/createCar';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const CarsRoutes = Router();
const upload = multer({ dest: './tmp' });

CarsRoutes.post(
  '/',
  EnsureAuthenticated,
  EnsureAdmin,
  createCarController.handle,
);

export { CarsRoutes };
