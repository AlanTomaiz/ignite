import { inject, injectable } from 'tsyringe';

import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  images: string[];
}

@injectable()
class RegisterImagesCarUseCase {
  constructor(
    @inject('CarImageRepository')
    private imageRepository: ICarImageRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, images }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) {
      throw new AppError('Car not be exists!');
    }

    await Promise.all(
      images.map(filename => this.imageRepository.create({ car_id, filename })),
    );
  }
}

export { RegisterImagesCarUseCase };
