import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';
import { ReferralEarning } from './referral-earning.entity';

@Entity('referrals')
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  referrer_id: string;

  @ManyToOne(() => User, (user) => user.referrals_made, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referrer_id' })
  referrer: User;

  @Column('uuid', { unique: true })
  referred_id: string;

  @OneToOne(() => User, (user) => user.referral_received, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referred_id' })
  referred: User;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 0 })
  total_deposit_bonus: number;

  @Column({ type: 'numeric', precision: 18, scale: 8, default: 0 })
  total_roi_bonus: number;

  @Column({ type: 'timestamptz', nullable: true })
  activated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => ReferralEarning, (earning) => earning.referral)
  earnings: ReferralEarning[];
}
