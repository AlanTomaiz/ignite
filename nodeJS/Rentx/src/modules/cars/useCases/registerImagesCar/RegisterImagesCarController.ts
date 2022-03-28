import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterImagesCarUseCase } from './RegisterImagesCarUseCase';

interface IFiles {
  filename: string;
}

class RegisterImagesCarControlle {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const imagesArray = request.files as IFiles[];
    const images = imagesArray.map(item => item.filename);

    const useCase = container.resolve(RegisterImagesCarUseCase);
    await useCase.execute({ car_id: id as string, images });

    return response.status(201).send();
  }
}

export { RegisterImagesCarControlle };
