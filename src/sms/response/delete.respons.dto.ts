import { ApiProperty } from '@nestjs/swagger';

export class DeleteSmsDto {
  @ApiProperty({ description: 'status', example: 'OK' })
  status: string;
  @ApiProperty({ description: 'deleted result' })
  results: string;
}
