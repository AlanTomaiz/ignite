import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/Cars/infra/entities/Car';
import { ICarsRepository } from '@modules/Cars/repositories/ICarsRepository';
import { IFindAvailableCars } from '@modules/Cars/types/IFindAvailableCars';

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
    return this.repository.findAll({ name, brand, category_id });
  }
}

export { ListAvailableCarsUseCase };
