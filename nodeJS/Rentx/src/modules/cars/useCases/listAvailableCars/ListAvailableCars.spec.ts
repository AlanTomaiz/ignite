import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCars.useCase';

describe('# List Availabe Cars', () => {
  const repository = new CarsRepositoryInMemory();
  const useCase = new ListAvailableCarsUseCase(repository);

  it('Shold be able list all availabe cars', async () => {
    await repository.create({
      name: 'TestCar1',
      category_id: 'CategoryTest',
      description: 'Description car',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'FORD',
    });

    const cars = await useCase.execute({});
    expect(cars).toHaveLength(1);
  });

  it('Shold be able list all availabe cars with filter by name', async () => {
    await repository.create({
      name: 'TestCar2',
      category_id: 'CategoryTest',
      description: 'Description car',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'FORD',
    });

    const cars = await useCase.execute({ name: 'TestCar1' });
    expect(cars).toHaveLength(1);
  });

  it('Shold be able list all availabe cars with filter by brand', async () => {
    await repository.create({
      name: 'TestCar3',
      category_id: 'CategoryTest',
      description: 'Description car',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Audi',
    });

    const cars = await useCase.execute({ brand: 'FORD' });
    expect(cars).toHaveLength(2);
  });

  it('Shold be able list all availabe cars with filter by category', async () => {
    await repository.create({
      name: 'TestCar4',
      category_id: 'RejectCategory',
      description: 'Description car',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Audi',
    });

    const cars = await useCase.execute({ category_id: 'CategoryTest' });
    expect(cars).toHaveLength(3);
  });
});
