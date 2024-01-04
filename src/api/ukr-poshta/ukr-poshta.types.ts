import { DeliveryTypeEnum } from '@/dtos/query.dto';

export type DeliveryType = 'W2D' | 'W2W' | 'D2W' | 'D2D';

export const DeliveryTypeMap: Record<DeliveryTypeEnum, DeliveryType> = {
  [DeliveryTypeEnum.WAREHOUSE_WAREHOUSE]: 'W2W',
  [DeliveryTypeEnum.WAREHOUSE_DOORS]: 'W2D',
  [DeliveryTypeEnum.DOORS_WAREHOUSE]: 'D2W',
  [DeliveryTypeEnum.DOORS_DOORS]: 'D2D',
};

export type CalculatePriceRequest = {
  addressFrom: {
    postcode: string;
  };
  addressTo: {
    postcode: string;
  };
  declaredPrice: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  type: string;
  deliveryType: DeliveryType;
};

export type CalculatePriceResponse = {
  deliveryPrice: number;
  rawDeliveryPrice: number;
  calculationDescription: string;
};
