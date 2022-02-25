import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadUserAvatarUseCase } from './UploadUserAvatar.useCase';

class UploadUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const avatar_filename = request.file.filename;

    const useCase = container.resolve(UploadUserAvatarUseCase);
    await useCase.execute({ user_id, avatar_filename });

    return response.status(204).send();
  }
}

export { UploadUserAvatarController };
