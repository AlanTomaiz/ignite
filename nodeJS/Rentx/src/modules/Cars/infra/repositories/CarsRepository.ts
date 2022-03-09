import { getRepository, Repository } from 'typeorm';

import { ICreateCar } from '@modules/Cars/types/ICreateCar';
import { ICarsRepository } from '@modules/Cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    category_id,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCar): Promise<void> {
    const car = this.repository.create({
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });

    await this.repository.save(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }
}

export { CarsRepository };
