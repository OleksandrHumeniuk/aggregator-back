import { DeliveryTypeEnum } from '@/dtos/query.dto';

export type ServiceType =
  | 'DoorsDoors' //
  | 'DoorsWarehouse'
  | 'WarehouseWarehouse'
  | 'WarehouseDoors';

export const ServiceTypeMap: Record<DeliveryTypeEnum, ServiceType> = {
  [DeliveryTypeEnum.WAREHOUSE_WAREHOUSE]: 'WarehouseWarehouse',
  [DeliveryTypeEnum.WAREHOUSE_DOORS]: 'WarehouseDoors',
  [DeliveryTypeEnum.DOORS_WAREHOUSE]: 'DoorsWarehouse',
  [DeliveryTypeEnum.DOORS_DOORS]: 'DoorsDoors',
};

export type CalculatePriceRequest = {
  CitySender: string;
  CityRecipient: string;
  Weight: string;
  Cost: string;
  CargoType: string;
  VolumetricLength: string;
  VolumetricWidth: string;
  VolumetricHeight: string;
  SeatsAmount: string;
  ServiceType: ServiceType;
};

export type CalculatePriceResponse = {
  success: boolean;
  data: {
    Cost: string;
  };
  errors: string[];
};
