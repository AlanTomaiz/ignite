import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRental.useCase';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { car_id, expected_return_date } = request.body;

    const useCase = container.resolve(CreateRentalUseCase);
    await useCase.execute({ car_id, user_id, expected_return_date });

    return response.status(201).send();
  }
}

export { CreateRentalController };
