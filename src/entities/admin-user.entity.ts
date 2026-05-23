import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AdminLog } from './admin-log.entity';
import { Deposit } from './deposit.entity';
import { KycDocument } from './kyc-document.entity';
import { RoiRate } from './roi-rate.entity';
import { User } from './users.entity';
import { Withdrawal } from './withdrawal.entity';

@Entity('admin_users')
export class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  user_id: string;

  @OneToOne(() => User, (user) => user.admin_profile, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column()
  full_name: string;

  @Column({ default: 'SUPPORT' })
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  two_fa_secret: string;

  @Column({ default: false })
  two_fa_enabled: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  last_login_at: Date;

  @Column({ nullable: true })
  last_login_ip: string;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @ManyToOne(() => AdminUser, (admin) => admin.created_admins, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by' })
  created_by_admin: AdminUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => AdminUser, (admin) => admin.created_by_admin)
  created_admins: AdminUser[];

  @OneToMany(() => AdminLog, (log) => log.admin)
  admin_logs: AdminLog[];

  @OneToMany(() => KycDocument, (document) => document.reviewed_by_admin)
  reviewed_kyc_documents: KycDocument[];

  @OneToMany(() => Deposit, (deposit) => deposit.reviewed_by_admin)
  reviewed_deposits: Deposit[];

  @OneToMany(() => Withdrawal, (withdrawal) => withdrawal.reviewed_by_admin)
  reviewed_withdrawals: Withdrawal[];

  @OneToMany(() => RoiRate, (rate) => rate.set_by_admin)
  roi_rates_set: RoiRate[];
}
