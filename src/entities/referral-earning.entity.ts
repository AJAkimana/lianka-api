import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Referral } from './referral.entity';
import { User } from './users.entity';

@Entity('referral_earnings')
export class ReferralEarning {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  referral_id: string;

  @ManyToOne(() => Referral, (referral) => referral.earnings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referral_id' })
  referral: Referral;

  @Column('uuid')
  referrer_id: string;

  @ManyToOne(() => User, (user) => user.referral_earnings_as_referrer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referrer_id' })
  referrer: User;

  @Column('uuid')
  referred_id: string;

  @ManyToOne(() => User, (user) => user.referral_earnings_as_referred, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referred_id' })
  referred: User;

  @Column()
  earning_type: string;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  amount: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  source_amount: number;

  @Column({ type: 'numeric', precision: 8, scale: 4 })
  rate_applied: number;

  @CreateDateColumn()
  created_at: Date;
}
