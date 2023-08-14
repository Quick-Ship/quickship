import { Resolver } from '@nestjs/graphql';
import { CourierActivityDTO } from './dtos/courier-activity.dto';
import { CourierActivityService } from './courier-activity.service';
import { CRUDResolver } from '@nestjs-query/query-graphql';

@Resolver(() => CourierActivityDTO)
export class CourierActivityResolver extends CRUDResolver(CourierActivityDTO) {
  constructor(readonly courierActivityService: CourierActivityService) {
    super(courierActivityService);
  }
}
