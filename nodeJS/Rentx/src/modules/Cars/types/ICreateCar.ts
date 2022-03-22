import { Specification } from '../infra/entities/Specification';

type ICreateCar = {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  specifications?: Specification[];
  brand: string;
};

export { ICreateCar };
