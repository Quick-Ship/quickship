import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  EncryptionTransformer,
  ExtendedColumnOptions,
} from 'typeorm-encrypted';
/*Local Imports */
import {
  ENCRYPTION_KEY,
  ENCRYPTION_IV,
} from '../../../config/encripted.config';

@Entity({ name: 'client' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column(<ExtendedColumnOptions>{
    name: 'email',
    type: 'text',
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
    type: 'text',
    unique: true,
    transformer: new EncryptionTransformer({
      key: ENCRYPTION_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: ENCRYPTION_IV,
    }),
  })
  phone: string;

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
