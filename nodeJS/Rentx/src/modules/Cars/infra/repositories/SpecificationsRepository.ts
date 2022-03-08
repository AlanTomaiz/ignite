import { getRepository, Repository } from 'typeorm';

import { ISpecificationsRepository } from '@modules/Cars/repositories/ISpecificationsRepository';
import { ICreateSpecification } from '@modules/Cars/types/ICreateSpecification';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ title, description }: ICreateSpecification): Promise<void> {
    const specification = this.repository.create({ title, description });
    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(title: string): Promise<Specification> {
    const specification = this.repository.findOne({ title });
    return specification;
  }
}

export { SpecificationsRepository };
