export type TrackingDTO = {
  id: string;
  trackingNumber: string;
  aftershipId: string;
};

export type TrackingCheckpointDTO = {
  slug: string;
  location: string;
  message: string;
  checkpointTime: string;
};

export type TrackingResponseDTO = TrackingDTO & {
  senderCountry: string;
  receiverCountry: string;
  checkpoints: TrackingCheckpointDTO[];
};
