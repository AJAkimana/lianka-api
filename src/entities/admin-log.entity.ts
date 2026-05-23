import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AdminUser } from './admin-user.entity';

@Entity('admin_logs')
export class AdminLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  admin_id: string;

  @ManyToOne(() => AdminUser, (admin) => admin.admin_logs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'admin_id' })
  admin: AdminUser;

  @Column()
  action: string;

  @Column()
  target_type: string;

  @Column('uuid', { nullable: true })
  target_id: string;

  @Column({ type: 'jsonb', nullable: true })
  before_state: any;

  @Column({ type: 'jsonb', nullable: true })
  after_state: any;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  ip_address: string;

  @CreateDateColumn()
  created_at: Date;
}
