import { container } from 'tsyringe';

import './providers';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/repositories/CategoriesRepository';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/cars/infra/repositories/SpecificationsRepository';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/repositories/CarsRepository';

import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';
import { CarImageRepository } from '@modules/cars/infra/repositories/CarImageRepository';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/repositories/RentalsRepository';

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

// ICarsRepository
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

// ICarImageRepository
container.registerSingleton<ICarImageRepository>(
  'CarImageRepository',
  CarImageRepository,
);

// IRentalsRepository
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
