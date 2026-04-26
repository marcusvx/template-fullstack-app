import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Hello World', length: 255 })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
