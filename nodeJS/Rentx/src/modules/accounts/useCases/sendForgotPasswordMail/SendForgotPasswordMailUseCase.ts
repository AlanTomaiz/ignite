import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import { resolve } from 'path';

import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ITokensRepository } from '@modules/accounts/repositories/ITokensRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { IViewerProvider } from '@shared/container/providers/ViewerProvider/IViewerProvider';

const tokenExpirationTime = 15; // 15 Minutes

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('ViewerProvider')
    private viewerProvider: IViewerProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('This user not found or does not exists.');
    }

    const token = uuidV4();
    const expires_date = this.dateProvider.addMinutes(tokenExpirationTime);
    await this.tokensRepository.create({
      user_id: user.id,
      token,
      expires_date,
    });

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'templates',
      'emails',
      'ForgotPassword.hbs',
    );

    const templateHTML = this.viewerProvider.parseHtmlToString(templatePath, {
      name: user.name,
      url: `${process.env.CLIENT_URL}/users/reset_password&token=${token}`,
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      templateHTML,
    );
  }
}

export { SendForgotPasswordMailUseCase };
