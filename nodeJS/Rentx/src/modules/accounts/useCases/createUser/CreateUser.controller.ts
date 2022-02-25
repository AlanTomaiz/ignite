import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUser.useCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;

    const useCase = container.resolve(CreateUserUseCase);
    await useCase.execute({ name, email, password, driver_license });

    return response.status(201).send();
  }
}

export { CreateUserController };
