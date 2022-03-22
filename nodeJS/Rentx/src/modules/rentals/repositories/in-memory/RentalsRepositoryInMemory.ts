import { v4 as uuidV4 } from 'uuid';

import { Rental } from '@modules/rentals/infra/entities/Rental';
import { ICreateRental } from '@modules/rentals/types/ICreateRental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRental): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id: uuidV4(),
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }
}

export { RentalsRepositoryInMemory };
