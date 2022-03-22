import { CarsRepositoryInMemory } from '@modules/Cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/Cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { RegisterSpecificationsCarUseCase } from './RegisterSpecificationsCar.useCase';

describe('Register specifications to an the car', () => {
  const carsRepository = new CarsRepositoryInMemory();
  const specificationsRepository = new SpecificationsRepositoryInMemory();

  const useCase = new RegisterSpecificationsCarUseCase(
    carsRepository,
    specificationsRepository,
  );

  it('Should be not able register specification in nonexists car', async () => {
    expect(async () => {
      await useCase.execute({ car_id: 'nonExistsCar', specifications_id: [] });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able register specification into an car', async () => {
    const car = await carsRepository.create({
      name: 'TestCar',
      category_id: 'CategoryTest',
      description: 'Description car',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'FORD',
    });

    const specification = await specificationsRepository.create({
      title: 'SpecificationTest1',
      description: 'Specification Test 1',
    });

    await useCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    const registerCar = await carsRepository.findById(car.id);
    expect(registerCar.specifications).toHaveLength(1);
  });
});
