import { AuditableEntity } from 'src/domain/shared/global-dto/auditable.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity('users')
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'user_id',
  })
  user_id!: number;

  @Column({
    type: 'text',
    name: 'first_name',
    nullable: false,
  })
  first_name!: string;

  @Column({
    type: 'text',
    name: 'last_name',
    nullable: false,
  })
  last_name!: string;

  @Column({
    type: 'text',
    name: 'email',
    nullable: false,
  })
  email!: string;

  @Column({
    type: 'text',
    name: 'password',
    nullable: false,
  })
  password!: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];
}
