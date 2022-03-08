import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/Cars/interfaces/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  async execute() {
    return this.repository.list();
  }
}

export { ListCategoriesUseCase };
