import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { CalculatePriceRequest, CalculatePriceResponse, DeliveryTypeMap } from './ukr-poshta.types';
import { ProviderEnum, QueryDTO, QueryResponseDTO } from '@/dtos/query.dto';

@Injectable()
export class UkrPoshtaAPI {
  constructor(private readonly httpService: HttpService) {}

  private readonly url = process.env.UKR_POSHTA_BASE_URL;
  private readonly headers = { Authorization: `Bearer ${process.env.UKR_POSHTA_ECOM}` };

  async calculatePrice(query: QueryDTO): Promise<QueryResponseDTO> {
    const requestBody: CalculatePriceRequest = {
      addressFrom: {
        postcode: query.senderCity.ukrPoshtaPostalCode,
      },
      addressTo: {
        postcode: query.receiverCity.ukrPoshtaPostalCode,
      },
      weight: query.weight * 1000,
      length: query.length,
      width: query.width,
      height: query.height,
      declaredPrice: query.accessedCost,
      type: 'STANDARD',
      deliveryType: DeliveryTypeMap[query.deliveryType],
    };

    const response = await firstValueFrom(
      this.httpService.post<CalculatePriceResponse>(`${this.url}/domestic/delivery-price`, requestBody, {
        headers: this.headers,
      }),
    );

    return {
      ...query,
      provider: ProviderEnum.UKR_POSHTA,
      cost: response.data.deliveryPrice,
    };
  }
}
