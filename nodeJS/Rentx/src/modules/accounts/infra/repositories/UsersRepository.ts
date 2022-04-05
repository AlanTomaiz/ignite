import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUser } from '@modules/accounts/types/ICreateUser';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async save(data: ICreateUser): Promise<void> {
    await this.repository.save({ ...data });
  }

  async create(data: ICreateUser): Promise<void> {
    const { name, email, password, driver_license } = data;
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}

export { UsersRepository };
