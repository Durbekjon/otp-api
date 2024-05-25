import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../../consts/jwt-options';
import { IUser } from './dto/IUser';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ForbiddenException('TOKEN_NOT_PROVIDED');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token || token === 'undefined') {
      throw new ForbiddenException('TOKEN_NOT_PROVIDED');
    }
    try {
      const user = this.jwtService.verify(token, { secret: JWT_SECRET });
      const iUser: IUser = {
        id: user.id,
      };
      req.user = iUser;
      return true;
    } catch (e) {
      if (e.status && e.status === 403) {
        throw e;
      }
      throw new UnauthorizedException('WRONG_TOKEN');
    }
  }
}
