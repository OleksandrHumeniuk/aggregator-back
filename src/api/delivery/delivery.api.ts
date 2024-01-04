import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { CalculatePriceRequest, CalculatePriceResponse } from './delivery.types';
import { ProviderEnum, QueryDTO, QueryResponseDTO } from '@/dtos/query.dto';

@Injectable()
export class DeliveryAPI {
  constructor(private readonly httpService: HttpService) {}

  private readonly url = process.env.DELIVERY_BASE_URL;

  async calculatePrice(query: QueryDTO): Promise<QueryResponseDTO> {
    const requestBody: CalculatePriceRequest = {
      culture: 'uk-UA',
      areasSendId: query.receiverCity.deliveryId,
      areasResiveId: query.senderCity.deliveryId,
      warehouseSendId: query.receiverCity.deliveryId,
      warehouseResiveId: query.senderCity.deliveryId,
      InsuranceValue: query.accessedCost,
      category: [
        {
          countPlace: 1,
          helf: query.weight,
          size: (query.width * query.height * query.length) / 1000000,
        },
      ],
    };

    const response = await firstValueFrom(
      this.httpService.post<CalculatePriceResponse>(`${this.url}/PostReceiptCalculate`, requestBody),
    );

    return {
      ...query,
      provider: ProviderEnum.DELIVERY,
      cost: response.data.data.allSumma,
    };
  }
}
