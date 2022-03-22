import { v4 as uuidV4 } from 'uuid';

import { Specification } from '@modules/Cars/infra/entities/Specification';
import { ICreateSpecification } from '@modules/Cars/types/ICreateSpecification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({
    title,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      id: uuidV4(),
      title,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
    return specification;
  }

  async listAll(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(item => ids.includes(item.id));
  }

  async findByName(title: string): Promise<Specification> {
    return this.specifications.find(item => item.title === title);
  }
}

export { SpecificationsRepositoryInMemory };
