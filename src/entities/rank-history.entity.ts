import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('rank_history')
export class RankHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.rank_history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  rank: string;

  @Column()
  rank_level: number;

  @CreateDateColumn()
  achieved_at: Date;
}
