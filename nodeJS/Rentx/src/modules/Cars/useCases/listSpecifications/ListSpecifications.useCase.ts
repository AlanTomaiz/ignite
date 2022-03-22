import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '@modules/Cars/repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository,
  ) {}

  async execute() {
    return this.repository.listAll();
  }
}

export { ListSpecificationsUseCase };
