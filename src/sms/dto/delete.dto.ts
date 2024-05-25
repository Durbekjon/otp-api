import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class DeleteDto {
  @ApiProperty({ description: 'telephone numbers', type: [String] })
  @Type(() => String)
  @IsArray()
  ids: string[];
}
