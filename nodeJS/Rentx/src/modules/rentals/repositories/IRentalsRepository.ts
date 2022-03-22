import { Rental } from '../infra/entities/Rental';
import { ICreateRental } from '../types/ICreateRental';

interface IRentalsRepository {
  create(date: ICreateRental): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
