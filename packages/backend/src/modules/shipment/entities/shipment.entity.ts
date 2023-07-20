import { MessengerEntity } from 'src/modules/messengers/entities/messenger.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import { ShipmentStatusEntity } from 'src/modules/shipmet-status/entities/shipment-status.entity';
import { WarehouseShipmentEntity } from 'src/modules/warehouse-shipment/entities/warehouse-shipment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'shipment' })
export class ShipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'price', type: 'float', default: 0 })
  price: number;

  @Column({ name: 'comments', type: 'text', default: 0 })
  comments: string;

  @OneToMany(() => PackageEntity, (package_) => package_.shipment, {
    nullable: true,
  })
  packages?: PackageEntity[];

  @Column({
    type: 'int',
    name: 'warehouse_shipment_id',
    nullable: true,
  })
  warehouseShipmentId: number;

  @ManyToOne(() => WarehouseShipmentEntity, (who) => who.shipment, {
    nullable: true,
  })
  @JoinColumn({ name: 'warehouse_shipment_id' })
  warehouseShipment?: WarehouseShipmentEntity;

  @Column({
    type: 'int',
    name: 'shipment_status_id',
    nullable: true,
  })
  shipmentStatusId: number;

  @ManyToOne(() => ShipmentStatusEntity, (status) => status.shipment, {
    nullable: true,
  })
  @JoinColumn({ name: 'shipment_status_id' })
  shipmentStatus?: ShipmentStatusEntity;

  @Column({
    type: 'int',
    name: 'messenger_id',
    nullable: true,
  })
  messengerId: number;

  @ManyToOne(() => MessengerEntity, (messenger) => messenger.shipment, {
    nullable: true,
  })
  @JoinColumn({ name: 'messenger_id' })
  messenger?: ShipmentStatusEntity;

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
