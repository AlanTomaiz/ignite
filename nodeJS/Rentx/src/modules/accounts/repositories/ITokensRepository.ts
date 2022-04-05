import { Token } from '../infra/entities/Token';
import { ICreateToken } from '../types/ICreateToken';

interface ITokensRepository {
  create(data: ICreateToken): Promise<void>;
  disable(token_id: string): Promise<void>;
  findByToken(token: string): Promise<Token>;
}

export { ITokensRepository };
