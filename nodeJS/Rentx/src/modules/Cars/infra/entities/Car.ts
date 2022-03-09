import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  available: boolean;

  @CreateDateColumn()
  created_at: Date;
}

export { Car };
