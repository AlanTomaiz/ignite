import { AppError } from '@shared/errors/AppError';
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategory.useCase';

describe('# Create categories', () => {
  const repository = new CategoryRepositoryInMemory();
  const createUseCase = new CreateCategoryUseCase(repository);

  it('Shold be create a new category', async () => {
    await createUseCase.execute({
      title: 'Category Test',
      description: 'Category Test',
    });

    const category = await repository.findByName('Category Test');
    expect(category).toHaveProperty('id');
  });

  it('Shold be a error on try create a category exists with same title', async () => {
    expect(async () => {
      await createUseCase.execute({
        title: 'Category Test',
        description: 'Category Test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
