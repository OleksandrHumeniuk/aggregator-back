import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/repositories/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: string) {
    return await this.userRepository.getUserDetails(id);
  }

  async favoriteQuery(queryId: string, value: boolean, userId: string) {
    return await this.userRepository.favoriteQuery(userId, value, queryId);
  }

  async favoriteTracking(trackingId: string, value: boolean, userId: string) {
    return await this.userRepository.favoriteTracking(userId, value, trackingId);
  }
}
