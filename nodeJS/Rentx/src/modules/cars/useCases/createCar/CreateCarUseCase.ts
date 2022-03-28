import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateCar } from '@modules/cars/types/ICreateCar';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,
  ) {}

  async execute({
    name,
    category_id,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCar): Promise<void> {
    const carAlreadyExists = await this.repository.findByLicensePlate(
      license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    await this.repository.create({
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });
  }
}

export { CreateCarUseCase };
