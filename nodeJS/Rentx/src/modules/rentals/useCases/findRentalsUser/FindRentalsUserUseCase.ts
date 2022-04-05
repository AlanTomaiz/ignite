import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

@injectable()
class FindRentalsUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private repository: IRentalsRepository,
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    return this.repository.listRentalsUser(user_id);
  }
}

export { FindRentalsUserUseCase };
