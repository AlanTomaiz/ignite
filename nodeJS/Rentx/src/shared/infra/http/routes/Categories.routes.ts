import { Router } from 'express';
import multer from 'multer';

import createCategoryCtrl from '@modules/cars/useCases/createCategory';
import listCategoriesCtrl from '@modules/cars/useCases/listCategories';
import importCategoriesCtrl from '@modules/cars/useCases/importCategories';
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
  importCategoriesCtrl.handle,
);

export { CategoriesRoutes };
