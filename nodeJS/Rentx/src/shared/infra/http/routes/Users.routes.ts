import { Router } from 'express';
import multer from 'multer';

import { upload } from '@config/upload';
import { EnsureAuthenticated } from '@shared/infra/http/middlewares/EnsureAuthenticated';
import createUserController from '@modules/accounts/useCases/createUser';
import uploadUserAvatarController from '@modules/accounts/useCases/uploadUserAvatar';

const uploadAvatar = multer(upload('./tmp/avatar'));
const UsersRoutes = Router();

UsersRoutes.post('/', createUserController.handle);

UsersRoutes.use(EnsureAuthenticated);

UsersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  uploadUserAvatarController.handle,
);

export { UsersRoutes };
