import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('overview')
  async getOverview(@Req() req: any) {
    return this.statsService.getOverview(req.user.userId);
  }

  @Get('trend')
  async getTrend(@Req() req: any, @Query('days') days: number) {
    return this.statsService.getTrend(req.user.userId, days || 7);
  }

  @Get('unfinished')
  async getUnfinished(@Req() req: any) {
    return this.statsService.getUnfinished(req.user.userId);
  }

  @Get('calendar')
  async getCalendar(
    @Req() req: any,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.statsService.getCalendarData(req.user.userId, year, month);
  }
}
