import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { User } from '../../users/entities/user.entity';

@Entity('favorites')
export class Favorite extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'favorite_id',
  })
  favorite_id!: number;

  @Column({
    type: 'int',
    name: 'user_id',
    nullable: false,
  })
  user_id!: number;

  @Column({
    type: 'int',
    name: 'movie_id',
    nullable: false,
  })
  movie_id!: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
