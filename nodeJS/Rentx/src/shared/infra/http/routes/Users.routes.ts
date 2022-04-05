import { Router } from 'express';
import multer from 'multer';

import { upload } from '@config/upload';
import createUserCtrl from '@modules/accounts/useCases/createUser';
import uploadUserAvatarCtrl from '@modules/accounts/useCases/uploadUserAvatar';
import sendForgotPasswordMailCtrl from '@modules/accounts/useCases/sendForgotPasswordMail';
import resetPasswordCtrl from '@modules/accounts/useCases/resetPassword';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const uploadAvatar = multer(upload('./tmp/avatar'));
const UsersRoutes = Router();

UsersRoutes.post('/', createUserCtrl.handle);
UsersRoutes.post('/forgot_password', sendForgotPasswordMailCtrl.handle);
UsersRoutes.post('/reset_password', resetPasswordCtrl.handle);

UsersRoutes.patch(
  '/avatar',
  EnsureAuthenticated,
  uploadAvatar.single('avatar'),
  uploadUserAvatarCtrl.handle,
);

export { UsersRoutes };
