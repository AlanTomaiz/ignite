import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';

const EnsureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id: user_id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(user_id);

  if (!user.is_admin) {
    throw new AppError(`User isn't admin!`);
  }

  return next();
};

export { EnsureAdmin };
