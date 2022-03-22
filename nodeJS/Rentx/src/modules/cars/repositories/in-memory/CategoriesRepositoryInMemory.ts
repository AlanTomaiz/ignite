import { v4 as uuidV4 } from 'uuid';

import { Category } from '@modules/cars/infra/entities/Category';
import { ICreateCategory } from '@modules/cars/types/ICreateCategory';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoryRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create(data: ICreateCategory): Promise<Category> {
    const category = new Category();
    Object.assign(category, { id: uuidV4(), ...data, created_at: new Date() });

    this.categories.push(category);
    return category;
  }

  async listAll(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(title: string): Promise<Category> {
    return this.categories.find(category => category.title === title);
  }
}

export { CategoryRepositoryInMemory };
