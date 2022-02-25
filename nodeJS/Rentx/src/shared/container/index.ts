import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/accounts/interfaces/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/repositories/UsersRepository';

import { ICategoriesRepository } from '../../modules/Cars/interfaces/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/Cars/repositories/CategoriesRepository';

import { ISpecificationsRepository } from '../../modules/Cars/interfaces/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/Cars/repositories/SpecificationsRepository';

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

// IUsersRepository
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
