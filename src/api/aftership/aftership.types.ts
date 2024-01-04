export type CreateTrackingRequest = {
  tracking: {
    tracking_number: string;
    slug: string;
  };
};

export type CreateTrackingResponse = {
  data: {
    tracking: {
      id: string;
      tracking_number: string;
    };
  };
};

export type GetTrackingResponse = {
  data: {
    tracking: {
      id: string;
      tracking_number: string;
      slug: string;
      destination_country_iso3: string;
      origin_country_iso3: string;
      shipment_pickup_date: string;
      shipment_delivery_date: string;
      tag: string;
      checkpoints: {
        slug: string;
        location: string;
        country_name: string;
        message: string;
        checkpoint_time: string;
      }[];
      courier_tracking_link: string;
      origin_raw_location: string;
      destination_raw_location: string;
    };
  };
};
