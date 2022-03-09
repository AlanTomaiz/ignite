import { Router } from 'express';
import multer from 'multer';

import { upload } from '@config/upload';
import createUserController from '@modules/accounts/useCases/createUser';
import uploadUserAvatarController from '@modules/accounts/useCases/uploadUserAvatar';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const uploadAvatar = multer(upload('./tmp/avatar'));
const UsersRoutes = Router();

UsersRoutes.post('/', createUserController.handle);

UsersRoutes.patch(
  '/avatar',
  EnsureAuthenticated,
  uploadAvatar.single('avatar'),
  uploadUserAvatarController.handle,
);

export { UsersRoutes };
