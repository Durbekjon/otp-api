import { ApiProperty } from '@nestjs/swagger';

export class StatusResponseDto<Results = undefined> {
  @ApiProperty({ description: 'status', example: 'OK' })
  status: string;
  @ApiProperty({ description: 'status', required: false })
  results?: Results;
}
