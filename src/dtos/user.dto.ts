import { QueryDTO } from './query.dto';
import { TrackingDTO } from './tracking.dto';

export type UserTracking = TrackingDTO & {
  isFavorite: boolean;
};

export type UserQueryDTO = QueryDTO & {
  isFavorite: boolean;
};

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserDetailsDTO = UserDTO & {
  queries: UserQueryDTO[];
  trackings: UserTracking[];
};
