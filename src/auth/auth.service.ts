import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { StatusResponseDto } from 'src/core/responses/status-response.dto';
import * as bcrypt from 'bcrypt';
import { TokensService } from './auth-token.service';
import { SALT_ROUNDS } from 'consts/jwt-options';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private tokensService: TokensService,
  ) {}

  async register(data: RegisterDto): Promise<StatusResponseDto<string>> {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user = await this.authRepository.register({
      ...data,
      password: hashedPassword,
    });

    return {
      status: 'OK',
      results: user.id,
    };
  }

  async login(data: LoginDto) {
    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.tokensService.createTokens(
      user.id,
    );

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }
}
