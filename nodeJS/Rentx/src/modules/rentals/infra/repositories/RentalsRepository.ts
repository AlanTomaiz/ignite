import { getRepository, Repository } from 'typeorm';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICreateRental } from '@modules/rentals/types/ICreateRental';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRental): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });
    await this.repository.save(rental);
    return rental;
  }

  findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: [{ car_id }, { end_date: null }],
    });
  }

  findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: [{ user_id }, { end_date: null }],
    });
  }
}

export { RentalsRepository };
