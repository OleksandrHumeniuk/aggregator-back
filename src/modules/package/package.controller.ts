import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { PackageService } from './package.service';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  getPackages() {
    return this.packageService.getPackages();
  }

  @Get(':id')
  getPackage(@Param('id') id: string) {
    const response = this.packageService.getPackage(id);

    if (!response) {
      throw new NotFoundException();
    }

    return { ...response };
  }

  @Post()
  createPackage(@Body('name') name: string) {
    const response = this.packageService.createPackage(name);
    return { id: response.id };
  }
}
