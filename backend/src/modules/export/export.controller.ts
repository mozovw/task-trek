import { Controller, Get, Post, Body, UseGuards, Req, Res, BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('markdown')
  async exportMarkdown(@Req() req: any, @Res() res: Response) {
    const md = await this.exportService.exportMarkdown(req.user.userId);
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks.md');
    res.send(md);
  }

  @Get('template')
  async getTemplate(@Res() res: Response) {
    const template = `# 英语学习
- 日期：2026-05-20
- 耗时：0分钟（一级任务，耗时由子任务累加）
- 描述：英语总任务，包含背单词和听力练习
- 状态：未完成

## 背单词
- 日期：2026-05-20
- 耗时：0分钟（二级任务，耗时由子任务累加）
- 描述：使用APP背诵50个新单词
- 状态：未完成

### 复习昨日单词
- 日期：2026-05-20
- 耗时：10分钟
- 状态：已完成

### 学习新单词
- 日期：2026-05-20
- 耗时：20分钟
- 状态：未完成

## 听力练习
- 日期：2026-05-20
- 耗时：0分钟（二级任务，耗时由子任务累加）
- 描述：每日听力训练
- 状态：未完成

### 精听训练
- 日期：2026-05-20
- 耗时：25分钟
- 状态：已完成

### 泛听播客
- 日期：2026-05-20
- 耗时：20分钟
- 状态：未完成

# 数学学习
- 日期：2026-05-21
- 耗时：60分钟
- 描述：高等数学学习计划
- 状态：未完成

## 微积分习题
- 日期：2026-05-21
- 耗时：60分钟
- 状态：未完成

### 导数部分
- 日期：2026-05-21
- 耗时：25分钟
- 状态：未完成

### 积分部分
- 日期：2026-05-21
- 耗时：35分钟
- 状态：已完成
`;
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', 'attachment; filename=task_template.md');
    res.send(template);
  }

  @Post('import')
  async importMarkdown(@Req() req: any, @Body() body: { content: string }) {
    if (!body.content) {
      throw new BadRequestException('导入内容为空');
    }
    return this.exportService.importMarkdown(req.user.userId, body.content);
  }

  @Post('clear')
  async clearAllTasks(@Req() req: any) {
    await this.exportService.clearAllTasks(req.user.userId);
    return { message: '已清空所有任务' };
  }
}
