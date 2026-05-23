import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AdminUser } from './admin-user.entity';

@Entity('roi_rates')
export class RoiRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  timeframe: string;

  @Column({ type: 'numeric', precision: 8, scale: 4 })
  rate: number;

  @Column({ type: 'uuid', nullable: true })
  set_by: string;

  @ManyToOne(() => AdminUser, (admin) => admin.roi_rates_set, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'set_by' })
  set_by_admin: AdminUser;

  @CreateDateColumn()
  created_at: Date;
}
