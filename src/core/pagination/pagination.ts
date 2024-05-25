import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export const DEFAULT_LIMIT = 20;
export const DEFAULT_PAGE = 1;

export class IPagination {
  @ApiProperty({
    description: `Limit, default: ${DEFAULT_LIMIT}`,
    required: false,
    default: DEFAULT_LIMIT,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit: number = DEFAULT_LIMIT;

  @ApiProperty({
    description: `Page, default: ${DEFAULT_PAGE}`,
    required: false,
    default: DEFAULT_PAGE,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number = DEFAULT_PAGE;
}
