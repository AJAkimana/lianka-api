import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: 'green' })
  dot_color: string;

  @Column({ default: false })
  is_read: boolean;

  @Column({ default: false })
  is_critical: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @CreateDateColumn()
  created_at: Date;
}
