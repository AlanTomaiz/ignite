import { Router } from 'express';
import multer from 'multer';

import { upload } from '@config/upload';
import createCarCtrl from '@modules/Cars/useCases/createCar';
import registerImagesCarCtrl from '@modules/Cars/useCases/registerImagesCar';
import registerSpecificationsCarCtrl from '@modules/Cars/useCases/registerSpecificationsCar';
import listAvailableCarsCtrl from '@modules/Cars/useCases/listAvailableCars';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const CarsRoutes = Router();
const uploadImages = multer(upload('./tmp/cars'));

CarsRoutes.get('/availabe', listAvailableCarsCtrl.handle);

CarsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createCarCtrl.handle);

CarsRoutes.post(
  '/images/:id',
  EnsureAuthenticated,
  EnsureAdmin,
  uploadImages.array('images'),
  registerImagesCarCtrl.handle,
);

CarsRoutes.post(
  '/specifications/:id',
  EnsureAuthenticated,
  EnsureAdmin,
  registerSpecificationsCarCtrl.handle,
);

export { CarsRoutes };
