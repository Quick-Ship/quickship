import { QueryRunner } from 'typeorm';
import { PackageStatusDescriptionEnum } from './enums/package-status-description.enum';
import { PackageStatusEnum } from './enums/package-status.enum';
import { InputChangeStatus } from 'src/modules/packages/dto/change-package-status.dto';
import {
  PackageStatusEvidenceEnum,
  PackageStatusEvidencesTypes,
} from './enums/package-status.evidences.enum';
import { GraphQLError } from 'graphql';
import { Errors } from './enums/errors.enum';

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
    case PackageStatusEnum.AR:
      description = 'AR';
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
    case PackageStatusEnum.AR:
      description = PackageStatusDescriptionEnum.AR;
      break;
  }
  return description;
};

export const validateEvidenceByPackageStatus = (
  status: number,
  input: InputChangeStatus,
): void => {
  if (PackageStatusEvidencesTypes.includes(status) && !input?.evidence) {
    throw new GraphQLError(
      Errors.INVALID_PACKAGE_STATUS_BY_EVIDENCE.replace(':guide', input.guide),
    );
  }
};
