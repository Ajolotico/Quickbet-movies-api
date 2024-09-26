import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('blacklist')
export class Blacklist extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'blacklist_id',
  })
  blacklist_id!: number;

  @Column({
    type: 'text',
    name: 'token',
    nullable: false,
  })
  token!: string;
}
