import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '@/repositories/user/user.repository';
import { UserDTO } from '@/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private signToken(user: UserDTO) {
    const token = this.jwtService.sign({ id: user.id }, { secret: process.env.JWT_SECRET_KEY });

    return { token };
  }

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Користувач з такою поштою вже існує!');
    }

    const user = await this.userRepository.createUser(name, email, hashedPassword);

    return this.signToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Користувач не був знайдений!');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Неправильний пароль або пошта!');
    }

    return this.signToken(user);
  }
}
