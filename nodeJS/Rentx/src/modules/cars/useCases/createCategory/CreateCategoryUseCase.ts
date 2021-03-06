import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
  title: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  async execute({ title, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.repository.findByName(title);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
    }

    await this.repository.create({ title, description });
  }
}

export { CreateCategoryUseCase };
