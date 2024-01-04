import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class City extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  novaPoshtaId: string;

  @Prop({ required: true })
  ukrPoshtaPostalCode: string;

  @Prop({ required: true })
  deliveryId: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
