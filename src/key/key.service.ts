import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { KeyRepository } from './key.repository';
import { IUser } from 'src/auth/dto/IUser';
import { StatusResponseDto } from 'src/core/responses/status-response.dto';

@Injectable()
export class KeyService {
  constructor(private keyRepository: KeyRepository) {}

  async generateKey(user: IUser): Promise<StatusResponseDto<string>> {
    const checkUser = await this.keyRepository.checkUser(user);

    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkKey = await this.keyRepository.checkExistKey(user);
    if (checkKey) {
      throw new HttpException('You already have api key', HttpStatus.FORBIDDEN);
    }

    const newKey = await this.keyRepository.createKey(user);

    return {
      status: 'OK',
      results: newKey.id,
    };
  }

  async getMyKey(user: IUser): Promise<StatusResponseDto<string>> {
    const checkUser = await this.keyRepository.checkUser(user);

    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const key = await this.keyRepository.getKey(user);

    if (!key) {
      throw new HttpException('Key not found', HttpStatus.NOT_FOUND);
    }
    return {
      status: 'OK',
      results: key.id,
    };
  }

  async removeKey(user: IUser): Promise<StatusResponseDto<string>> {
    const key = await this.keyRepository.removeKey(user);

    if (!key) {
      throw new HttpException('Key not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'OK',
      results: 'Your API KEY deleted successfully',
    };
  }
}
