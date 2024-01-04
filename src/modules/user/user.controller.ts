import { Body, Controller, Post, Get, Req } from '@nestjs/common';

import { FavoriteQueryRequest, FavoriteTrackingRequest } from './user.request';
import { UserService } from './user.service';
import { ProtectedRoute } from '@/security/protected.metadata';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ProtectedRoute()
  @Get()
  async getUser(@Req() req) {
    return this.userService.getUser(req.user.id);
  }

  @ProtectedRoute()
  @Post('favorite/query')
  async favoriteQuery(@Body() body: FavoriteQueryRequest, @Req() req) {
    return await this.userService.favoriteQuery(body.queryId, body.value, req.user.id);
  }

  @ProtectedRoute()
  @Post('favorite/tracking')
  async favoriteTracking(@Body() body: FavoriteTrackingRequest, @Req() req) {
    return await this.userService.favoriteTracking(body.trackingId, body.value, req.user.id);
  }
}
