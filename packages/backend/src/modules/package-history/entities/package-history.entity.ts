import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('package_history')
export class PackageHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'package_status',
    nullable: true,
  })
  status: string;

  @Column({
    name: 'package_id',
    nullable: true,
  })
  idPackage: number;

  @Column({
    name: 'client_description',
    nullable: true,
  })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;
}
