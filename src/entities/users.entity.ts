import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AdminUser } from './admin-user.entity';
import { Cycle } from './cycle.entity';
import { Deposit } from './deposit.entity';
import { KycDocument } from './kyc-document.entity';
import { LedgerEntry } from './ledger.entity';
import { LoyaltySnapshot } from './loyalty.entity';
import { Notification } from './notification.entity';
import { RankHistory } from './rank-history.entity';
import { Referral } from './referral.entity';
import { ReferralEarning } from './referral-earning.entity';
import { RoiLog } from './roi-log.entity';
import { Wallet } from './wallet.entity';
import { Withdrawal } from './withdrawal.entity';
import { WithdrawalAddress } from './withdrawal-address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ default: 'INACTIVE' })
  account_state: string; // ACTIVE, GRACE, INACTIVE, TERMINATED, FROZEN

  @Column({ default: 'REQUIRED' })
  kyc_status: string; // REQUIRED, SUBMITTED, VERIFIED, REJECTED, NOT_REQUIRED

  // Financial core
  @Column({ type: 'numeric', precision: 18, scale: 8, default: 0 })
  principal: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 0 })
  active_deposit: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 0 })
  total_profit: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 0 })
  total_balance: number;

  // Cycle management
  @Column({ default: 'DAILY' })
  timeframe: string;

  @Column({ type: 'timestamptz', nullable: true })
  cycle_start_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  grace_end_date: Date;

  @Column({ default: 0 })
  completed_cycles: number;

  @Column({ default: 0 })
  trading_days_count: number;

  @Column({ type: 'date', nullable: true })
  last_roi_date: string;

  @Column({ type: 'date', nullable: true })
  next_withdrawal_date: string;

  @Column({ default: 0 })
  breach_count: number;

  // Rank
  @Column({ default: 'New Member' })
  rank: string;

  @Column({ default: 1 })
  rank_level: number;

  // Loyalty
  @Column({ type: 'numeric', precision: 5, scale: 2, default: 10 })
  loyalty_score: number;

  // Referral
  @Column({ nullable: true, unique: true })
  referral_code: string;

  @Column({ type: 'uuid', nullable: true })
  referred_by: string;

  @ManyToOne(() => User, (user) => user.referred_users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'referred_by' })
  referrer: User;

  // Security
  @Column({ nullable: true })
  two_fa_secret: string;

  @Column({ default: false })
  two_fa_enabled: boolean;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ nullable: true })
  email_verify_token: string;

  @Column({ nullable: true })
  email_verify_code: string;

  @Column({ type: 'timestamptz', nullable: true })
  email_verify_expires: Date;

  @Column({ nullable: true })
  password_reset_token: string;

  @Column({ type: 'timestamptz', nullable: true })
  password_reset_expires: Date;

  @Column({ type: 'timestamptz', nullable: true })
  last_login_at: Date;

  @Column({ nullable: true })
  last_login_ip: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => AdminUser, (adminUser) => adminUser.user)
  admin_profile: AdminUser;

  @OneToMany(() => Deposit, (deposit) => deposit.user)
  deposits: Deposit[];

  @OneToMany(() => Withdrawal, (withdrawal) => withdrawal.user)
  withdrawals: Withdrawal[];

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];

  @OneToMany(() => LedgerEntry, (entry) => entry.user)
  ledger_entries: LedgerEntry[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => KycDocument, (document) => document.user)
  kyc_documents: KycDocument[];

  @OneToMany(() => WithdrawalAddress, (address) => address.user)
  withdrawal_addresses: WithdrawalAddress[];

  @OneToMany(() => Cycle, (cycle) => cycle.user)
  cycles: Cycle[];

  @OneToMany(() => RoiLog, (log) => log.user)
  roi_logs: RoiLog[];

  @OneToMany(() => LoyaltySnapshot, (snapshot) => snapshot.user)
  loyalty_snapshots: LoyaltySnapshot[];

  @OneToMany(() => RankHistory, (history) => history.user)
  rank_history: RankHistory[];

  @OneToMany(() => Referral, (referral) => referral.referrer)
  referrals_made: Referral[];

  @OneToOne(() => Referral, (referral) => referral.referred)
  referral_received: Referral;

  @OneToMany(() => ReferralEarning, (earning) => earning.referrer)
  referral_earnings_as_referrer: ReferralEarning[];

  @OneToMany(() => ReferralEarning, (earning) => earning.referred)
  referral_earnings_as_referred: ReferralEarning[];

  @OneToMany(() => User, (user) => user.referrer)
  referred_users: User[];
}
