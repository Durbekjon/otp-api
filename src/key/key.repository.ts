import { Injectable } from '@nestjs/common';
import { IUser } from 'src/auth/dto/IUser';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class KeyRepository {
  constructor(private prismaService: PrismaService) {}

  async checkUser(user: IUser) {
    const existUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
    });

    if (!existUser) {
      return false;
    }

    return true;
  }

  async checkExistKey(user: IUser) {
    const checkUserKey = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: { key: true },
    });
    if (!checkUserKey.key) {
      return false;
    }

    return true;
  }

  async createKey(user: IUser) {
    const data = { user: { connect: { id: user.id } } };
    return await this.prismaService.key.create({ data });
  }

  async getKey(user: IUser) {
    const key = await this.prismaService.key.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!key) {
      return false;
    }

    return key;
  }

  async removeKey(user: IUser) {
    const key = await this.getKey(user);

    if (!key) {
      return false;
    }

    await this.prismaService.key.delete({ where: { id: key.id } });

    return true;
  }
}
