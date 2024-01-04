import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { QueryModule } from '@/modules/query/query.module';
import { CityModule } from '@/modules/city/city.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { TrackingModule } from '@/modules/tracking/tracking.module';
import { UserModule } from '@/modules/user/user.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JWTGuard } from '@/security/jwt.guard';

@Module({
  imports: [
    CityModule,
    QueryModule,
    AuthModule,
    TrackingModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_AUTH_STRING),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: ref => new JWTGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
