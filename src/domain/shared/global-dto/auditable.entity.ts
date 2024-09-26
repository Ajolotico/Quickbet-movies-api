import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditableEntity {
  @Column({
    type: 'boolean',
    name: 'is_active',
    nullable: false,
    default: true,
  })
  is_active: boolean;
  @UpdateDateColumn({
    type: 'text',
    name: 'updated_at',
    nullable: true,
  })
  updated_at: Date;
  @CreateDateColumn({
    type: 'text',
    name: 'created_at',
    nullable: false,
  })
  created_at: Date;
}
