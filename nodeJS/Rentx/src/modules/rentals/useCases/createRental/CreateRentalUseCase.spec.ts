import { format } from 'date-fns';

import { AppError } from '@shared/errors/AppError';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DateProvider } from '@shared/container/providers/DateProvider/implementations';
import { CreateRentalUseCase } from './CreateRentalUseCase';

jest.mock('@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory');

describe('# Create rentals', () => {
  const dateProvider = new DateProvider();
  const repository = new RentalsRepositoryInMemory();
  const useCase = new CreateRentalUseCase(repository, dateProvider);

  const rentalDTO = {
    car_id: 'aabc8daa-c1d1-413f-9e4d-c44a8180e614',
    user_id: '812cc8e1-ab2f-450e-aa23-295bc21e91e1',
    expected_return_date: format(new Date(), "y'-'MM'-'dd"),
  };

  it('Sould be not able create rental if exists other with same car', async () => {
    repository.findOpenRentalByCar = jest.fn().mockResolvedValueOnce(true);

    expect(async () => {
      await useCase.execute({ ...rentalDTO });
    }).rejects.toBeInstanceOf(AppError);

    expect(repository.create).not.toHaveBeenCalled();
  });

  it('Sould be not able create rental if exists other with same user', async () => {
    repository.findOpenRentalByUser = jest.fn().mockResolvedValueOnce(true);

    expect(async () => {
      await useCase.execute({ ...rentalDTO });
    }).rejects.toBeInstanceOf(AppError);

    expect(repository.create).not.toHaveBeenCalled();
  });

  it('Should be not able create a new rental for the finalize to same day', async () => {
    expect(async () => {
      await useCase.execute({ ...rentalDTO });
    }).rejects.toBeInstanceOf(AppError);

    expect(repository.create).not.toHaveBeenCalled();
  });

  it('Should be able create a new rental', async () => {
    dateProvider.compareInDays = jest.fn().mockResolvedValueOnce(1);

    await useCase.execute({ ...rentalDTO });
    expect(repository.create).toHaveBeenCalled();
  });
});
