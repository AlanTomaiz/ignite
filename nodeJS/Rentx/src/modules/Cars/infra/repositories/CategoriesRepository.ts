import { getRepository, Repository } from 'typeorm';

import { ICategoriesRepository } from '@modules/Cars/repositories/ICategoriesRepository';
import { ICreateCategory } from '@modules/Cars/types/ICreateCategory';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ title, description }: ICreateCategory): Promise<Category> {
    const category = this.repository.create({ title, description });
    await this.repository.save(category);
    return category;
  }

  async listAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(title: string): Promise<Category> {
    return this.repository.findOne({ title });
  }
}

export { CategoriesRepository };
