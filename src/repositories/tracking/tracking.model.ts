import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Tracking extends mongoose.Document {
  @Prop({ required: true, unique: true })
  trackingNumber: string;

  @Prop({ required: true, unique: true })
  aftershipId: string;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);
