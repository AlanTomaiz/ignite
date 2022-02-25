import { Router } from 'express';
import multer from 'multer';

import createCategoryCtrl from '../modules/Cars/useCases/createCategory';
import listCategoriesCtrl from '../modules/Cars/useCases/listCategories';
import importCategoriesController from '../modules/Cars/useCases/importCategories';

const CategoriesRoutes = Router();
const upload = multer({ dest: './tmp' });

CategoriesRoutes.post('/', createCategoryCtrl.handle);

CategoriesRoutes.get('/', listCategoriesCtrl.handle);

CategoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle,
);

export { CategoriesRoutes };
