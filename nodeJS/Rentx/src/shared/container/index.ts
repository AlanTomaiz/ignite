import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';

import { ICategoriesRepository } from '@modules/Cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/Cars/infra/repositories/CategoriesRepository';

import { ISpecificationsRepository } from '@modules/Cars/repositories/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/Cars/infra/repositories/SpecificationsRepository';

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
