import { Router } from 'express';

import { CategoriesRoutes } from './Categories.routes';
import { SpecificationsRoutes } from './Specifications.routes';
import { UsersRoutes } from './Users.routes';
import { AuthRoutes } from './Authenticate.routes';

const routes = Router();

routes.use('/categories', CategoriesRoutes);
routes.use('/specifications', SpecificationsRoutes);
routes.use('/users', UsersRoutes);
routes.use(AuthRoutes);

export { routes };
