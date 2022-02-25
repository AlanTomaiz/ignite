import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';
import { IUsersRepository } from '../interfaces/IUsersRepository';
import { ICreateUser } from '../types/ICreateUser';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async save(data: ICreateUser): Promise<void> {
    await this.repository.save(data);
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
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UsersRepository };
