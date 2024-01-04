import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRepository } from '@/repositories/user/user.repository';
import { User, UserSchema } from '@/repositories/user/user.model';
import { AftershipAPI } from '@/api/aftership/aftership.api';
import { TrackingRepository } from '@/repositories/tracking/tracking.repository';
import { TrackingController } from '@/modules/tracking/tracking.controller';
import { TrackingService } from '@/modules/tracking/tracking.service';
import { Tracking, TrackingSchema } from '@/repositories/tracking/tracking.model';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Tracking.name, schema: TrackingSchema }]),
  ],
  controllers: [TrackingController],
  providers: [TrackingService, UserRepository, TrackingRepository, AftershipAPI],
})
export class TrackingModule {}
