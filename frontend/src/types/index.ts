export interface User {
  id: number
  username: string
  name: string
  isAdmin: boolean
}

export interface Task {
  id: number
  userId: number
  parentId: number | null
  name: string
  description: string
  level: number
  estimatedMinutes: number
  plannedDate: string
  dueDate: string | null
  status: 'pending' | 'done'
  completedAt: string | null
  createdAt: string
  children?: Task[]
  // 倒计时相关字段
  remainingSeconds: number
  timerRunning: boolean
  timerStartedAt: string | null
}

export interface StatsOverview {
  total: number
  completed: number
  completionRate: number
  overdue: number
}

export interface TrendData {
  date: string
  count: number
  minutes: number
}

export interface UnfinishedTask {
  id: number
  name: string
  plannedDate: string
  estimatedMinutes: number
}

export interface CalendarData {
  [date: string]: { name: string; status: string; level: number }[]
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface ImportResult {
  success: number
  updated: number
}
