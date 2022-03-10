import { Car } from '../infra/entities/Car';
import { ICreateCar } from '../types/ICreateCar';
import { IFindAvailableCars } from '../types/IFindAvailableCars';

interface ICarsRepository {
  create(data: ICreateCar): Promise<void>;
  findAll(data: IFindAvailableCars): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
