import { Router } from 'express';

import createRentalCtrl from '@modules/rentals/useCases/createRental';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const RentalsRoutes = Router();

RentalsRoutes.post('/', EnsureAuthenticated, createRentalCtrl.handle);

export { RentalsRoutes };
