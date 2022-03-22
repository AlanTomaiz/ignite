import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCar.useCase';

describe('# Create cars', () => {
  const repository = new CarsRepositoryInMemory();
  const createUseCase = new CreateCarUseCase(repository);

  const testCar = {
    name: 'Test Car',
    category_id: 'Category',
    description: 'Description car',
    daily_rate: 150,
    license_plate: 'ABC-1234',
    fine_amount: 60,
    brand: 'FORD',
  };

  it('Shold be able create a new car', async () => {
    await createUseCase.execute({ ...testCar });
    const car = await repository.findByLicensePlate(testCar.license_plate);

    expect(car).toHaveProperty('id');
  });

  it('Shold be able a new car is availabre for default', async () => {
    const car = await repository.findByLicensePlate(testCar.license_plate);
    expect(car.available).toBeTruthy();
  });

  it('Shold be not able create a car with license place existent', () => {
    expect(async () => {
      await createUseCase.execute({ ...testCar });
    }).rejects.toBeInstanceOf(AppError);
  });
});
