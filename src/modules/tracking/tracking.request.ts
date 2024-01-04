import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackRequest {
  @IsString({ message: 'Номер відстеження має бути рядком' })
  @IsNotEmpty({ message: 'Номер відстеження не може бути пустим' })
  trackingNumber: string;
}
