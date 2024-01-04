import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRepository } from '@/repositories/user/user.repository';
import { AuthModule } from '@/modules/auth/auth.module';
import { User, UserSchema } from '@/repositories/user/user.model';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';

@Module({
  imports: [HttpModule, AuthModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
