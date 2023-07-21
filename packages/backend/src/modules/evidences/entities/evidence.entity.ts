import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/*Local Import */
import { PackageEntity } from 'src/modules/packages/entities/package.entity';

@Entity({ name: 'evidence' })
export class EvidenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'person_received' })
  personReceived: string;

  @Column({ name: 'comments' })
  comments?: string;

  @Column({ name: 'url' })
  url: string;

  @Column({
    type: 'int',
    name: 'package_id',
    nullable: true,
  })
  packageId?: number;

  @ManyToOne(() => PackageEntity, (pack) => pack.evidences, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' })
  package?: PackageEntity;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt!: Date;
}
