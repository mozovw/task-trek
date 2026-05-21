import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('checkins')
@UseGuards(JwtAuthGuard)
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Get('range')
  async getCheckinsByRange(
    @Req() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.checkinService.getCheckinsByDateRange(req.user.userId, startDate, endDate);
  }
}
