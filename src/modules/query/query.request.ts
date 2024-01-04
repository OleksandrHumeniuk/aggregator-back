import { IsEnum, IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

import { DeliveryTypeEnum } from '@/dtos/query.dto';

export class CreateQueryRequest {
  @IsString({ message: 'Місто відправлення має бути рядком' })
  @IsNotEmpty({ message: 'Місто відправлення не може бути пустим' })
  senderCity: string;

  @IsString({ message: 'Місто отримання має бути рядком' })
  @IsNotEmpty({ message: 'Місто отримання не може бути пустим' })
  receiverCity: string;

  @IsNumber({}, { message: 'Вага має бути числом' })
  @Min(0.01, { message: 'Вага не може бути менше 0.01' })
  @Max(30, { message: 'Вага не може бути більше 30 кг' })
  @IsNotEmpty({ message: 'Вага не може бути пустою' })
  weight: number;

  @IsNumber({}, { message: 'Оціночна вартість має бути числом' })
  @Min(1, { message: 'Оціночна вартість не може бути менше 1' })
  @Max(100000, { message: 'Оціночна вартість не може бути більше 100 000' })
  @IsNotEmpty({ message: 'Оціночна вартість не може бути пустою' })
  accessedCost: number;

  @IsNumber({}, { message: 'Висота має бути числом' })
  @Min(1, { message: 'Висота не може бути менше 1' })
  @Max(100, { message: 'Висота не може бути більше 100' })
  @IsNotEmpty({ message: 'Висота не може бути пустою' })
  height: number;

  @IsNumber({}, { message: 'Довжина має бути числом' })
  @Min(1, { message: 'Довжина не може бути менше 1' })
  @Max(100, { message: 'Довжина не може бути більше 100' })
  @IsNotEmpty({ message: 'Довжина не може бути пустою' })
  length: number;

  @IsNumber({}, { message: 'Ширина має бути числом' })
  @Min(1, { message: 'Ширина не може бути менше 1' })
  @Max(100, { message: 'Ширина не може бути більше 100' })
  @IsNotEmpty({ message: 'Ширина не може бути пустою' })
  width: number;

  @IsEnum(DeliveryTypeEnum, { message: 'Тип доставки має бути одним з допустимих варіантів' })
  @IsNotEmpty({ message: 'Тип доставки не може бути пустим' })
  deliveryType: DeliveryTypeEnum;
}
