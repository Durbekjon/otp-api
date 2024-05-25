import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { TokensService } from './auth-token.service';
import { CoreModule } from '../core/core.module';

@Module({
  providers: [AuthService, AuthRepository, TokensService],
  controllers: [AuthController],
  imports: [CoreModule],
})
export class AuthModule {}
