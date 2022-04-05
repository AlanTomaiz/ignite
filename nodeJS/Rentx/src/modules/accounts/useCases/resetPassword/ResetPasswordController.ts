import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const useCase = container.resolve(ResetPasswordUseCase);
    await useCase.execute({ token: token as string, password });

    return response.send();
  }
}

export { ResetPasswordController };
