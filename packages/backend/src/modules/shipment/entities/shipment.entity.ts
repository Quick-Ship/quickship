import { ClientEntity } from 'src/modules/client/entities/client.entity';
import { DirectionEntity } from 'src/modules/directions/entities/direction.entity';
import { InvoiceEntity } from 'src/modules/invoices/entities/invoice.entity';
import { MessengerEntity } from 'src/modules/messengers/entities/messenger.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import { WarehouseShipmentEntity } from 'src/modules/warehouse-shipment/entities/warehouse-shipment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @OneToMany(() => PackageEntity, (package_) => package_.shipment.packages, {
    nullable: true,
  })
  packages?: PackageEntity[];

  @Column({
    type: 'int',
    name: 'warehouse_shipment_id',
    nullable: true,
  })
  warehouseShipmentId: number;

  @OneToMany(() => WarehouseShipmentEntity, (who) => who.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'warehouse_shipment_id' })
  warehouseShipment?: WarehouseShipmentEntity;

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
