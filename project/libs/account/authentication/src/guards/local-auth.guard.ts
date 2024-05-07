import { AuthGuard } from '@nestjs/passport';
import { SpaceName } from '@project/constant';

export class LocalAuthGuard extends AuthGuard(SpaceName.Local) {}
