import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FinalizeRentalUseCase } from './FinalizeRentalUseCase';

class FinalizeRentalCotroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { rental_id } = request.params;

    const useCase = container.resolve(FinalizeRentalUseCase);
    const rental = await useCase.execute(rental_id);

    return response.json(rental);
  }
}

export { FinalizeRentalCotroller };
