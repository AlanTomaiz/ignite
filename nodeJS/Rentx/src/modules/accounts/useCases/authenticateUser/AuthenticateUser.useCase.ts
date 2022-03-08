import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/interfaces/IUsersRepository';

interface IRequest {
  email: string;
  pass: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  async execute({ email, pass }: IRequest): Promise<IResponse> {
    const userAlreadyExists = await this.repository.findByEmail(email);
    if (!userAlreadyExists) {
      throw new AppError('Email or Password incorrect!');
    }

    const { id, name, password } = userAlreadyExists;
    const { secret, expiresIn } = authConfig.jwt;

    const hashMatch = await compare(pass, password);
    if (!hashMatch) {
      throw new AppError('Email or Password incorrect!');
    }

    const token = sign({}, secret, { subject: id, expiresIn });

    return { token, user: { name, email } };
  }
}

export { AuthenticateUserUseCase };
