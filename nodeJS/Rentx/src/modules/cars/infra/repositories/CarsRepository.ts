import { getRepository, Repository } from 'typeorm';

import { ICreateCar } from '@modules/cars/types/ICreateCar';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IFindAvailableCars } from '@modules/cars/types/IFindAvailableCars';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    category_id,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    specifications,
    brand,
  }: ICreateCar): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      specifications,
      brand,
    });

    await this.repository.save(car);
    return car;
  }

  async findAvailables({
    name,
    brand,
    category_id,
  }: IFindAvailableCars): Promise<Car[]> {
    const query = this.repository.createQueryBuilder();
    query.where('available = :available', { available: true });

    if (name) {
      query.andWhere('name = :name', { name });
    }

    if (brand) {
      query.andWhere('brand = :brand', { brand });
    }

    if (category_id) {
      query.andWhere('category_id = :category_id', { category_id });
    }

    return query.getMany();
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne({ id });
  }
}

export { CarsRepository };
