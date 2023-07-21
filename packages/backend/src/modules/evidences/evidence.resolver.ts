import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { EvidenceDTO } from './dto/evidence.dto';
import { EvidenceService } from './evidence.service';

@Resolver(() => EvidenceDTO)
export class EvidenceResolver extends CRUDResolver(EvidenceDTO) {
  constructor(readonly repo: EvidenceService) {
    super(repo);
  }
}
