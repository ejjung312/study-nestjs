import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // User-Board 관계 설정
  // inversdSide - user에서 board로 접근하는 방법 명시
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;

  @Column()
  userId: number;
}
