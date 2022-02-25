import { getRepository, Repository } from 'typeorm';

import {
  ICreateCategoryDTO,
  ICategoriesRepository,
} from '../interfaces/ICategoriesRepository';

import { Category } from '../entities/Category';

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
