import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class PhoneNumber {
  @ApiProperty({ description: 'Sms Number' })
  @IsNotEmpty()
  @IsString()
  number: string;
}

export class MultipleSendDto {
  @ApiProperty({ description: 'telephone numbers', type: [PhoneNumber] })
  @ValidateNested({ each: true })
  @Type(() => PhoneNumber)
  @IsArray()
  numbers: PhoneNumber[];

  @ApiProperty({ description: 'SMS Message' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
