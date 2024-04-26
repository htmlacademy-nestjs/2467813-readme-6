import {
  ConflictException,
  HttpException,
  HttpStatus,
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
import { IToken, ITokenPayload, IUser } from '@project/core';
import { UpdateUserPassword } from '../dto/update-user-password.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
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

    const result = await this.blogUserRepository.save(userEntity);
    userEntity.id = result;
    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUser.NotFound);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthUser.PasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthUser.NotFound);
    }

    return user;
  }

  public async changePassword(userId: string, dto: UpdateUserPassword) {
    const { password, newPassword } = dto;

    if (password === newPassword) {
      throw new NotFoundException(AuthUser.ComparePassword);
    }

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(AuthUser.NotFound);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthUser.PasswordWrong);
    }

    existUser.id = userId;
    const updatedUser = await new BlogUserEntity(existUser).setPassword(
      newPassword
    );

    return await this.blogUserRepository.update(updatedUser);
  }

  public async createUserToken(user: IUser): Promise<IToken> {
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        accessToken,
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
