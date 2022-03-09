import { Car } from '../infra/entities/Car';
import { ICreateCar } from '../types/ICreateCar';

interface ICarsRepository {
  create(data: ICreateCar): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
