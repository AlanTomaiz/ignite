import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateSpecification.useCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const useCase = container.resolve(CreateSpecificationUseCase);
    await useCase.execute({ title, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
