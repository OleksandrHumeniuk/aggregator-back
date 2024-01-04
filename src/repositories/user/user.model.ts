import mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Query } from '@/repositories/query/query.model';
import { Tracking } from '@/repositories/tracking/tracking.model';

type UserQuery = {
  isFavorite: boolean;
  query: Query;
};

type UserTracking = {
  isFavorite: boolean;
  tracking: Tracking;
};

@Schema({
  timestamps: true,
})
export class User extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    type: [
      {
        query: { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
        isFavorite: { type: Boolean },
      },
    ],
    default: [],
  })
  queries?: UserQuery[];

  @Prop({
    required: true,
    type: [
      {
        tracking: { type: mongoose.Schema.Types.ObjectId, ref: 'Tracking' },
        isFavorite: { type: Boolean },
      },
    ],
    default: [],
  })
  trackings?: UserTracking[];
}

export const UserSchema = SchemaFactory.createForClass(User);
