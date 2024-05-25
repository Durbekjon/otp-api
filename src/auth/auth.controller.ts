import { Controller, Post, Body, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuthResponseDto } from './dto/auth-response.dto';
import { StatusResponseDto } from '../core/responses/status-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => UserAuthResponseDto,
  })
  @Version('1')
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
