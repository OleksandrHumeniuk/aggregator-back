import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class FavoriteQueryRequest {
  @IsString({ message: 'Ідентифікатор запиту має бути рядком' })
  @IsNotEmpty({ message: 'Ідентифікатор запиту не може бути пустим' })
  queryId: string;

  @IsBoolean({ message: 'Значення має бути булевим типом' })
  @IsNotEmpty({ message: 'Значення не може бути пустим' })
  value: boolean;
}

export class FavoriteTrackingRequest {
  @IsString({ message: 'Ідентифікатор відстеження має бути рядком' })
  @IsNotEmpty({ message: 'Ідентифікатор відстеження не може бути пустим' })
  trackingId: string;

  @IsBoolean({ message: 'Значення має бути булевим типом' })
  @IsNotEmpty({ message: 'Значення не може бути пустим' })
  value: boolean;
}
