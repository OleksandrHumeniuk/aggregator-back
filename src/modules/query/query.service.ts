import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { NovaPoshtaAPI } from '@/api/nova-poshta/nova-poshta.api';
import { UkrPoshtaAPI } from '@/api/ukr-poshta/ukr-poshta.api';
import { DeliveryAPI } from '@/api/delivery/delivery.api';
import { UserRepository } from '@/repositories/user/user.repository';
import { QueryRepository } from '@/repositories/query/query.repository';
import { CreateQueryRequest } from '@/modules/query/query.request';
import { QueryDTO } from '@/dtos/query.dto';

@Injectable()
export class QueryService {
  constructor(
    private readonly novaPoshtaAPI: NovaPoshtaAPI,
    private readonly ukrPoshtaAPI: UkrPoshtaAPI,
    private readonly deliveryAPI: DeliveryAPI,
    private readonly userRepository: UserRepository,
    private readonly queryRepository: QueryRepository,
  ) {}

  async createQuery(query: CreateQueryRequest) {
    return await this.queryRepository.createQuery(query);
  }

  async getQuery(id: string, userId?: string) {
    let query: QueryDTO;
    try {
      query = await this.queryRepository.getQuery(id);
    } catch {
      throw new BadRequestException('Невірний ідентифікатор!');
    }

    if (!query) {
      throw new NotFoundException('Запит не було знайдено!');
    }

    if (userId) {
      await this.userRepository.addQuery(userId, query.id);
    }

    const novaPoshtaResponse = await this.novaPoshtaAPI.calculatePrice(query);
    const ukrPoshtaResponse = await this.ukrPoshtaAPI.calculatePrice(query);
    const deliveryResponse = await this.deliveryAPI.calculatePrice(query);

    return [novaPoshtaResponse, ukrPoshtaResponse, deliveryResponse];
  }
}
