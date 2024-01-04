import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TrackingDTO } from '@/dtos/tracking.dto';
import { Tracking } from './tracking.model';

@Injectable()
export class TrackingRepository {
  constructor(
    @InjectModel(Tracking.name)
    private readonly trackingModel: Model<Tracking>,
  ) {}

  private formatTrackingResponse(response: Tracking | undefined): TrackingDTO | undefined {
    if (!response) return undefined;

    return {
      id: response._id,
      trackingNumber: response.trackingNumber,
      aftershipId: response.aftershipId,
    };
  }

  async createTracking(trackingNumber: string, aftershipId: string) {
    const response = await this.trackingModel.create({
      trackingNumber,
      aftershipId,
    });

    return this.formatTrackingResponse(response);
  }

  async getTrackingByTrackingNumber(trackingNumber: string) {
    const response = await this.trackingModel.findOne({ trackingNumber }).exec();

    return this.formatTrackingResponse(response);
  }
}
