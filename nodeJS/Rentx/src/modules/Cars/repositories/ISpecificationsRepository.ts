import { Specification } from '../infra/entities/Specification';
import { ICreateSpecification } from '../types/ICreateSpecification';

interface ISpecificationsRepository {
  create(data: ICreateSpecification): Promise<Specification>;

  listAll(): Promise<Specification[]>;

  findByIds(ids: string[]): Promise<Specification[]>;

  findByName(title: string): Promise<Specification>;
}

export { ISpecificationsRepository };
