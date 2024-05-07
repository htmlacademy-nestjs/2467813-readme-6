import { AuthGuard } from '@nestjs/passport';
import { SpaceName } from '@project/constant';

export class JwtRefreshGuard extends AuthGuard(SpaceName.JwtRefresh) {}
