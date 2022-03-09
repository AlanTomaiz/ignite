import { Router } from 'express';
import multer from 'multer';

import createCategoryCtrl from '@modules/Cars/useCases/createCategory';
import listCategoriesCtrl from '@modules/Cars/useCases/listCategories';
import importCategoriesController from '@modules/Cars/useCases/importCategories';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

const CategoriesRoutes = Router();
const upload = multer({ dest: './tmp' });

CategoriesRoutes.get('/', listCategoriesCtrl.handle);

CategoriesRoutes.post(
  '/',
  EnsureAuthenticated,
  EnsureAdmin,
  createCategoryCtrl.handle,
);

CategoriesRoutes.post(
  '/import',
  EnsureAuthenticated,
  EnsureAdmin,
  upload.single('file'),
  importCategoriesController.handle,
);

export { CategoriesRoutes };
