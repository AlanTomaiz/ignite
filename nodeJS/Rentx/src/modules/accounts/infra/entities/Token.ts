import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_tokens')
class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  token: string;

  @Column()
  expires_date: Date;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}

export { Token };
