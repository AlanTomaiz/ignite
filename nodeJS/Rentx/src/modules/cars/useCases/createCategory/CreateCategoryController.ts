import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const useCase = container.resolve(CreateCategoryUseCase);
    await useCase.execute({ title, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
