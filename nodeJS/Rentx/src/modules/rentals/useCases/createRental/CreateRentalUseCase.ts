import { Rental } from '@modules/rentals/infra/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: string;
}

const minimumLeaseTerm = 24; // 24Hours

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private repository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.repository.findOpenRentalByCar(car_id);
    if (carUnavailable) {
      throw new AppError('Car unavailable in this moment');
    }

    const userOpenRental = await this.repository.findOpenRentalByUser(user_id);
    if (userOpenRental) {
      throw new AppError('This user has rental open in moment.');
    }

    const dateNow = new Date().setSeconds(0);
    const expectedReturnDateFormat =
      this.dateProvider.parseIso(expected_return_date);

    const compareRentalDate = this.dateProvider.compareInHours(
      expectedReturnDateFormat,
      dateNow,
    );

    if (compareRentalDate < minimumLeaseTerm) {
      throw new AppError('Invalid return time to the rental.');
    }

    const rental = await this.repository.create({
      car_id,
      user_id,
      expected_return_date: expectedReturnDateFormat,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
