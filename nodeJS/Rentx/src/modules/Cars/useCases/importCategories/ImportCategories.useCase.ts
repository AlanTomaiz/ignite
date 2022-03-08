import { inject, injectable } from 'tsyringe';
import { parse as csvParse } from 'csv-parse';
import fs from 'fs';

import { ICreateCategory } from '@modules/Cars/types/ICreateCategory';
import { ICategoriesRepository } from '@modules/Cars/repositories/ICategoriesRepository';

type IImportCategory = ICreateCategory;

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);

      const fileParse = csvParse();
      stream.pipe(fileParse);

      fileParse.on('data', async line => {
        const [title, description] = line;
        categories.push({ title, description });
      });

      fileParse
        .on('end', () => resolve(categories))
        .on('error', error => reject(error));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async ({ title, description }) => {
      const categoryExists = await this.repository.findByName(title);

      if (!categoryExists) {
        await this.repository.create({ title, description });
      }
    });

    // Delete temp file
    fs.unlinkSync(file.path);
  }
}

export { ImportCategoriesUseCase };
