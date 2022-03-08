import { User } from '../infra/entities/User';
import { ICreateUser } from '../types/ICreateUser';

interface IUsersRepository {
  save(data: ICreateUser): Promise<void>;
  create(data: ICreateUser): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
