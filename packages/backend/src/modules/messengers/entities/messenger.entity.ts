import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  EncryptionTransformer,
  ExtendedColumnOptions,
} from 'typeorm-encrypted';

/*Local Imports */
import { ENCRYPTION_IV, ENCRYPTION_KEY } from 'src/config/encripted.config';
import { ShipmentEntity } from 'src/modules/shipment/entities/shipment.entity';

@Entity({ name: 'messengers' })
export class MessengerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column(<ExtendedColumnOptions>{
    name: 'email',
    unique: true,
    transformer: new EncryptionTransformer({
      key: ENCRYPTION_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: ENCRYPTION_IV,
    }),
  })
  email: string;

  @Column(<ExtendedColumnOptions>{
    name: 'phone',
    unique: true,
    transformer: new EncryptionTransformer({
      key: ENCRYPTION_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: ENCRYPTION_IV,
    }),
  })
  phone: string;

  @OneToMany(() => ShipmentEntity, (shipment) => shipment.messenger, {
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
