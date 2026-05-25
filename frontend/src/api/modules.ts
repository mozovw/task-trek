import api from './index'
import type { AuthResponse, User, Task, StatsOverview, TrendData, UnfinishedTask, CalendarData, ImportResult } from '@/types'

export const authApi = {
  login: (username: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { username, password }),

  register: (username: string, password: string, name?: string) =>
    api.post<AuthResponse>('/auth/register', { username, password, name }),

  logout: () =>
    api.post('/auth/logout'),

  changePassword: (oldPassword: string, newPassword: string, newPasswordConfirm: string) =>
    api.put('/auth/password', { oldPassword, newPassword, newPasswordConfirm }),
}

export const userApi = {
  getUserInfo: () =>
    api.get<User>('/user'),

  updateName: (name: string) =>
    api.put<User>('/user/name', { name }),

  getWhiteNoiseUrl: () =>
    api.get<{ whiteNoiseUrl: string | null }>('/user/settings/white-noise'),

  updateWhiteNoiseUrl: (whiteNoiseUrl: string | null) =>
    api.put<{ whiteNoiseUrl: string | null }>('/user/settings/white-noise', { whiteNoiseUrl }),
}

export const taskApi = {
  getTasks: (date?: string) => {
    const config = date ? { params: { date } } : {}
    return api.get<Task[]>('/tasks', config)
  },

  createTask: (data: Partial<Task>) =>
    api.post<Task>('/tasks', data),

  updateTask: (id: number, data: Partial<Task>) =>
    api.put<Task>(`/tasks/${id}`, data),

  deleteTask: (id: number, deleteAll = false) =>
    api.delete(`/tasks/${id}?deleteAll=${deleteAll}`),

  checkinTask: (id: number) =>
    api.post(`/tasks/${id}/checkin`),

  cancelCheckin: (id: number) =>
    api.post(`/tasks/${id}/cancel-checkin`),

  // 倒计时相关 API
  startTimer: (id: number) =>
    api.post<Task>(`/tasks/${id}/timer/start`),

  pauseTimer: (id: number) =>
    api.post<Task>(`/tasks/${id}/timer/pause`),

  syncTimer: (id: number) =>
    api.post<Task>(`/tasks/${id}/timer/sync`),
}

export const statsApi = {
  getOverview: () =>
    api.get<StatsOverview>('/stats/overview'),

  getTrend: (days: number) =>
    api.get<TrendData[]>('/stats/trend', { params: { days } }),

  getUnfinished: () =>
    api.get<UnfinishedTask[]>('/stats/unfinished'),

  getCalendar: (year: number, month: number) =>
    api.get<CalendarData>('/stats/calendar', { params: { year, month } }),
}

export const exportApi = {
  exportMarkdown: () =>
    api.get('/export/markdown', { responseType: 'blob' }),

  getTemplate: () =>
    api.get('/export/template', { responseType: 'blob' }),

  importMarkdown: (content: string) =>
    api.post<ImportResult>('/export/import', { content }),

  clearAllTasks: () =>
    api.post('/export/clear'),
}
