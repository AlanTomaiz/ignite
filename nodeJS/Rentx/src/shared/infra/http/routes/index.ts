import { Router } from 'express';

import { CategoriesRoutes } from './Categories.routes';
import { SpecificationsRoutes } from './Specifications.routes';
import { UsersRoutes } from './Users.routes';
import { CarsRoutes } from './Cars.routes';
import { AuthRoutes } from './Authenticate.routes';
import { RentalsRoutes } from './Rentals.routes';

const routes = Router();

routes.use('/categories', CategoriesRoutes);
routes.use('/specifications', SpecificationsRoutes);
routes.use('/users', UsersRoutes);
routes.use('/cars', CarsRoutes);
routes.use('/rentals', RentalsRoutes);
routes.use(AuthRoutes);

export { routes };
