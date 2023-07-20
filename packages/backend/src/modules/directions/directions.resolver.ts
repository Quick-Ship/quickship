import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

/*Local Imports*/
import { DirectionsService } from './directions.service';
import { DirectionDTO } from './dto/directions.dto';

@Resolver(() => DirectionDTO)
export class DirectionsResolver extends CRUDResolver(DirectionDTO) {
  constructor(readonly directionsService: DirectionsService) {
    super(directionsService);
  }
}
