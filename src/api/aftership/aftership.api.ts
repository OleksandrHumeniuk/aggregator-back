import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { CreateTrackingRequest, CreateTrackingResponse, GetTrackingResponse } from './aftership.types';
import { TrackingDTO, TrackingResponseDTO } from '@/dtos/tracking.dto';

const CONTAINS_LETTERS_REGEX = /[a-zA-Z]/;

@Injectable()
export class AftershipAPI {
  constructor(private readonly httpService: HttpService) {}

  private readonly url = process.env.AFTERSHIP_BASE_URL;
  private readonly headers = { 'as-api-key': process.env.AFTERSHIP_API_KEY };

  async createTracking(trackingNumber: string): Promise<Omit<TrackingDTO, 'id'>> {
    const requestBody: CreateTrackingRequest = {
      tracking: {
        tracking_number: trackingNumber,
        slug: CONTAINS_LETTERS_REGEX.test(trackingNumber) ? 'ukrposhta' : 'nova-poshta',
      },
    };

    const response = await firstValueFrom(
      this.httpService.post<CreateTrackingResponse>(`${this.url}/trackings`, requestBody, {
        headers: this.headers,
      }),
    );

    await new Promise(resolve => setTimeout(resolve, 10000));

    return {
      aftershipId: response.data.data.tracking.id,
      trackingNumber: response.data.data.tracking.tracking_number,
    };
  }

  async getTracking(tracking: TrackingDTO): Promise<TrackingResponseDTO> {
    const response = await firstValueFrom(
      this.httpService.get<GetTrackingResponse>(`${this.url}/trackings/${tracking.aftershipId}?lang=uk`, {
        headers: this.headers,
      }),
    );

    return {
      id: tracking.id,
      aftershipId: response.data.data.tracking.id,
      trackingNumber: response.data.data.tracking.tracking_number,
      receiverCountry: response.data.data.tracking.destination_country_iso3,
      senderCountry: response.data.data.tracking.origin_country_iso3,
      checkpoints: response.data.data.tracking.checkpoints.map(item => ({
        slug: item.slug,
        location: item.location,
        message: item.message,
        checkpointTime: item.checkpoint_time,
      })),
    };
  }
}
