import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  title: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;

  list(): Promise<Specification[]>;

  findByName(title: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
