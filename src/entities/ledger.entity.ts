import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('ledger_entries')
export class LedgerEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.ledger_entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  reference_type: string;

  @Column('uuid', { nullable: true })
  reference_id: string;

  @Column()
  entry_type: string; // CREDIT, DEBIT

  @Column()
  wallet_type: string;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  amount: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  balance_before: number;

  @Column({ type: 'numeric', precision: 18, scale: 8 })
  balance_after: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
