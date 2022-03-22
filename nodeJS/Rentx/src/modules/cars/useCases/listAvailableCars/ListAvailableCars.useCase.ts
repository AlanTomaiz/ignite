import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IFindAvailableCars } from '@modules/cars/types/IFindAvailableCars';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,
  ) {}

  async execute({
    name,
    brand,
    category_id,
  }: IFindAvailableCars): Promise<Car[]> {
    return this.repository.findAvailables({ name, brand, category_id });
  }
}

export { ListAvailableCarsUseCase };
