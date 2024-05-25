import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SmsRepository } from './sms.repository';
import { IUser } from 'src/auth/dto/IUser';
import { SendDto } from './dto/send.dto';
import { StatusResponseDto } from 'src/core/responses/status-response.dto';
import { SmsDto } from './dto/sms.dto';
import { MultipleSendDto } from './dto/send.multiple';

@Injectable()
export class SmsService {
  constructor(private smsRepository: SmsRepository) {}

  async sendSms(
    data: SendDto,
    user: IUser,
  ): Promise<StatusResponseDto<SmsDto>> {
    const checkUser = await this.smsRepository.checkUser(user);

    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newSms = await this.smsRepository.newSMS(data, user);

    return {
      status: 'OK',
      results: newSms,
    };
  }

  async sendMultiple(data: MultipleSendDto, user: IUser) {
    const sms = await this.smsRepository.newSmsMultiple(data, user);

    return {
      status: 'OK',
      results: sms,
    };
  }

  async get(user: IUser) {
    const sms = await this.smsRepository.get(user);

    return {
      status: 'OK',
      results: sms,
    };
  }
}
