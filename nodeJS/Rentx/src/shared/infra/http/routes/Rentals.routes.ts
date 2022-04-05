import { Router } from 'express';

import createRentalCtrl from '@modules/rentals/useCases/createRental';
import findRentalsUserCtrl from '@modules/rentals/useCases/findRentalsUser';
import finalizeRentalCtrl from '@modules/rentals/useCases/finalizeRental';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const RentalsRoutes = Router();

RentalsRoutes.get('/user', EnsureAuthenticated, findRentalsUserCtrl.handle);

RentalsRoutes.post('/', EnsureAuthenticated, createRentalCtrl.handle);

RentalsRoutes.post(
  '/finalize/:rental_id',
  EnsureAuthenticated,
  finalizeRentalCtrl.handle,
);

export { RentalsRoutes };
