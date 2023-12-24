import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity('User')
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
}
