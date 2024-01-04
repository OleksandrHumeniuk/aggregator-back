import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { QueryDTO } from '@/dtos/query.dto';
import { CreateQueryRequest } from '@/modules/query/query.request';
import { Query } from './query.model';

@Injectable()
export class QueryRepository {
  constructor(
    @InjectModel(Query.name)
    private readonly queryModel: Model<Query>,
  ) {}

  private formatQueryResponse(query: Query | undefined): QueryDTO | undefined {
    if (!query) return undefined;

    return {
      id: query._id,
      weight: query.weight,
      width: query.width,
      height: query.height,
      length: query.length,
      accessedCost: query.accessedCost,
      deliveryType: query.deliveryType,
      senderCity: {
        id: query.senderCity._id,
        name: query.senderCity.name,
        novaPoshtaId: query.senderCity.novaPoshtaId,
        ukrPoshtaPostalCode: query.senderCity.ukrPoshtaPostalCode,
        deliveryId: query.senderCity.deliveryId,
      },
      receiverCity: {
        id: query.receiverCity._id,
        name: query.receiverCity.name,
        novaPoshtaId: query.receiverCity.novaPoshtaId,
        ukrPoshtaPostalCode: query.receiverCity.ukrPoshtaPostalCode,
        deliveryId: query.receiverCity.deliveryId,
      },
    };
  }

  async createQuery(query: CreateQueryRequest) {
    const response = await this.queryModel.create(query);

    return this.formatQueryResponse(response);
  }

  async getQuery(id: string) {
    const response = await this.queryModel.findById(id).populate(['senderCity', 'receiverCity']).exec();

    return this.formatQueryResponse(response);
  }
}
