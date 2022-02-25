import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  title: string;
  description: string;
}

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<void>;

  list(): Promise<Category[]>;

  findByName(title: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
