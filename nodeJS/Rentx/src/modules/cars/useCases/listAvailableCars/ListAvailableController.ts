import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category } = request.query;

    const useCase = container.resolve(ListAvailableCarsUseCase);
    const list = await useCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category as string,
    });

    return response.json(list);
  }
}

export { ListAvailableCarsController };
