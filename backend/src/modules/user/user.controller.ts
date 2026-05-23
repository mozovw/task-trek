import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UpdateNameDto } from './dto/user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserInfo(@Req() req: any) {
    return this.userService.getUserInfo(req.user.userId);
  }

  @Put('name')
  async updateName(@Req() req: any, @Body() body: UpdateNameDto) {
    return this.userService.updateName(req.user.userId, body.name);
  }

  @Get('settings/white-noise')
  async getWhiteNoiseUrl(@Req() req: any) {
    return this.userService.getWhiteNoiseUrl(req.user.userId);
  }

  @Put('settings/white-noise')
  async updateWhiteNoiseUrl(@Req() req: any, @Body('whiteNoiseUrl') whiteNoiseUrl: any) {
    return this.userService.updateWhiteNoiseUrl(req.user.userId, whiteNoiseUrl ?? null);
  }
}
