import { getRepository, Repository } from 'typeorm';

import { ICategoriesRepository } from '@modules/Cars/repositories/ICategoriesRepository';
import { ICreateCategory } from '@modules/Cars/types/ICreateCategory';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ title, description }: ICreateCategory): Promise<void> {
    const category = this.repository.create({ title, description });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(title: string): Promise<Category> {
    const category = await this.repository.findOne({ title });
    return category;
  }
}

export { CategoriesRepository };
