import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindRentalsUserUseCase } from './FindRentalsUserUseCase';

class FindRentalsUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const useCase = container.resolve(FindRentalsUserUseCase);
    const rentalList = await useCase.execute(user_id);

    return response.json(rentalList);
  }
}

export { FindRentalsUserController };
