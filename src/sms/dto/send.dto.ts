import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendDto {
  @ApiProperty({ description: 'SMS phone number', example: '+998995441929' })
  @IsNotEmpty()
  @IsString()
  number: string;
  @ApiProperty({ description: 'SMS Message text' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
