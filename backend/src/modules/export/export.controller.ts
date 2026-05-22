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
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(dayAfter.getDate() + 2)

    const fmt = (d: Date) => d.toISOString().split('T')[0]
    const d1 = fmt(today)
    const d2 = fmt(tomorrow)
    const d3 = fmt(dayAfter)

    const template = `# 英语学习
- 日期：${d1}
- 耗时：0分钟（一级任务，耗时由子任务累加）
- 描述：英语总任务，包含背单词和听力练习
- 状态：未完成

## 背单词
- 日期：${d1}
- 耗时：0分钟（二级任务，耗时由子任务累加）
- 描述：使用APP背诵50个新单词
- 状态：未完成

### 复习昨日单词
- 日期：${d1}
- 耗时：10分钟
- 状态：已完成

### 学习新单词
- 日期：${d1}
- 耗时：20分钟
- 状态：未完成

## 听力练习
- 日期：${d1}
- 耗时：0分钟（二级任务，耗时由子任务累加）
- 描述：每日听力训练
- 状态：未完成

### 精听训练
- 日期：${d1}
- 耗时：25分钟
- 状态：已完成

### 泛听播客
- 日期：${d1}
- 耗时：20分钟
- 状态：未完成

# 健身锻炼
- 日期：${d1}
- 耗时：0分钟（一级任务，耗时由子任务累加）
- 描述：今日健身计划，包含力量和拉伸
- 状态：未完成

## 力量训练
- 日期：${d1}
- 耗时：40分钟
- 描述：卧推、深蹲、引体向上
- 状态：未完成

## 拉伸放松
- 日期：${d1}
- 耗时：15分钟
- 描述：全身拉伸，缓解肌肉紧张
- 状态：已完成

# 阅读《深入理解计算机系统》
- 日期：${d1}
- 耗时：45分钟
- 描述：第三章 程序的机器级表示
- 状态：未完成

# 数学学习
- 日期：${d2}
- 耗时：0分钟（一级任务，耗时由子任务累加）
- 描述：高等数学学习计划
- 状态：未完成

## 微积分习题
- 日期：${d2}
- 耗时：0分钟（二级任务，耗时由子任务累加）
- 状态：未完成

### 导数部分
- 日期：${d2}
- 耗时：25分钟
- 状态：未完成

### 积分部分
- 日期：${d2}
- 耗时：35分钟
- 状态：已完成

## 线性代数复习
- 日期：${d2}
- 耗时：40分钟
- 描述：矩阵变换与特征值
- 状态：未完成

# 项目开发
- 日期：${d2}
- 耗时：0分钟（一级任务，耗时由子任务累加）
- 描述：Task-Trek 功能开发
- 状态：未完成

## 后端API开发
- 日期：${d2}
- 耗时：90分钟
- 描述：实现数据导出接口
- 状态：未完成

## 前端页面调整
- 日期：${d2}
- 耗时：60分钟
- 描述：优化移动端响应式布局
- 状态：已完成

# 生活采购
- 日期：${d2}
- 耗时：30分钟
- 描述：超市购买周末食材和生活用品
- 状态：未完成

# 项目报告
- 日期：${d3}
- 耗时：0分钟（一级任务，耗时由子任务累加）
- 描述：整理本周项目进展报告
- 状态：未完成

## 数据汇总
- 日期：${d3}
- 耗时：40分钟
- 描述：收集本周各项数据指标
- 状态：未完成

## 报告撰写
- 日期：${d3}
- 耗时：60分钟
- 描述：撰写周报并提交
- 状态：未完成

## 团队同步
- 日期：${d3}
- 耗时：30分钟
- 描述：邮件发送报告并通知相关成员
- 状态：未完成

# 面试准备
- 日期：${d3}
- 耗时：0分钟（一级任务，耗时由子任务累加）
- 描述：系统设计面试准备
- 状态：未完成

## 复习设计模式
- 日期：${d3}
- 耗时：45分钟
- 描述：单例、工厂、观察者模式
- 状态：已完成

## 系统设计练习
- 日期：${d3}
- 耗时：60分钟
- 描述：设计一个短链接服务
- 状态：未完成

# 纪录片观看
- 日期：${d3}
- 耗时：50分钟
- 描述：BBC《地球脉动》第三集
- 状态：未完成
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
