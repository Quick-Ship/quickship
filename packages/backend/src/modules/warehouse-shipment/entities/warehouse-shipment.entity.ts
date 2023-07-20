import { ClientEntity } from 'src/modules/client/entities/client.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { DirectionEntity } from 'src/modules/directions/entities/direction.entity';
import { ShipmentEntity } from 'src/modules/shipment/entities/shipment.entity';
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

@Entity({ name: 'warehouse_shipment' })
export class WarehouseShipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'instructions', type: 'text', default: 0 })
  instructions: string;

  @Column({
    type: 'text',
    name: 'direction_id',
    nullable: true,
  })
  directionId: number;

  @ManyToOne(() => DirectionEntity, (direction) => direction.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'direction_id' })
  direction?: DirectionEntity;

  @Column({
    type: 'text',
    name: 'contact_id',
    nullable: true,
  })
  contactId: number;

  @OneToOne(() => ContactEntity, (contact) => contact.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: ContactEntity;

  @Column({
    type: 'text',
    name: 'client_id',
    nullable: true,
  })
  clientId: number;

  @ManyToOne(() => ClientEntity, (client) => client.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @OneToMany(() => ShipmentEntity, (shipment) => shipment.warehouseShipment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  shipment: ShipmentEntity;

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
