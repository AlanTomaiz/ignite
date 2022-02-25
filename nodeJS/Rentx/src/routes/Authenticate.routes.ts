import { Router } from 'express';

import authenticateUserController from '../modules/accounts/useCases/authenticateUser';

const AuthRoutes = Router();

AuthRoutes.post('/session', authenticateUserController.handle);

export { AuthRoutes };
