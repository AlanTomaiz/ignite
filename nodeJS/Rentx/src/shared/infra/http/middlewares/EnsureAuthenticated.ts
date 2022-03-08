import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

const EnsureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  try {
    const [, token] = authHeader.split(' ');
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};

export { EnsureAuthenticated };
