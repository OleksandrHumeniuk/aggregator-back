import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { ProviderEnum, QueryDTO, QueryResponseDTO } from '@/dtos/query.dto';
import { CalculatePriceRequest, CalculatePriceResponse, ServiceTypeMap } from './nova-poshta.types';

@Injectable()
export class NovaPoshtaAPI {
  constructor(private readonly httpService: HttpService) {}

  private readonly url = process.env.NOVA_POSHTA_BASE_URL;
  private readonly key = process.env.NOVA_POSHTA_API_KEY;

  async calculatePrice(query: QueryDTO): Promise<QueryResponseDTO> {
    const requestBody: CalculatePriceRequest = {
      CitySender: query.senderCity.novaPoshtaId,
      CityRecipient: query.receiverCity.novaPoshtaId,
      Weight: query.weight.toString(),
      VolumetricLength: query.length.toString(),
      VolumetricWidth: query.width.toString(),
      VolumetricHeight: query.height.toString(),
      Cost: query.accessedCost.toString(),
      ServiceType: ServiceTypeMap[query.deliveryType],
      CargoType: 'Parcel',
      SeatsAmount: '1',
    };

    const response = await firstValueFrom(
      this.httpService.post<CalculatePriceResponse>(this.url, {
        apiKey: this.key,
        modelName: 'InternetDocument',
        calledMethod: 'getDocumentPrice',
        methodProperties: requestBody,
      }),
    );

    return {
      ...query,
      provider: ProviderEnum.NOVA_POSHTA,
      cost: parseInt(response.data.data[0].Cost),
    };
  }
}
