import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityRepository } from '@/repositories/city/city.repository';
import { City, CitySchema } from '@/repositories/city/city.model';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
})
export class CityModule {}
