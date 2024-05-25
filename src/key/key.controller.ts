import {
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { KeyService } from './key.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusResponseDto } from 'src/core/responses/status-response.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { IUser } from 'src/auth/dto/IUser';

@UseGuards(JwtAuthGuard)
@Controller('key')
export class KeyController {
  constructor(private keyService: KeyService) {}

  @ApiOperation({ summary: 'Generate unique api key' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Post()
  generateKey(
    @Req() req: Request & { user: IUser },
  ): Promise<StatusResponseDto<string>> {
    const user = req.user;
    return this.keyService.generateKey(user);
  }

  @ApiOperation({ summary: 'Get my api key' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Get()
  getKey(
    @Req() req: Request & { user: IUser },
  ): Promise<StatusResponseDto<string>> {
    const user = req.user;
    return this.keyService.getMyKey(user);
  }

  @ApiOperation({ summary: 'Delete my api key' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => StatusResponseDto,
  })
  @Version('1')
  @Delete()
  deleteKey(
    @Req() req: Request & { user: IUser },
  ): Promise<StatusResponseDto<string>> {
    const user = req.user;
    return this.keyService.removeKey(user);
  }
}
