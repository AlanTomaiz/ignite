import { Router } from 'express';
import multer from 'multer';

import createCarCtrl from '@modules/Cars/useCases/createCar';
import listAvailableCarsCtrl from '@modules/Cars/useCases/listAvailableCars';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const CarsRoutes = Router();
const upload = multer({ dest: './tmp' });

CarsRoutes.get('/availabe', listAvailableCarsCtrl.handle);

CarsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createCarCtrl.handle);

export { CarsRoutes };
