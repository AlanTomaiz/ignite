import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const useCase = container.resolve(ImportCategoriesUseCase);
    await useCase.execute(file);

    return response.send();
  }
}

export { ImportCategoriesController };
