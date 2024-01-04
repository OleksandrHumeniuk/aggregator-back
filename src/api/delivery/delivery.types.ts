export type CalculatePriceRequest = {
  culture: 'uk-UA';
  areasSendId: string;
  areasResiveId: string;
  warehouseSendId: string;
  warehouseResiveId: string;
  InsuranceValue: number;
  category: [
    {
      countPlace: number;
      helf: number;
      size: number;
    },
  ];
};

export type CalculatePriceResponse = {
  status: boolean;
  message: string;
  data: {
    allSumma: number;
  };
};
