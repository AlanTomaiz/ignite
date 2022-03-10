import { Router } from 'express';

import authenticateUserCtrl from '@modules/accounts/useCases/authenticateUser';

const AuthRoutes = Router();

AuthRoutes.post('/session', authenticateUserCtrl.handle);

export { AuthRoutes };
