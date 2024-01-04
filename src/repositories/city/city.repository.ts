import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CityDTO } from '@/dtos/city.dto';
import { City } from './city.model';

@Injectable()
export class CityRepository {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<City>,
  ) {}

  private formatCityResponse(response: City | undefined): CityDTO | undefined {
    if (!response) return undefined;

    return {
      id: response._id,
      name: response.name,
      novaPoshtaId: response.novaPoshtaId,
      ukrPoshtaPostalCode: response.ukrPoshtaPostalCode,
      deliveryId: response.deliveryId,
    };
  }

  async getCities() {
    const response = await this.cityModel.find().exec();

    return response.map(this.formatCityResponse);
  }
}
