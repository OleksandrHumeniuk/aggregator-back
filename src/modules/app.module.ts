import { Module } from '@nestjs/common';

import { PackageModule } from './package/package.module';

@Module({
  imports: [PackageModule],
})
export class AppModule {}
