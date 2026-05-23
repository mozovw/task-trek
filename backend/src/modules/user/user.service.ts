import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    return { 
      id: user.id, 
      username: user.username, 
      name: user.name, 
      isAdmin: user.isAdmin,
      whiteNoiseUrl: user.whiteNoiseUrl,
    };
  }

  async updateName(userId: number, name: string) {
    if (!name || name.length > 20) {
      throw new BadRequestException('昵称长度限制：1-20 个字符');
    }
    await this.userRepository.update(userId, { name });
    return this.getUserInfo(userId);
  }

  async getWhiteNoiseUrl(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, select: { id: true, whiteNoiseUrl: true } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    return { whiteNoiseUrl: user.whiteNoiseUrl };
  }

  async updateWhiteNoiseUrl(userId: number, whiteNoiseUrl: string | null) {
    // 空字符串视为 null，统一存储格式
    const normalizedUrl = whiteNoiseUrl === '' ? null : whiteNoiseUrl;
    await this.userRepository.update(userId, { whiteNoiseUrl: normalizedUrl });
    return this.getWhiteNoiseUrl(userId);
  }
}
