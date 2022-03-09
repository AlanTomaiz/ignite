import { Router } from 'express';
import multer from 'multer';

import createCarController from '@modules/Cars/useCases/createCar';

const CarsRoutes = Router();
const upload = multer({ dest: './tmp' });

CarsRoutes.post('/', createCarController.handle);

export { CarsRoutes };
