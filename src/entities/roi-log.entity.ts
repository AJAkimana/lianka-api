import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('roi_logs')
export class RoiLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.roi_logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'date' })
  date: string;

  @Column()
  timeframe: string;

  @Column({ type: 'numeric', precision: 8, scale: 4 })
  rate_applied: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  active_deposit: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  profit_earned: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  total_profit_after: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  total_balance_after: number;

  @Column({ default: false })
  triggered_grace: boolean;

  @CreateDateColumn()
  created_at: Date;
}
