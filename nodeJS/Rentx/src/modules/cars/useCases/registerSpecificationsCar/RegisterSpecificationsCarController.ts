import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterSpecificationsCarUseCase } from './RegisterSpecificationsCarUseCase';

class RegisterSpecificationsCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const useCase = container.resolve(RegisterSpecificationsCarUseCase);
    await useCase.execute({ car_id: id as string, specifications_id });

    return response.send();
  }
}

export { RegisterSpecificationsCarController };
