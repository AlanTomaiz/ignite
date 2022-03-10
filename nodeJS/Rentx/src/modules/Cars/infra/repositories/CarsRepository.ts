import { getRepository, Repository } from 'typeorm';

import { ICreateCar } from '@modules/Cars/types/ICreateCar';
import { ICarsRepository } from '@modules/Cars/repositories/ICarsRepository';
import { IFindAvailableCars } from '@modules/Cars/types/IFindAvailableCars';
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

  async findAll({
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
}

export { CarsRepository };
