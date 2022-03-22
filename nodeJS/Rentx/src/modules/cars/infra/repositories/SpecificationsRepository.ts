import { getRepository, Repository } from 'typeorm';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { ICreateSpecification } from '@modules/cars/types/ICreateSpecification';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    title,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = this.repository.create({ title, description });
    await this.repository.save(specification);
    return specification;
  }

  async listAll(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  async findByName(title: string): Promise<Specification> {
    return this.repository.findOne({ title });
  }
}

export { SpecificationsRepository };
