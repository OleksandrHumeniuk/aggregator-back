import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { NovaPoshtaAPI } from '@/api/nova-poshta/nova-poshta.api';
import { UkrPoshtaAPI } from '@/api/ukr-poshta/ukr-poshta.api';
import { DeliveryAPI } from '@/api/delivery/delivery.api';
import { UserRepository } from '@/repositories/user/user.repository';
import { QueryRepository } from '@/repositories/query/query.repository';
import { Query, QuerySchema } from '@/repositories/query/query.model';
import { User, UserSchema } from '@/repositories/user/user.model';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Query.name, schema: QuerySchema }]),
  ],
  controllers: [QueryController],
  providers: [QueryService, QueryRepository, UserRepository, NovaPoshtaAPI, UkrPoshtaAPI, DeliveryAPI],
})
export class QueryModule {}
