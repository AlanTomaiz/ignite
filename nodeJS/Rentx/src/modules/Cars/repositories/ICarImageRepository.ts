import { CarImage } from '../infra/entities/CarImage';
import { ICreateCarImage } from '../types/ICreateCarImage';

interface ICarImageRepository {
  create(data: ICreateCarImage): Promise<CarImage>;
}

export { ICarImageRepository };
