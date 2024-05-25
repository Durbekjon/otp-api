import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KeyModule } from './key/key.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [AuthModule, KeyModule, SmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
