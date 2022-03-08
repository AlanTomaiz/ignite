import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/accounts/entities/User';
import { ICreateUser } from '@modules/accounts/types/ICreateUser';
import { IUsersRepository } from '@modules/accounts/interfaces/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async save(data: ICreateUser): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(data: ICreateUser): Promise<void> {
    const { name, email, password, driver_license } = data;
    const user = new User();

    Object.assign(user, {
      id: uuidV4(),
      name,
      email,
      password,
      driver_license,
      at_created: new Date(),
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}

export { UsersRepositoryInMemory };
