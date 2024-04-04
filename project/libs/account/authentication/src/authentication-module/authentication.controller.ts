import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AppRoutes, Path } from '@project/constant';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller(AppRoutes.Auth)
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post(Path.Register)
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return newUser.toPOJO();
  }

  @Post(Path.Login)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }
}
