import { CityDTO } from '@/dtos/city.dto';

export enum DeliveryTypeEnum {
  WAREHOUSE_WAREHOUSE = 'WarehouseWarehouse',
  WAREHOUSE_DOORS = 'WarehouseDoors',
  DOORS_WAREHOUSE = 'DoorsWarehouse',
  DOORS_DOORS = 'DoorsDoors',
}

export enum ProviderEnum {
  NOVA_POSHTA = 'NovaPoshta',
  UKR_POSHTA = 'UkrPoshta',
  DELIVERY = 'Delivery',
}

export type QueryDTO = {
  id: string;
  senderCity: CityDTO;
  receiverCity: CityDTO;
  weight: number;
  width: number;
  height: number;
  length: number;
  accessedCost: number;
  deliveryType: DeliveryTypeEnum;
};

export type QueryResponseDTO = QueryDTO & {
  provider: ProviderEnum;
  cost: number;
};
