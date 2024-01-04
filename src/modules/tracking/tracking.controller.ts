import { Body, Controller, Post, Get, Param, Req } from '@nestjs/common';

import { CreateTrackRequest } from './tracking.request';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get(':trackingNumber')
  async getTracking(@Param('trackingNumber') trackingNumber: string, @Req() req) {
    return await this.trackingService.getTracking(trackingNumber, req.user.id);
  }

  @Post()
  async createTracking(@Body() body: CreateTrackRequest) {
    return await this.trackingService.createTracking(body.trackingNumber);
  }
}
