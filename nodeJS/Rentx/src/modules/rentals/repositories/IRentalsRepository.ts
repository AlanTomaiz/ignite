import { Rental } from '../infra/entities/Rental';
import { ICreateRental } from '../types/ICreateRental';

interface IRentalsRepository {
  save(data: Rental): Promise<void>;
  create(data: ICreateRental): Promise<Rental>;
  findById(_id: string): Promise<Rental>;
  listRentalsUser(user_id: string): Promise<Rental[]>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
