import { Category } from '../infra/entities/Category';
import { ICreateCategory } from '../types/ICreateCategory';

interface ICategoriesRepository {
  create(data: ICreateCategory): Promise<Category>;

  listAll(): Promise<Category[]>;

  findByName(title: string): Promise<Category>;
}

export { ICategoriesRepository };
