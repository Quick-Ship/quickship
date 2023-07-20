import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('package_status')
export class PackageStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'status',
    nullable: false,
  })
  status: string;

  @Column({
    name: 'description',
    nullable: false,
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
