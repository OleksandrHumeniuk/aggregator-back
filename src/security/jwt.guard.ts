import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JWTGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context) {
    const isProtected = this.reflector.get<string[]>('protected', context.getHandler());

    if (user) return user;
    if (!isProtected) return true;
    throw new UnauthorizedException();
  }
}
