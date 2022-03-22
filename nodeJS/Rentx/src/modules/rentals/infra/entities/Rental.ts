import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rentals')
class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export { Rental };
