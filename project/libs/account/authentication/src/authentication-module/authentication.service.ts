import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUser } from '../const';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IToken, IUser } from '@project/core';
import { UpdateUserPassword } from '../dto/update-user-password.dto';
import { createJWTPayload, getMessageNotFoundDocument } from '@project/helpers';
import { jwtConfig } from '@project/config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, firstName, lastName, password, avatarPath } = dto;

    const blogUser = {
      email,
      firstName,
      lastName,
      avatarPath: avatarPath ?? '',
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUser.Exists);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    const resultId = await this.blogUserRepository.save(userEntity);
    userEntity.id = resultId;
    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(getMessageNotFoundDocument('User', email));
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthUser.PasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(getMessageNotFoundDocument('User', id));
    }

    return user;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(getMessageNotFoundDocument('User', email));
    }

    return existUser;
  }

  public async changePassword(userId: string, dto: UpdateUserPassword) {
    const { password, newPassword } = dto;

    if (password === newPassword) {
      throw new NotFoundException(AuthUser.ComparePassword);
    }

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(getMessageNotFoundDocument('User', userId));
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthUser.PasswordWrong);
    }

    const updatedUser = await new BlogUserEntity(existUser).setPassword(
      newPassword
    );

    return await this.blogUserRepository.update(updatedUser);
  }

  public async createUserToken(user: IUser): Promise<IToken> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: randomUUID(),
    };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        AuthUser.TokenError,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
