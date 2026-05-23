import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Check,
} from 'typeorm';
import { Deposit } from './deposit.entity';
import { User } from './users.entity';

@Entity('payment_events')
@Check(`"event_type" IN ('REDEPOSIT', 'ON_TIME_REDEPOSIT', 'MISSED_REDEPOSIT')`)
export class PaymentEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_payment_events_user_id')
  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.payment_events, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index('IDX_payment_events_type')
  @Column()
  event_type: string;

  @Column({ type: 'int' })
  cycle_number: number;

  @Column('uuid', { nullable: true })
  deposit_id: string;

  @ManyToOne(() => Deposit, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'deposit_id' })
  deposit: Deposit;

  @Column({ type: 'timestamptz', nullable: true })
  grace_end_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  redeposit_date: Date;

  @Column({ type: 'int', nullable: true })
  days_before_end: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;
}
