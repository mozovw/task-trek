import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { RegisterDto, LoginDto, ChangePasswordDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException('两次输入的密码不一致');
    }

    const existing = await this.userRepository.findOne({ where: { username: dto.username } });
    if (existing) {
      throw new BadRequestException('用户名已存在');
    }

    const user = new User();
    user.username = dto.username;
    user.passwordHash = await bcrypt.hash(dto.password, 10);
    user.name = dto.name || dto.username;
    user.isAdmin = false;

    await this.userRepository.save(user);

    const payload = { sub: user.id, username: user.username, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      user: { id: user.id, username: user.username, name: user.name, isAdmin: user.isAdmin },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { username: dto.username } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const payload = { sub: user.id, username: user.username, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      user: { id: user.id, username: user.username, name: user.name, isAdmin: user.isAdmin },
    };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    if (dto.newPassword !== dto.newPasswordConfirm) {
      throw new BadRequestException('两次输入的新密码不一致');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    if (!(await bcrypt.compare(dto.oldPassword, user.passwordHash))) {
      throw new BadRequestException('原密码错误');
    }

    user.passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.save(user);
  }

  async validateUser(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
