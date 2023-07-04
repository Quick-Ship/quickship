import { ShipmentEntity } from 'src/modules/shipment/entities/shipment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'directions' })
export class DirectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'neigthboorhood' })
  neigthboorhood: string;

  @Column({ name: 'municipality' })
  municipality: string;

  @Column({ name: 'state' })
  state: string;

  @Column({ name: 'external_number', nullable: false })
  externalNumber: string;

  @Column({ name: 'internal_number', nullable: true })
  internalNumber: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'latitude', type: 'float' })
  latitude: number;

  @Column({ name: 'longitude', type: 'float' })
  longitude: number;

  @Column({ name: 'shipment_id', nullable: true })
  shipmentId: number;
  @OneToMany(
    (): ObjectType<ShipmentEntity> => ShipmentEntity,
    (shipment) => shipment.id,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'shipment_id' })
  shipment?: ShipmentEntity;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updates_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt!: Date;
}
