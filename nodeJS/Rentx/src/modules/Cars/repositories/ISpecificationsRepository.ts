import { Specification } from '../entities/Specification';
import { ICreateSpecification } from '../types/ICreateSpecification';

interface ISpecificationsRepository {
  create(data: ICreateSpecification): Promise<void>;

  list(): Promise<Specification[]>;

  findByName(title: string): Promise<Specification>;
}

export { ISpecificationsRepository };
