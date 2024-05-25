import { Module } from '@nestjs/common';
import { KeyController } from './key.controller';
import { KeyService } from './key.service';
import { CoreModule } from 'src/core/core.module';
import { KeyRepository } from './key.repository';

@Module({
  controllers: [KeyController],
  providers: [KeyService, KeyRepository],
  imports: [CoreModule],
})
export class KeyModule {}
