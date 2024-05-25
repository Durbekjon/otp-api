import { Injectable } from '@nestjs/common';
import { IUser } from 'src/auth/dto/IUser';
import { PrismaService } from 'src/core/prisma/prisma.service';
import axios from 'axios';
import { API_ACCESS_TOKEN, API_GATEWAY, API_URL } from 'consts/sms-api-options';
import { SendDto } from './dto/send.dto';
import { MultipleSendDto } from './dto/send.multiple';
import { DeleteDto } from './dto/delete.dto';
@Injectable()
export class SmsRepository {
  constructor(private prismaService: PrismaService) {}

  async checkUser(user: IUser) {
    const eUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
    });

    if (!eUser) {
      return false;
    }

    return user;
  }

  async newSMS(data: SendDto, user: IUser) {
    await this.send(data.number, data.message);
    return await this.prismaService.sms.create({
      data: {
        number: data.number,
        message: data.message,
        sender: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async send(number: string, message: string) {
    const requestObject = JSON.stringify({
      accessToken: API_ACCESS_TOKEN,
      gateway: API_GATEWAY,
      smsBeans: [
        {
          destination: number,
          message: message,
        },
      ],
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestObject,
    };

    const response = await axios.request(config);

    console.log(response.data);
  }

  async newSmsMultiple(data: MultipleSendDto, user: IUser) {
    const smsBeans = [];
    const responseDatas = [];

    data.numbers.forEach((e) => {
      smsBeans.push({
        destination: e.number,
        message: data.message,
      });
      responseDatas.push({
        number: e.number,
        message: data.message,
        senderId: user.id, // Direct reference to senderId
      });
    });

    const requestObject = JSON.stringify({
      accessToken: API_ACCESS_TOKEN,
      gateway: API_GATEWAY,
      smsBeans,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestObject,
    };

    await axios.request(config);

    return await this.prismaService.sms.createMany({ data: responseDatas });
  }
  async get(user: IUser) {
    return await this.prismaService.sms.findMany({
      where: { senderId: user.id },
      include: {
        sender: true,
      },
    });
  }

  async remove(data: DeleteDto) {
    const removed = [];
    data.ids.map((i: string) => {
      this.remover(i);
      removed.push(i);
    });

    return removed;
  }

  async remover(id: string) {
    return await this.prismaService.sms.delete({ where: { id } });
  }
}
