import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDetailsDTO, UserDTO } from '@/dtos/user.dto';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  private formatUserDetailsResponse(response: User | undefined): UserDetailsDTO | undefined {
    if (!response) return undefined;

    return {
      id: response._id,
      name: response.name,
      email: response.email,
      password: response.password,
      queries: response.queries.map(item => ({
        id: item.query._id,
        isFavorite: item.isFavorite,
        weight: item.query.weight,
        width: item.query.width,
        height: item.query.height,
        length: item.query.length,
        accessedCost: item.query.accessedCost,
        deliveryType: item.query.deliveryType,
        senderCity: {
          id: item.query.senderCity._id,
          name: item.query.senderCity.name,
          novaPoshtaId: item.query.senderCity.novaPoshtaId,
          ukrPoshtaPostalCode: item.query.senderCity.ukrPoshtaPostalCode,
          deliveryId: item.query.senderCity.deliveryId,
        },
        receiverCity: {
          id: item.query.receiverCity._id,
          name: item.query.receiverCity.name,
          novaPoshtaId: item.query.receiverCity.novaPoshtaId,
          ukrPoshtaPostalCode: item.query.receiverCity.ukrPoshtaPostalCode,
          deliveryId: item.query.receiverCity.deliveryId,
        },
      })),
      trackings: response.trackings.map(item => ({
        id: item.tracking.id,
        isFavorite: item.isFavorite,
        trackingNumber: item.tracking.trackingNumber,
        aftershipId: item.tracking.aftershipId,
      })),
    };
  }

  private formatUserResponse(response: User | undefined): UserDTO | undefined {
    if (!response) return undefined;

    return {
      id: response._id,
      name: response.name,
      email: response.email,
      password: response.password,
    };
  }

  async createUser(name: string, email: string, password: string) {
    const response = await this.userModel.create({
      name,
      email,
      password,
    });

    return this.formatUserResponse(response);
  }

  async getUser(id: string) {
    const response = await this.userModel.findById(id).exec();

    return this.formatUserResponse(response);
  }

  async getUserDetails(id: string) {
    const response = await this.userModel
      .findById(id)
      .populate({ path: 'trackings.tracking', model: 'Tracking' })
      .populate({
        path: 'queries.query',
        model: 'Query',
        populate: {
          path: 'senderCity receiverCity',
          model: 'City',
        },
      })
      .exec();

    return this.formatUserDetailsResponse(response);
  }

  async getUserByEmail(email: string) {
    const response = await this.userModel.findOne({ email }).exec();

    return this.formatUserResponse(response);
  }

  async addQuery(id: string, queryId: string) {
    await this.userModel.findByIdAndUpdate(id, { $pull: { queries: { query: queryId } } });

    const user = await this.getUserDetails(id);

    const queryLength = user?.queries.length;
    if (queryLength && user.queries[queryLength - 1].id === queryId) return user;

    const query = {
      query: queryId,
      isFavorite: false,
    };

    const response = await this.userModel
      .findByIdAndUpdate(id, { $push: { queries: query } }, { new: true }) //
      .exec();

    return this.formatUserResponse(response);
  }

  async favoriteQuery(id: string, value: boolean, queryId: string) {
    await this.userModel.findByIdAndUpdate(
      id,
      { $set: { 'queries.$[elem].isFavorite': value } },
      { arrayFilters: [{ 'elem.query': queryId }], new: true },
    );

    return {
      status: 'success',
    };
  }

  async addTracking(id: string, trackingId: string) {
    await this.userModel.findByIdAndUpdate(id, { $pull: { trackings: { tracking: trackingId } } });

    const tracking = {
      tracking: trackingId,
      isFavorite: false,
    };

    const response = await this.userModel
      .findByIdAndUpdate(id, { $push: { trackings: tracking } }, { new: true })
      .exec();

    return this.formatUserResponse(response);
  }

  async favoriteTracking(id: string, value: boolean, trackingId: string) {
    await this.userModel.findByIdAndUpdate(
      id,
      { $set: { 'trackings.$[elem].isFavorite': value } },
      { arrayFilters: [{ 'elem.tracking': trackingId }], new: true },
    );

    return {
      status: 'success',
    };
  }
}
