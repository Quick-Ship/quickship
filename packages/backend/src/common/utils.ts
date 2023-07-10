import { QueryRunner } from 'typeorm';
import { PackageStatusDescriptionEnum } from './package-status-description.enum';
import { PackageStatusEnum } from './package-status.enum';

export const validTransaction = async (queryRunner: QueryRunner) => {
  if (queryRunner.isTransactionActive) {
    await queryRunner.rollbackTransaction();
  }
  return false;
};

export const getStatusByIdStatus = (status: number): string => {
  let description: string = '';
  switch (status) {
    case PackageStatusEnum.BA:
      description = 'BA';
      break;
    case PackageStatusEnum.CA:
      description = 'CA';
      break;
    case PackageStatusEnum.CM:
      description = 'CM';
      break;
    case PackageStatusEnum.DE:
      description = 'DE';
      break;
    case PackageStatusEnum.DM:
      description = 'DM';
      break;
    case PackageStatusEnum.MC:
      description = 'MC';
      break;
    case PackageStatusEnum.MD:
      description = 'MD';
      break;
    case PackageStatusEnum.MS:
      description = 'MS';
      break;
    case PackageStatusEnum.NH:
      description = 'NH';
      break;
    case PackageStatusEnum.PL:
      description = 'PL';
      break;
    case PackageStatusEnum.PU:
      description = 'PU';
      break;
    case PackageStatusEnum.RD:
      description = 'RD';
      break;
    case PackageStatusEnum.SC:
      description = 'SC';
      break;
    case PackageStatusEnum.WC:
      description = 'WC';
      break;
  }
  return description;
};

export const getStatusDescriptionByIdStatus = (
  status: number,
): PackageStatusDescriptionEnum => {
  let description: PackageStatusDescriptionEnum;
  switch (status) {
    case PackageStatusEnum.BA:
      description = PackageStatusDescriptionEnum.BA;
      break;
    case PackageStatusEnum.CA:
      description = PackageStatusDescriptionEnum.CA;
      break;
    case PackageStatusEnum.CM:
      description = PackageStatusDescriptionEnum.CM;
      break;
    case PackageStatusEnum.DE:
      description = PackageStatusDescriptionEnum.DE;
      break;
    case PackageStatusEnum.DM:
      description = PackageStatusDescriptionEnum.DM;
      break;
    case PackageStatusEnum.MC:
      description = PackageStatusDescriptionEnum.MC;
      break;
    case PackageStatusEnum.MD:
      description = PackageStatusDescriptionEnum.MD;
      break;
    case PackageStatusEnum.MS:
      description = PackageStatusDescriptionEnum.MS;
      break;
    case PackageStatusEnum.NH:
      description = PackageStatusDescriptionEnum.NH;
      break;
    case PackageStatusEnum.PL:
      description = PackageStatusDescriptionEnum.PL;
      break;
    case PackageStatusEnum.PU:
      description = PackageStatusDescriptionEnum.PU;
      break;
    case PackageStatusEnum.RD:
      description = PackageStatusDescriptionEnum.RD;
      break;
    case PackageStatusEnum.SC:
      description = PackageStatusDescriptionEnum.SC;
      break;
    case PackageStatusEnum.WC:
      description = PackageStatusDescriptionEnum.WC;
      break;
  }
  return description;
};
