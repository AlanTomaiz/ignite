import { getRepository, Repository } from 'typeorm';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICreateRental } from '@modules/rentals/types/ICreateRental';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(data: ICreateRental): Promise<Rental> {
    const { car_id, user_id, expected_return_date } = data;
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      car: {
        id: car_id,
        available: false,
      },
    });

    await this.repository.save(rental);
    return rental;
  }

  async save(data: Rental): Promise<void> {
    await this.repository.save({ ...data });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { id },
      relations: ['car'],
    });
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { car_id, end_date: null },
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }

  async listRentalsUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
  }
}

export { RentalsRepository };
