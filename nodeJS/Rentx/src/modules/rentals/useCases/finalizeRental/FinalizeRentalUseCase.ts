import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

const minimumDaily = 1;

@injectable()
class FinalizeRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private repository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(rental_id: string): Promise<Rental> {
    const rental = await this.repository.findById(rental_id);
    if (!rental) {
      throw new AppError('Rental not found or inexistent!');
    }

    const { car } = rental;

    // First daily
    const dateNow = new Date().setHours(0, 0, 0, 0);
    const daily =
      this.dateProvider.compareInDays(rental.start_date, dateNow) ||
      minimumDaily;

    // Fine amount
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    const total =
      (delay > 0 ? delay * car.fine_amount : 0) + daily * car.daily_rate;

    rental.total = total;
    rental.end_date = new Date();
    rental.car.available = true;

    await this.repository.save(rental);
    return { ...rental, total };
  }
}

export { FinalizeRentalUseCase };
