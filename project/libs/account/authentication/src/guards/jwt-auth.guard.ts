import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SpaceName } from '@project/constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(SpaceName.Jwt) {}
