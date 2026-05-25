import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Req() req: any, @Query('date') date?: string) {
    if (date) {
      return this.taskService.getTasksByDate(req.user.userId, date);
    }
    return this.taskService.getAllTasks(req.user.userId);
  }

  @Post()
  async createTask(@Req() req: any, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(req.user.userId, dto);
  }

  @Put(':id')
  async updateTask(@Req() req: any, @Param('id') id: number, @Body() dto: UpdateTaskDto) {
    // 如果有 repeatUntilDate，直接走 updateTask（内部会调用 createRepeatedTasks 创建新重复系列）
    // 否则检查是否为重复系列任务，走 updateRepeatSeries 同步更新
    if (!dto.repeatUntilDate) {
      const task = await this.taskService['taskRepository'].findOne({ where: { id, userId: req.user.userId } });
      if (task?.repeatSeriesId) {
        return this.taskService.updateRepeatSeries(req.user.userId, id, dto);
      }
    }
    return this.taskService.updateTask(req.user.userId, id, dto);
  }

  @Delete(':id')
  async deleteTask(@Req() req: any, @Param('id') id: number, @Query('deleteAll') deleteAll?: string) {
    const deleteAllBool = deleteAll === 'true';
    await this.taskService.deleteTask(req.user.userId, id, deleteAllBool);
    return { message: '删除成功' };
  }

  @Post(':id/checkin')
  async checkinTask(@Req() req: any, @Param('id') id: number) {
    return this.taskService.checkinTask(req.user.userId, id);
  }

  @Post(':id/cancel-checkin')
  async cancelCheckin(@Req() req: any, @Param('id') id: number) {
    return this.taskService.cancelCheckin(req.user.userId, id);
  }

  @Post(':id/timer/start')
  async startTimer(@Req() req: any, @Param('id') id: number) {
    return this.taskService.startTimer(req.user.userId, id);
  }

  @Post(':id/timer/pause')
  async pauseTimer(@Req() req: any, @Param('id') id: number) {
    return this.taskService.pauseTimer(req.user.userId, id);
  }

  @Post(':id/timer/sync')
  async syncTimer(@Req() req: any, @Param('id') id: number) {
    return this.taskService.syncTimer(req.user.userId, id);
  }
}
