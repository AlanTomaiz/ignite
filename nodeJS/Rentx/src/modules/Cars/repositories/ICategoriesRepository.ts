import { Category } from '../entities/Category';
import { ICreateCategory } from '../types/ICreateCategory';

interface ICategoriesRepository {
  create(data: ICreateCategory): Promise<void>;

  list(): Promise<Category[]>;

  findByName(title: string): Promise<Category>;
}

export { ICategoriesRepository };
