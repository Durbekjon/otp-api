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

  @ApiProperty({
    description: 'Your API KEY',
    example: 'e037dc21-9c23-4b56-a565-a1b480e3d1b9',
  })
  @IsNotEmpty()
  @IsString()
  key: string;
}
