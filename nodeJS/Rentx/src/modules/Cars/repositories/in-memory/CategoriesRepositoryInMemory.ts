import { v4 as uuidV4 } from 'uuid';

import { Category } from '@modules/Cars/entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/Cars/interfaces/ICategoriesRepository';

class CategoryRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { id: uuidV4(), ...data, at_created: new Date() });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(title: string): Promise<Category> {
    return this.categories.find(category => category.title === title);
  }
}

export { CategoryRepositoryInMemory };
