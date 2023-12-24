import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from '../board/board.entity';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @OneToMany(() => BoardEntity, (board) => board.user)
  boards: BoardEntity[];

  @Column({ select: false, nullable: true, insert: false, update: false })
  boardCount?: number;
}
