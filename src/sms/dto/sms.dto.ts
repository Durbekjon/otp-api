import { ApiProperty } from '@nestjs/swagger';

export class SmsDto {
  @ApiProperty({ description: 'Sms id' })
  id: string;
  @ApiProperty({ description: 'Sms number' })
  number: string;
  @ApiProperty({ description: 'Sms text' })
  message: string;
  @ApiProperty({ description: 'Sms sender id' })
  senderId: string;
  @ApiProperty({ description: 'Sms sended at <time>' })
  createdAt: Date;
}
