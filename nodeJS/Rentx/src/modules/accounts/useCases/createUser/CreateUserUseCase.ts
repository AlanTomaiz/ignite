import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { ICreateUser } from '@modules/accounts/types/ICreateUser';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  async execute(data: ICreateUser): Promise<void> {
    const { name, email, password, driver_license } = data;

    const passwordHash = await hash(password, 8);

    await this.repository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
