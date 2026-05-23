import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('withdrawal_addresses')
export class WithdrawalAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.withdrawal_addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  network: string;

  @Column()
  address: string;

  @Column({ default: true })
  is_verified: boolean;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  last_updated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  next_update_allowed_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
