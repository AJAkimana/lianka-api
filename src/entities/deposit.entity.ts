import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AdminUser } from './admin-user.entity';
import { User } from './users.entity';

@Entity('deposits')
export class Deposit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.deposits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  amount: number;

  @Column()
  network: string;

  @Column()
  txid: string;

  @Column({ default: 'DAILY' })
  plan: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  reviewed_by: string;

  @ManyToOne(() => AdminUser, (admin) => admin.reviewed_deposits, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'reviewed_by' })
  reviewed_by_admin: AdminUser;

  @Column({ type: 'timestamptz', nullable: true })
  reviewed_at: Date;

  @Column({ nullable: true })
  rejection_reason: string;

  @Column({ nullable: true })
  admin_notes: string;

  @Column({ default: false })
  is_duplicate: boolean;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  submitted_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
