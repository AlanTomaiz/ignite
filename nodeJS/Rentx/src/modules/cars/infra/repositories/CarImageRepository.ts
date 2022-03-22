import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';
import { ICreateCarImage } from '@modules/cars/types/ICreateCarImage';
import { getRepository, Repository } from 'typeorm';
import { CarImage } from '../entities/CarImage';

class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, filename }: ICreateCarImage): Promise<CarImage> {
    const image = this.repository.create({ car_id, filename });
    await this.repository.save(image);
    return image;
  }
}

export { CarImageRepository };
