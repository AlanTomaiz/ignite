import { AppError } from '@shared/errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { ICreateUser } from '@modules/accounts/types/ICreateUser';
import { CreateUserUseCase } from '../createUser/CreateUser.useCase';
import { AuthenticateUserUseCase } from './AuthenticateUser.useCase';

describe('# Authenticate User', () => {
  const repository = new UsersRepositoryInMemory();
  const createUserUseCase = new CreateUserUseCase(repository);
  const authenticateUseCase = new AuthenticateUserUseCase(repository);

  const user: ICreateUser = {
    name: 'User Test',
    email: 'test@test.com',
    password: '123456',
    driver_license: '000123',
  };

  beforeEach(async () => {
    await createUserUseCase.execute(user);
  });

  it('Shold not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUseCase.execute({
        email: 'error@test.com',
        pass: 'incorrectPass',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Shold not be able authenticated user with incorrect password', () => {
    expect(async () => {
      await authenticateUseCase.execute({
        email: user.email,
        pass: 'incorrectPass',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Shold be able authenticate an user', async () => {
    const result = await authenticateUseCase.execute({
      email: user.email,
      pass: user.password,
    });

    expect(result).toHaveProperty('token');
  });
});
