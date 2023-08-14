import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Import */
import { EvidenceEntity } from './entities/evidence.entity';
import { EvidenceService } from './evidence.service';
import { EvidenceDTO } from './dto/evidence.dto';
import { InputCreateEvidenceDTO } from './dto/create-evidence.dto';
import { InputUpdateEvidenceDTO } from './dto/update-evidence.dto';
import { EvidenceResolver } from './evidence.resolver';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([EvidenceEntity])],
      services: [EvidenceService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: EvidenceDTO,
          EntityClass: EvidenceEntity,
          ServiceClass: EvidenceService,
          CreateDTOClass: InputCreateEvidenceDTO,
          UpdateDTOClass: InputUpdateEvidenceDTO,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [EvidenceResolver, EvidenceService],
  exports: [EvidenceService],
})
export class EvidenceModule {}
