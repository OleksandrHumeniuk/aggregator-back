import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { AftershipAPI } from '@/api/aftership/aftership.api';
import { UserRepository } from '@/repositories/user/user.repository';
import { TrackingRepository } from '@/repositories/tracking/tracking.repository';

@Injectable()
export class TrackingService {
  constructor(
    private readonly aftershipAPI: AftershipAPI,
    private readonly userRepository: UserRepository,
    private readonly trackingRepository: TrackingRepository,
  ) {}

  async createTracking(trackingNumber: string) {
    const existingTracking = await this.trackingRepository.getTrackingByTrackingNumber(trackingNumber);

    if (existingTracking) {
      return existingTracking;
    }

    try {
      const response = await this.aftershipAPI.createTracking(trackingNumber);

      return await this.trackingRepository.createTracking(trackingNumber, response.aftershipId);
    } catch {
      throw new BadRequestException('Введений некоректний ідентифікатор посилки');
    }
  }

  async getTracking(trackingNumber: string, userId?: string) {
    const tracking = await this.trackingRepository.getTrackingByTrackingNumber(trackingNumber);

    if (!tracking) {
      throw new NotFoundException('Посилку не знайдено!');
    }

    if (userId) {
      await this.userRepository.addTracking(userId, tracking.id);
    }

    return await this.aftershipAPI.getTracking(tracking);
  }
}
