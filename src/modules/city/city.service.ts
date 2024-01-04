import { Injectable } from '@nestjs/common';

import { CityRepository } from '@/repositories/city/city.repository';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async getCities() {
    return await this.cityRepository.getCities();
  }
}
