import { Router } from 'express';
import multer from 'multer';

import { upload } from '@config/upload';
import createUserCtrl from '@modules/accounts/useCases/createUser';
import uploadUserAvatarCtrl from '@modules/accounts/useCases/uploadUserAvatar';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const uploadAvatar = multer(upload('./tmp/avatar'));
const UsersRoutes = Router();

UsersRoutes.post('/', createUserCtrl.handle);

UsersRoutes.patch(
  '/avatar',
  EnsureAuthenticated,
  uploadAvatar.single('avatar'),
  uploadUserAvatarCtrl.handle,
);

export { UsersRoutes };
