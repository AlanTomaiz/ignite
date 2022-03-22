import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/Cars/repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  async execute() {
    return this.repository.listAll();
  }
}

export { ListCategoriesUseCase };
