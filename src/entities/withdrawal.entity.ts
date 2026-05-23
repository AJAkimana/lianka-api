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

@Entity('withdrawals')
export class Withdrawal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.withdrawals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  wallet_type: string;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  amount: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 2.1 })
  network_fee: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  final_amount: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 0 })
  termination_fee: number;

  @Column()
  address: string;

  @Column()
  network: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ type: 'uuid', nullable: true })
  reviewed_by: string;

  @ManyToOne(() => AdminUser, (admin) => admin.reviewed_withdrawals, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'reviewed_by' })
  reviewed_by_admin: AdminUser;

  @Column({ type: 'timestamptz', nullable: true })
  reviewed_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at: Date;

  @Column({ nullable: true })
  rejection_reason: string;

  @Column({ nullable: true })
  admin_notes: string;

  @Column({ nullable: true })
  txid_sent: string;

  @Column({ type: 'numeric', precision: 18, scale: 8, nullable: true })
  snapshot_profit_balance: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, nullable: true })
  snapshot_total_balance: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, nullable: true })
  snapshot_principal: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  snapshot_loyalty_score: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  requested_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
