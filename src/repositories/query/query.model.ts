import mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { DeliveryTypeEnum } from '@/dtos/query.dto';
import { City } from '@/repositories/city/city.model';

@Schema({
  timestamps: true,
})
export class Query extends mongoose.Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  senderCity: City;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  receiverCity: City;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  accessedCost: number;

  @Prop({ required: true, enum: DeliveryTypeEnum })
  deliveryType: DeliveryTypeEnum;
}

export const QuerySchema = SchemaFactory.createForClass(Query);
