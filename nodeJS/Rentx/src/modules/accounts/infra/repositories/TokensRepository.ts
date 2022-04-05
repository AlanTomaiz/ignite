import { getRepository, Repository } from 'typeorm';

import { ITokensRepository } from '@modules/accounts/repositories/ITokensRepository';
import { ICreateToken } from '@modules/accounts/types/ICreateToken';
import { Token } from '../entities/Token';

class TokensRepository implements ITokensRepository {
  private repository: Repository<Token>;

  constructor() {
    this.repository = getRepository(Token);
  }

  async create({ user_id, token, expires_date }: ICreateToken): Promise<void> {
    const tokenCreate = this.repository.create({
      user_id,
      token,
      expires_date,
    });

    await this.repository.save(tokenCreate);
  }

  async disable(token_id: string): Promise<void> {
    await this.repository.save({
      id: token_id,
      is_active: false,
    });
  }

  async findByToken(token: string): Promise<Token> {
    return this.repository.findOne({ token });
  }
}

export { TokensRepository };
