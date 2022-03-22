import { v4 as uuidV4 } from 'uuid';

import { Car } from '@modules/Cars/infra/entities/Car';
import { ICreateCar } from '@modules/Cars/types/ICreateCar';
import { IFindAvailableCars } from '@modules/Cars/types/IFindAvailableCars';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCar): Promise<Car> {
    const {
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      specifications,
    } = data;

    const car = new Car();
    Object.assign(car, {
      id: uuidV4(),
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      specifications,
      available: true,
      created_at: new Date(),
    });

    this.cars.push(car);
    return car;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailables({
    name,
    brand,
    category_id,
  }: IFindAvailableCars): Promise<Car[]> {
    return this.cars.filter(
      car =>
        car.available &&
        ((name && car.name === name) ||
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (!category_id && !brand && !name)),
    );
  }
}

export { CarsRepositoryInMemory };
