import { inject, injectable } from 'tsyringe';
import { hash, compare } from 'bcrypt';

import { AppError } from '@shared/errors/AppError';
import { ITokensRepository } from '@modules/accounts/repositories/ITokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const hasToken = await this.tokensRepository.findByToken(token);
    if (!hasToken) {
      throw new AppError('Token is invalid!');
    }

    const tokenIsValid =
      this.dateProvider.compareIsBefore(new Date(), hasToken.expires_date) &&
      hasToken.is_active;

    if (!tokenIsValid) {
      throw new AppError('Token is invalid!');
    }

    const user = await this.usersRepository.findById(hasToken.user_id);
    const samePassword = await compare(password, user.password);
    if (samePassword) {
      throw new AppError('The password must be different from the previous.');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
    await this.tokensRepository.disable(hasToken.id);
  }
}

export { ResetPasswordUseCase };
