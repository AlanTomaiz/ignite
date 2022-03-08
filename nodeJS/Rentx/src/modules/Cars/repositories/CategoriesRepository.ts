import { getRepository, Repository } from 'typeorm';

import { Category } from '../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../interfaces/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ title, description }: ICreateCategoryDTO): Promise<void> {
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
