import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password: pass } = request.body;

    const useCase = container.resolve(AuthenticateUserUseCase);
    const { token, user } = await useCase.execute({ email, pass });

    return response.json({ token, user });
  }
}

export { AuthenticateUserController };
