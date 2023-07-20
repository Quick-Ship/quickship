import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'invoices' })
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'social_reazon' })
  socialReazon: string;

  @Column({ name: 'rfc' })
  rfc: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'neigthboorhood' })
  neigthboorhood: string;

  @Column({ name: 'municipality' })
  municipality: string;

  @Column({ name: 'state' })
  state: string;

  @Column({ name: 'external_number' })
  externalNumber: number;

  @Column({ name: 'internal_number' })
  internalNumber: number;

  @Column({ name: 'zip_code' })
  zipCode: number;

  @Column({ name: 'tax_regimen' })
  taxRegimen: number;

  @Column({ name: 'cfdi' })
  cfdi: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_at',
  })
  createAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_at',
  })
  updateAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'delete_at',
  })
  deleteAt!: Date;
}
