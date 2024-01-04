import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterRequest {
  @IsString({ message: 'Імʼя має бути рядком' })
  @IsNotEmpty({ message: 'Імʼя не може бути пустим' })
  readonly name: string;

  @IsEmail({}, { message: 'Пошта має бути валідною' })
  @IsNotEmpty({ message: 'Пошта не може бути пустою' })
  readonly email: string;

  @MinLength(2, { message: 'Пароль має бути не менше 2 символів' })
  @IsString({ message: 'Пароль має бути рядком' })
  @IsNotEmpty({ message: 'Пароль не може бути пустим' })
  readonly password: string;
}

export class LoginRequest {
  @IsEmail({}, { message: 'Пошта має бути валідною' })
  @IsNotEmpty({ message: 'Пошта не може бути пустою' })
  readonly email: string;

  @MinLength(2, { message: 'Пароль має бути не менше 2 символів' })
  @IsString({ message: 'Пароль має бути рядком' })
  @IsNotEmpty({ message: 'Пароль не може бути пустим' })
  readonly password: string;
}
