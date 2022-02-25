import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ISpecificationsRepository } from '../../interfaces/ISpecificationsRepository';

interface IRequest {
  title: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository,
  ) {}

  async execute({ title, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.repository.findByName(title);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.repository.create({ title, description });
  }
}

export { CreateSpecificationUseCase };
