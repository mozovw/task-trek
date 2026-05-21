# Task-Trek

轻量级任务规划工具，支持三层级任务管理、打卡系统、进度统计和日历视图。

## 技术栈

| 层 | 技术 |
|---|------|
| 前端 | Vue 3 + Vite + TypeScript + Naive UI + Pinia + Vue Router |
| 后端 | Nest.js + Express + TypeORM + SQLite + JWT |
| 图表 | ECharts |
| 图标 | @vicons/ionicons5 |

## 功能

- 三层级任务（一级/二级/三级）管理，树形结构展示
- 子任务级联创建，父任务耗时自动清零
- 打卡/取消打卡，父子任务级联操作
- 进度统计概览、完成趋势、未完成任务清单
- 日历视图，点击日期跳转任务管理
- Markdown 导入/导出
- 用户注册/登录，数据按用户隔离

## 快速开始

### 1. 启动后端

```bash
cd backend
npm install
npm run start:dev
```

后端运行在 http://localhost:3000

### 2. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端运行在 http://localhost:5173

### 3. 默认账户

- 用户名：`admin`
- 密码：`123456`

## 开发命令

### 后端

| 命令 | 说明 |
|------|------|
| `npm run start:dev` | 开发模式（热重载） |
| `npm run build` | 构建 |
| `npm run start:prod` | 生产模式 |
| `npm run test:e2e` | 端到端测试 |

### 前端

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建结果 |

## 业务规则

- 新建任务默认一级，通过行内按钮创建子任务
- 一级可创建二级，二级可创建三级，三级不可再创建
- 有子任务的父任务预计耗时自动清零
- 统计只计算有预计耗时的叶子节点任务
- 删除任务级联删除所有后代任务及打卡记录
- 打卡/取消打卡在父子任务间级联

## 数据库

SQLite 文件位于 `backend/data/app.db`，TypeORM 自动建表。