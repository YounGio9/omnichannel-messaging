import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConversationService } from 'src/conversation/conversation.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: ConversationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing credentials');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Basic') {
      throw new UnauthorizedException('Invalid auth type');
    }

    const credentials = Buffer.from(token, 'base64')
      .toString('ascii')
      .split(':');
    const [username, password] = credentials;

    const user = await firstValueFrom(
      await this.authService.validateUser(username, password),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    request.user = user;
    return true;
  }
}
