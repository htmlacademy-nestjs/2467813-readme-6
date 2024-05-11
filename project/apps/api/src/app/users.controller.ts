import 'multer';
import { Express } from 'express';
import { HttpService } from '@nestjs/axios';
import FormData from 'form-data';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  AuthUser,
  AuthenticationResponseMessage,
  CreateUserDto,
  LoggedUserRdo,
  LoginUserDto,
  OpenApiMessages,
  UpdateTokensRdo,
  UpdateUserPassword,
  UserRdo,
} from '@project/authentication';

import {
  AppRoutes,
  ApplicationServiceURL,
  AuthToken,
  Path,
} from '@project/constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { MongoIdValidationPipe } from '@project/pipes';
import { UserDetailRdo } from './rdo/user-detail.rdo';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadedFileRdo } from '@project/file-uploader';

@ApiTags(AppRoutes.Users)
@Controller(AppRoutes.Users)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: CreateUserDto,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @ApiOperation({ summary: OpenApiMessages.path.register.summary })
  @UseInterceptors(FileInterceptor('file'))
  @Post(Path.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      const formData = new FormData();

      formData.append('file', file.buffer, file.originalname);

      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
        `${ApplicationServiceURL.File}/${Path.Upload}`,
        formData
      );

      dto.avatarPath = data.id;
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/${Path.Register}`,
      dto
    );
    return data;
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
  @ApiOperation({ summary: OpenApiMessages.path.login.summary })
  @Post(Path.Login)
  public async login(@Body() dto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/${Path.Login}`,
      dto
    );
    return data;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UpdateUserPassword,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.NewPassword.summary })
  @Patch(Path.NewPassword)
  public async updatePassword(
    @Body() dto: UpdateUserPassword,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Users}/${dto.userId}/${Path.NewPassword}`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthUser.IsNotLogged,
  })
  @ApiOperation({ summary: OpenApiMessages.path.Refresh.summary })
  @Post(Path.Refresh)
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/${Path.Refresh}`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @ApiResponse({
    type: UserDetailRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiOperation({ summary: OpenApiMessages.path.DetailUser.summary })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${id}`
    );
    const { data: dataCount } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/${id}/${Path.Statistics}`
    );

    return {
      ...data,
      countPublic: dataCount,
    };
  }
}
