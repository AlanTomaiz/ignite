import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCar.useCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    } = request.body;

    const useCase = container.resolve(CreateCarUseCase);
    await useCase.execute({
      name,
      category_id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });

    return response.status(201).send();
  }
}

export { CreateCarController };
