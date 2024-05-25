import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [AuthModule, SmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
