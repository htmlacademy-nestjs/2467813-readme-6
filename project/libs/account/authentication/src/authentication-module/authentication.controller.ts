import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AppRoutes, Path, AuthToken } from '@project/constant';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser, AuthenticationResponseMessage } from '../const';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { UpdateUserPassword } from '../dto/update-user-password.dto';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { fillDto } from '@project/helpers';
import { NotifyService } from '@project/notify-module';
import { IRequestWithUser } from '../types/request-with-user.interface';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { IRequestWithTokenPayload } from '../types/request-with-token-payload.interface';
import { UpdateTokensRdo } from '../rdo/update-tokens.rdo';

@ApiTags(AppRoutes.Auth)
@Controller(AppRoutes.Auth)
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    type: CreateUserDto,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post(Path.Register)
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, firstName, lastName } = newUser;
    await this.notifyService.registerSubscriber({ email, firstName, lastName });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @UseGuards(LocalAuthGuard)
  @Post(Path.Login)
  public async login(@Req() { user }: IRequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, {
      ...user.toPOJO(),
      ...userToken,
    });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UpdateUserPassword,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthUser.IsNotLogged,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @Patch(`:id/${Path.NewPassword}`)
  public async updatePassword(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() dto: UpdateUserPassword
  ) {
    const updatedUser = await this.authService.changePassword(id, dto);
    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.DescriptionRefresh,
    required: true,
  })
  @ApiResponse({
    type: UpdateTokensRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.NewTokens,
  })
  @UseGuards(JwtRefreshGuard)
  @Post(Path.Refresh)
  public async refreshToken(@Req() { user }: IRequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(Path.Check)
  public async checkToken(@Req() { user: payload }: IRequestWithTokenPayload) {
    return payload;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/demo/:id')
  public async demoPipe(@Param('id', MongoIdValidationPipe) id: number) {
    console.log(typeof id);
  }
}
