<template>
  <div class="tasks-page">
    <!-- 顶部日期导航 -->
    <div class="top-bar">
      <div class="date-nav">
        <n-button circle class="nav-btn" @click="prevDay">
          <template #icon><n-icon><ChevronBack /></n-icon></template>
        </n-button>
        <n-date-picker v-model:value="currentDate" type="date" value-format="yyyy-MM-dd" :input-readonly="true" class="date-picker" @update:value="loadTasks" />
        <n-button circle class="nav-btn" @click="nextDay">
          <template #icon><n-icon><ChevronForward /></n-icon></template>
        </n-button>
        <n-button size="small" class="action-btn today-btn" @click="goToday">今天</n-button>
      </div>
      <div class="top-actions">
        <n-button size="small"  type="warning" @click="showUnfinished">未完成任务</n-button>
        <n-button type="primary" size="small" class="create-btn" @click="showCreateDialog">
          
          新建任务
        </n-button>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="task-list-card">
      <n-empty v-if="tasks.length === 0" description="暂无任务" class="empty-state" />
      <div v-for="task in tasks" :key="task.id" class="task-row" :style="{ paddingLeft: (task.level - 1) * 28 + 8 + 'px' }" :class="{ 'task-timer': task.timerRunning, 'task-done-state': task.status === 'done' }">
        <div class="task-main">
          <div class="task-check">
            <n-checkbox
              :checked="task.status === 'done'"
              @update:checked="() => toggleCheckin(task)"
            />
          </div>
          <div class="task-body">
            <span :class="{ 'task-name-done': task.status === 'done', 'task-name-timer': task.timerRunning }" class="task-name">{{ task.name }}</span>
            <span v-if="task.description" class="task-desc" :title="task.description">{{ task.description }}</span>
            <div class="task-tags">
              <span v-if="task.repeatSeriesId" class="series-tag">♻</span>
              <span v-if="(task.estimatedMinutes > 0 || (task.status === 'done' && task.originalEstimatedMinutes > 0)) && !task.timerRunning && !(localRemainingSeconds[task.id] && task.status !== 'done')" class="time-tag" :class="{ 'tag-done': task.status === 'done' }">
                <span class="tag-dot"></span>
                {{ task.status === 'done' ? (task.originalEstimatedMinutes || task.estimatedMinutes) : task.estimatedMinutes }}分钟
              </span>
              <span v-if="(task.timerRunning || localRemainingSeconds[task.id]) && task.status !== 'done'" class="timer-tag">
                <span class="timer-icon">⏱</span>
                {{ formatTimer(localRemainingSeconds[task.id] ?? task.remainingSeconds) }}
              </span>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <!-- 去完成/暂停按钮 -->
          <n-button v-if="!task.children?.length && task.estimatedMinutes > 0 && task.status !== 'done'" 
            size="small" 
            quaternary circle
            class="timer-btn"
            :disabled="runningTaskId !== null && runningTaskId !== task.id"
            :type="task.timerRunning ? 'warning' : 'primary'"
            @click="toggleTimer(task)">
            <template #icon><n-icon><component :is="task.timerRunning ? PauseCircleOutline : PlayCircleOutline" /></n-icon></template>
          </n-button>
          <n-button v-if="task.level < 3 && task.status !== 'done'" size="small" quaternary circle class="action-icon-btn" :disabled="task.timerRunning || runningTaskId !== null" @click="showAddChildDialog(task)">
            <template #icon><n-icon><AddCircle /></n-icon></template>
          </n-button>
          <n-button v-if="task.status !== 'done'" size="small" quaternary circle class="action-icon-btn" :disabled="runningTaskId !== null" @click="showEditDialog(task)">
            <template #icon><n-icon><Create /></n-icon></template>
          </n-button>
          <n-button v-if="task.status !== 'done'" size="small" quaternary circle class="action-icon-btn delete-btn" :disabled="runningTaskId !== null" @click="deleteTask(task)">
            <template #icon><n-icon><Trash /></n-icon></template>
          </n-button>
          <n-button v-if="task.status === 'done' && task.originalEstimatedMinutes > 0" size="small" quaternary circle class="action-icon-btn remark-btn" @click="showRemarkDialog(task)">
            <template #icon><n-icon><ChatboxEllipses /></n-icon></template>
          </n-button>
        </div>
      </div>
    </div>

    <!-- 创建/编辑对话框 -->
    <n-modal v-model:show="dialogVisible" preset="dialog" :title="isEdit ? '编辑任务' : '新建任务'" class="task-dialog">
      <n-form :model="taskForm" label-placement="left" label-width="80" class="dialog-form">
        <n-form-item label="任务名称">
          <n-input v-model:value="taskForm.name" placeholder="请输入任务名称" />
        </n-form-item>
        <n-form-item v-if="isEdit && taskForm.parentId && taskForm.level > 1" label="父任务">
          <n-input :value="parentName" disabled />
        </n-form-item>
        <n-form-item v-if="isEdit && !taskForm.parentId && taskForm.level > 1" label="父任务">
          <n-select v-model:value="taskForm.parentId" :options="parentSelectOptions" placeholder="选择父任务" />
        </n-form-item>
        <n-form-item label="计划日期">
          <n-date-picker v-model:value="taskForm.plannedDate" type="date" value-format="yyyy-MM-dd" class="dialog-date" :disabled="isRepeatSeriesTask" />
        </n-form-item>
        <n-form-item label="预计耗时">
          <n-input-number v-model:value="taskForm.estimatedMinutes" :min="0" :disabled="estimatedMinutesDisabled" />
          <span class="unit-text">分钟</span>
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="taskForm.description" type="textarea" :rows="3" />
        </n-form-item>
        <n-form-item v-if="isEdit && taskForm.level === 1" label="重复任务">
          <n-switch v-model:value="taskForm.repeatEnabled" :disabled="repeatDisabled" />
          <n-text v-if="repeatDisabled" depth="3" class="repeat-hint">
            {{ repeatHintText }}
          </n-text>
        </n-form-item>
        <n-form-item v-if="isEdit && taskForm.level === 1 && taskForm.repeatEnabled && !repeatDisabled" label="重复到">
          <n-date-picker
            v-model:value="taskForm.repeatUntilDate"
            type="date"
            :is-date-disabled="isDateBeforePlanned"
            class="dialog-date"
          />
        </n-form-item>
        <n-form-item v-if="isEdit && taskForm.level === 1 && taskForm.repeatEnabled && !repeatDisabled" label="重复频次">
          <n-space class="weekday-group">
            <n-checkbox v-for="(label, day) in weekdayLabels" :key="day" :checked="taskForm.repeatDays.includes(Number(day))" @update:checked="(v: boolean) => toggleWeekday(Number(day), v)">
              {{ label }}
            </n-checkbox>
          </n-space>
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="dialogVisible = false">取消</n-button>
          <n-button type="primary" @click="saveTask">保存</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 未完成任务弹窗 -->
    <n-modal v-model:show="showUnfinishedModal" preset="dialog" title="未完成任务" :style="{ width: '500px' }">
      <n-data-table
        :columns="unfinishedColumns"
        :data="unfinishedTasks"
        :pagination="false"
        size="small"
      />
    </n-modal>

    <!-- 任务备注弹窗 -->
    <n-modal v-model:show="showRemarkModal" preset="dialog" title="任务备注" :style="{ width: '450px' }">
      <n-input v-model:value="remarkContent" type="textarea" :rows="5" placeholder="请输入备注内容..." />
      <template #action>
        <n-space>
          <n-button @click="showRemarkModal = false">取消</n-button>
          <n-button :loading="remarkSaving" @click="clearRemark">清除并保存</n-button>
          <n-button type="primary" :loading="remarkSaving" @click="saveRemark">保存</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, h, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useDialog, type DataTableColumns } from 'naive-ui'
import { NIcon, NButton } from 'naive-ui'
import { ChevronBack, ChevronForward, Add, AddCircle, Create, Trash, ChatboxEllipses, PlayCircleOutline, PauseCircleOutline } from '@vicons/ionicons5'
import { taskApi, statsApi } from '@/api/modules'
import { useWhiteNoiseStore } from '@/stores/whiteNoise'
import type { Task, UnfinishedTask } from '@/types'

const message = useMessage()
const dialog = useDialog()
const route = useRoute()
const router = useRouter()
const whiteNoiseStore = useWhiteNoiseStore()

const now = new Date()
const currentDate = ref((route.query.date as string) || now.toISOString().split('T')[0])
const tasks = ref<Task[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref<number | null>(null)
const editingHasChildren = ref(false)
const originalRepeatUntilDate = ref<string | null>(null)
const editingTaskStatus = ref<string>('pending')
const allTasks = ref<Task[]>([])

const timerIntervals = new Map<number, number>() // taskId -> intervalId (1s sync + countdown)

const showUnfinishedModal = ref(false)
const unfinishedTasks = ref<UnfinishedTask[]>([])

// 备注功能
const showRemarkModal = ref(false)
const remarkContent = ref('')
const remarkSaving = ref(false)
const remarkTaskId = ref<number | null>(null)

const showRemarkDialog = (task: Task) => {
  remarkTaskId.value = task.id
  remarkContent.value = task.remark || ''
  showRemarkModal.value = true
}

const saveRemark = async () => {
  if (remarkTaskId.value === null) return
  remarkSaving.value = true
  try {
    await taskApi.updateRemark(remarkTaskId.value, remarkContent.value || null)
    message.success('备注保存成功')
    showRemarkModal.value = false
    loadTasks()
  } catch (e: any) {
    message.error(e.response?.data?.message || e.message || '保存失败')
  } finally {
    remarkSaving.value = false
  }
}

const clearRemark = async () => {
  if (remarkTaskId.value === null) return
  remarkSaving.value = true
  try {
    await taskApi.updateRemark(remarkTaskId.value, null)
    remarkContent.value = ''
    message.success('备注已清除')
    showRemarkModal.value = false
    loadTasks()
  } catch (e: any) {
    message.error(e.response?.data?.message || e.message || '清除失败')
  } finally {
    remarkSaving.value = false
  }
}

// 本地倒计时状态（用于每秒更新显示）
const localRemainingSeconds = ref<Record<number, number>>({})

// 已完成并播放过提示音的任务ID集合
const completedTaskIds = ref<Set<number>>(new Set())

// 全局运行中的任务ID（用于锁定其他任务的"去完成"按钮）
const runningTaskId = ref<number | null>(null)

const taskForm = reactive({
  name: '',
  level: 1,
  plannedDate: now.toISOString().split('T')[0] as string,
  estimatedMinutes: 0,
  description: '',
  parentId: undefined as number | undefined,
  repeatEnabled: false,
  repeatUntilDate: null as number | null,
  repeatSeriesId: null as string | null,
  repeatDays: [0, 1, 2, 3, 4, 5, 6] as number[],
})

const weekdayLabels: Record<number, string> = {
  1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六', 0: '周日',
}

const toggleWeekday = (day: number, checked: boolean) => {
  if (checked) {
    if (!taskForm.repeatDays.includes(day)) {
      taskForm.repeatDays.push(day)
    }
  } else {
    taskForm.repeatDays = taskForm.repeatDays.filter(d => d !== day)
  }
}

const parentOptions = computed(() => {
  if (taskForm.level === 1) {
    // 一级任务可以选择其他一级任务作为父任务（降级为二级）
    return allTasks.value.filter((t) => t.level === 1 && t.id !== editingId.value)
  }
  if (taskForm.level === 2) {
    return allTasks.value.filter((t) => t.level === 1)
  }
  if (taskForm.level === 3) {
    return allTasks.value.filter((t) => t.level === 2)
  }
  return []
})

const parentSelectOptions = computed(() =>
  parentOptions.value.map((t) => ({ label: t.name, value: t.id }))
)

const parentName = computed(() => {
  if (!taskForm.parentId) return ''
  const parent = allTasks.value.find((t) => t.id === taskForm.parentId)
  return parent ? parent.name : ''
})

const hasChildren = computed(() => {
  if (!isEdit.value) return false
  return editingHasChildren.value
})

// 重复任务编辑权限：母任务和中间重复任务置灰，仅最后一天可配
// 使用 originalRepeatUntilDate（原始值）而非 taskForm.repeatUntilDate（绑定到 date-picker，选择新值会变化）
const repeatDisabled = computed(() => {
  if (!isEdit.value) return false
  if (!taskForm.repeatSeriesId || !originalRepeatUntilDate.value) return false
  return taskForm.plannedDate !== originalRepeatUntilDate.value
  })

// 重复系列任务限制：不可修改计划日期
const isRepeatSeriesTask = computed(() => {
  return isEdit.value && !!taskForm.repeatSeriesId
})

// 重复系列任务的预计耗时：已完成或有子任务时禁用
const estimatedMinutesDisabled = computed(() => {
  if (isRepeatSeriesTask.value && editingTaskStatus.value === 'done') return true
  return hasChildren.value
})

const repeatHintText = computed(() => {
  if (!taskForm.repeatSeriesId) return ''
  if (repeatDisabled.value) {
    return '此任务已属于重复序列，不可修改重复设置'
  }
  return '此任务为序列最后一天，可配置新的重复序列'
})

// 重复任务日期禁用：不允许选择计划日期及之前的日期
const isDateBeforePlanned = (ts: number) => {
  const plannedTs = new Date(taskForm.plannedDate + 'T00:00:00').getTime()
  return ts <= plannedTs
}

// 格式化计时器显示（秒 -> MM:SS）
const formatTimer = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

// 切换计时器（开始/暂停）
const toggleTimer = async (task: Task) => {
  try {
    if (task.timerRunning) {
      // 暂停计时器
      await taskApi.pauseTimer(task.id)
      stopAllIntervals(task.id)
      // 暂停时停止白噪音
      whiteNoiseStore.pauseNoise()
      // 暂停时释放对其他任务的锁定
      runningTaskId.value = null
      message.success('已暂停')
    } else {
      // 开始计时器
      // 清除该任务的完成标记（允许下次播放提示音）
      completedTaskIds.value.delete(task.id)
      const updatedTask = await taskApi.startTimer(task.id)
      // 设置运行中的任务 ID
      runningTaskId.value = task.id
      // 初始化本地剩余时间
      localRemainingSeconds.value[task.id] = updatedTask.data.remainingSeconds
      // 启动倒计时（每秒同步到数据库）
      startTimer(task.id, updatedTask.data.remainingSeconds)
      // 播放用户选择的白噪音
      whiteNoiseStore.playNoise()
      message.success('已开始计时')
    }
    loadTasks()
  } catch (e: any) {
    message.error(e.message || '操作失败')
  }
}

// 启动本地每秒倒计时（仅更新显示，不同步 DB）
const playCompletionSound = () => {
  const ctx = new AudioContext()
  const currentTime = ctx.currentTime

  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(880, currentTime)
  gain1.gain.setValueAtTime(0.3, currentTime)
  osc1.connect(gain1)
  gain1.connect(ctx.destination)
  osc1.start(currentTime)
  osc1.stop(currentTime + 0.15)

  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(1320, currentTime + 0.15)
  gain2.gain.setValueAtTime(0, currentTime)
  gain2.gain.linearRampToValueAtTime(0.3, currentTime + 0.15)
  gain2.gain.linearRampToValueAtTime(0, currentTime + 0.35)
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  osc2.start(currentTime + 0.15)
  osc2.stop(currentTime + 0.35)
}

// 任务完成时的统一处理
const handleTaskComplete = (taskId: number) => {
  stopTimer(taskId)
  whiteNoiseStore.stopNoise()
  runningTaskId.value = null
  playCompletionSound()
}

// 启动倒计时循环（每秒本地倒计时 + 同步到数据库）
const startTimer = (taskId: number, initialSeconds: number) => {
  let seconds = initialSeconds
  let isSyncing = false
  
  stopTimer(taskId)
  
  const interval = window.setInterval(async () => {
    seconds--
    localRemainingSeconds.value[taskId] = seconds
    
    // 本地检查任务是否已完成
    const task = tasks.value.find(t => t.id === taskId)
    if (task?.status === 'done') {
      handleTaskComplete(taskId)
      return
    }
    
    // 异步同步到数据库（不阻塞倒计时）
    if (!isSyncing) {
      isSyncing = true
      try {
        const { data } = await taskApi.syncTimer(taskId)
        // 用同步返回的数据更新本地状态，避免全量 reload
        if (data.status === 'done') {
          handleTaskComplete(taskId)
          await loadTasks() // 完成时刷新列表
          return
        }
        if (data.timerRunning && data.remainingSeconds > 0) {
          seconds = data.remainingSeconds
          localRemainingSeconds.value[taskId] = seconds
        }
      } catch {
        // ignore sync errors, local countdown continues
      } finally {
        isSyncing = false
      }
    }
  }, 1000)
  
  timerIntervals.set(taskId, interval)
}

// 停止倒计时
const stopTimer = (taskId: number) => {
  const interval = timerIntervals.get(taskId)
  if (interval) {
    window.clearInterval(interval)
    timerIntervals.delete(taskId)
  }
}

// 停止所有定时器
const stopAllIntervals = (taskId: number) => {
  stopTimer(taskId)
}

// 清理所有计时器循环
onUnmounted(() => {
  timerIntervals.forEach((interval) => {
    window.clearInterval(interval)
  })
  timerIntervals.clear()
})

const loadTasks = async () => {
  try {
    const { data } = await taskApi.getTasks(currentDate.value)
    tasks.value = flattenTree(data)
    const { data: all } = await taskApi.getTasks()
    allTasks.value = all
    
    // 只检测正在运行中的任务（timerRunning = true）
    const runningTask = allTasks.value.find(t => t.timerRunning && t.status !== 'done')
    if (runningTask) {
      runningTaskId.value = runningTask.id
      // 启动倒计时（每秒同步到数据库）
      if (runningTask.remainingSeconds > 0 && !localRemainingSeconds.value[runningTask.id]) {
        localRemainingSeconds.value[runningTask.id] = runningTask.remainingSeconds
        startTimer(runningTask.id, runningTask.remainingSeconds)
      }
      // 页面刷新后继续播放白噪音
      console.log('检测到运行中的任务，尝试播放白噪音，selectedNoiseId:', whiteNoiseStore.selectedNoiseId)
      await whiteNoiseStore.playNoise()
    } else {
      runningTaskId.value = null
    }
    
    // 暂停的任务（有剩余时间但计时器未运行）也显示倒计时
    allTasks.value.forEach(t => {
      if (!t.timerRunning && t.remainingSeconds > 0 && t.estimatedMinutes > 0 && t.status !== 'done' && !localRemainingSeconds.value[t.id]) {
        localRemainingSeconds.value[t.id] = t.remainingSeconds
      }
    })
  } catch (e: any) {
    message.error(e.response?.data?.message || e.message || '保存失败')
  }
}

const flattenTree = (tree: Task[]): Task[] => {
  const result: Task[] = []
  const walk = (nodes: Task[]) => {
    for (const node of nodes) {
      result.push(node)
      if (node.children && node.children.length > 0) {
        walk(node.children)
      }
    }
  }
  walk(tree)
  return result
}

const prevDay = () => {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() - 1)
  currentDate.value = d.toISOString().split('T')[0]
  loadTasks()
}

const nextDay = () => {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() + 1)
  currentDate.value = d.toISOString().split('T')[0]
  loadTasks()
}

const goToday = () => {
  currentDate.value = new Date().toISOString().split('T')[0]
  loadTasks()
}

const showUnfinished = async () => {
  showUnfinishedModal.value = true
  await loadUnfinished()
}

const loadUnfinished = async () => {
  try {
    const { data } = await statsApi.getUnfinished()
    unfinishedTasks.value = data
  } catch (e) {
    message.error('加载未完成任务失败')
  }
}

const unfinishedColumns: DataTableColumns<UnfinishedTask> = [
  { title: '任务名称', key: 'name' },
  { title: '计划日期', key: 'plannedDate', width: 120 },
  { title: '耗时(分钟)', key: 'estimatedMinutes', width: 100 },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row: UnfinishedTask) =>
      h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          onClick: () => {
            currentDate.value = row.plannedDate
            router.push({ query: { date: row.plannedDate } })
            showUnfinishedModal.value = false
            loadTasks()
          },
        },
        '去完成'
      ),
  },
]

const showCreateDialog = () => {
  isEdit.value = false
  editingId.value = null
  taskForm.name = ''
  taskForm.level = 1
  taskForm.plannedDate = currentDate.value
  taskForm.estimatedMinutes = 0
  taskForm.description = ''
  taskForm.parentId = undefined
  taskForm.repeatEnabled = false
  taskForm.repeatUntilDate = null
  taskForm.repeatSeriesId = null
  taskForm.repeatDays = [0, 1, 2, 3, 4, 5, 6]
  originalRepeatUntilDate.value = null
  dialogVisible.value = true
}

const showAddChildDialog = (parent: Task) => {
  isEdit.value = false
  editingId.value = null
  taskForm.name = ''
  taskForm.level = parent.level + 1
  taskForm.plannedDate = parent.plannedDate
  taskForm.estimatedMinutes = 0
  taskForm.description = ''
  taskForm.parentId = parent.id
  taskForm.repeatEnabled = false
  taskForm.repeatUntilDate = null
  taskForm.repeatSeriesId = null
  taskForm.repeatDays = [0, 1, 2, 3, 4, 5, 6]
  originalRepeatUntilDate.value = null
  dialogVisible.value = true
}

const showEditDialog = (task: Task) => {
  isEdit.value = true
  editingId.value = task.id
  editingHasChildren.value = (task.children?.length ?? 0) > 0
  taskForm.name = task.name
  taskForm.level = task.level
  taskForm.plannedDate = task.plannedDate
  taskForm.estimatedMinutes = task.estimatedMinutes
  taskForm.description = task.description || ''
  taskForm.parentId = task.parentId || undefined
  taskForm.repeatEnabled = false
  taskForm.repeatUntilDate = task.repeatUntilDate ? new Date(task.repeatUntilDate + 'T00:00:00').getTime() : null
  taskForm.repeatSeriesId = task.repeatSeriesId || null
  taskForm.repeatDays = task.repeatDays ? [...task.repeatDays] : [0, 1, 2, 3, 4, 5, 6]
  originalRepeatUntilDate.value = task.repeatUntilDate || null
  editingTaskStatus.value = task.status
  dialogVisible.value = true
}

const saveTask = async () => {
  if (!taskForm.name) {
    message.warning('请输入任务名称')
    return
  }
  if (taskForm.name.length > 100) {
    message.warning('任务名称不能超过100个字符')
    return
  }
  if (taskForm.description && taskForm.description.length > 500) {
    message.warning('任务描述不能超过500个字符')
    return
  }
  try {
    const payload: any = {
      name: taskForm.name,
      level: taskForm.level,
      estimatedMinutes: taskForm.estimatedMinutes,
      description: taskForm.description,
      plannedDate: taskForm.plannedDate,
    }
    if (taskForm.parentId) {
      payload.parentId = taskForm.parentId
    }
    if (isEdit.value && !repeatDisabled.value && taskForm.repeatEnabled && taskForm.repeatUntilDate) {
      const d = new Date(taskForm.repeatUntilDate)
      payload.repeatUntilDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      payload.repeatDays = taskForm.repeatDays
    }
    if (isEdit.value && editingId.value) {
      await taskApi.updateTask(editingId.value, payload)
      // 编辑保存后清除本地倒计时状态
      stopAllIntervals(editingId.value)
      delete localRemainingSeconds.value[editingId.value]
      // 如果编辑的是运行中的任务，清除runningTaskId
      if (runningTaskId.value === editingId.value) {
        runningTaskId.value = null
      }
      message.success('更新成功')
    } else {
      await taskApi.createTask(payload)
      message.success('创建成功')
    }
    dialogVisible.value = false
    loadTasks()
  } catch {
    // handled
  }
}

const deleteTask = (task: Task) => {
  if (task.repeatSeriesId) {
    dialog.warning({
      title: '确认删除',
      content: `该任务属于重复任务系列。是否删除所有同系列重复任务？（已完成的任务将不会被删除）`,
      positiveText: '删除全部',
      negativeText: '仅删除此任务',
      onPositiveClick: async () => {
        try {
          if (runningTaskId.value === task.id) {
            stopAllIntervals(task.id)
            delete localRemainingSeconds.value[task.id]
            runningTaskId.value = null
          }
          await taskApi.deleteTask(task.id, true)
          message.success('已删除全部重复任务')
          loadTasks()
        } catch (e: any) {
          message.error(e.message || '删除失败')
        }
      },
      onNegativeClick: async () => {
        try {
          if (runningTaskId.value === task.id) {
            stopAllIntervals(task.id)
            delete localRemainingSeconds.value[task.id]
            runningTaskId.value = null
          }
          await taskApi.deleteTask(task.id, false)
          message.success('删除成功')
          loadTasks()
        } catch (e: any) {
          message.error(e.message || '删除失败')
        }
      },
    })
  } else {
    dialog.warning({
      title: '确认删除',
      content: `确定删除"${task.name}"及其所有子任务吗？`,
      positiveText: '删除',
      negativeText: '取消',
      onPositiveClick: async () => {
        try {
          if (runningTaskId.value === task.id) {
            stopAllIntervals(task.id)
            delete localRemainingSeconds.value[task.id]
            runningTaskId.value = null
          }
          await taskApi.deleteTask(task.id)
          message.success('删除成功')
          loadTasks()
        } catch (e: any) {
          message.error(e.message || '删除失败')
        }
      },
    })
  }
}

const toggleCheckin = async (task: Task) => {
  try {
    if (task.status === 'done') {
      await taskApi.cancelCheckin(task.id)
      message.success('已取消打卡')
    } else {
      // 手动勾选完成时，清除倒计时和运行状态
      stopAllIntervals(task.id)
      delete localRemainingSeconds.value[task.id]
      if (runningTaskId.value === task.id) {
        runningTaskId.value = null
      }
      // 停止白噪音
      whiteNoiseStore.stopNoise()
      await taskApi.checkinTask(task.id)
      message.success('打卡成功')
    }
    loadTasks()
  } catch (e: any) {
    message.error(e.message || '操作失败')
  }
}

onMounted(async () => {
  await whiteNoiseStore.loadUserSettings()
  await loadTasks()
})
</script>

<style scoped>
.tasks-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px 32px;
}

/* ===== 顶部导航栏 ===== */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}

.date-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-secondary) !important;
  transition: all 0.2s ease;
}
.nav-btn:hover {
  background: var(--mint-light) !important;
  border-color: var(--mint-accent) !important;
  color: var(--mint-primary) !important;
}

.date-picker {
  width: 130px;
}
.date-picker :deep(.n-input__input) {
  font-weight: 500;
  color: var(--text-primary);
}

.today-btn {
  margin-left: 2px;
  border-radius: 8px !important;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-secondary) !important;
  border-radius: 8px !important;
  transition: all 0.2s ease;
}
.action-btn:hover {
  background: var(--mint-light) !important;
  border-color: var(--mint-accent) !important;
  color: var(--mint-primary) !important;
}

.create-btn {
  background: var(--mint-primary) !important;
  border: none !important;
  border-radius: 8px !important;
  color: #fff !important;
  font-weight: 500;
  transition: all 0.2s ease;
}
.create-btn:hover {
  background: var(--mint-primary-hover) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 106, 93, 0.2);
}

/* ===== 任务列表卡片 ===== */
.task-list-card {
  margin-top: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  padding: 8px 0;
  min-height: 500px;
}

.empty-state {
  padding: 60px 0;
}

/* ===== 任务行 ===== */
.task-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  margin: 2px 8px;
  border-radius: 10px;
  transition: all 0.2s ease;
  position: relative;
}
.task-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  border-radius: 2px;
  background: transparent;
  transition: background 0.2s ease;
}
.task-row:hover {
  background: var(--mint-light);
}
.task-row:hover .task-actions {
  opacity: 1;
}

/* 计时中任务 */
.task-timer {
  background: linear-gradient(135deg, rgba(123, 200, 164, 0.08) 0%, rgba(45, 106, 93, 0.05) 100%);
}
.task-timer::before {
  background: var(--mint-primary);
}

/* 已完成任务 */
.task-done-state {
  opacity: 0.55;
}
.task-done-state .task-name-done {
  text-decoration: line-through;
  color: var(--text-muted);
}
.task-done-state::before {
  background: var(--text-muted);
}

.task-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.task-check {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.remark-btn {
  font-size: 14px !important;
  --n-icon-size: 14px !important;
  opacity: 0.65;
  transition: opacity 0.2s;
}
.remark-btn:hover {
  opacity: 1;
}

.task-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.task-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
  transition: all 0.2s ease;
}

.task-name-timer {
  color: var(--mint-primary);
  font-weight: 600;
}

.task-desc {
  font-size: 12px;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}

/* ===== 标签 ===== */
.task-tags {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 2px;
}

.time-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--mint-light);
  padding: 2px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--mint-accent);
}

.tag-done .tag-dot {
  background: var(--text-muted);
}
.tag-done {
  color: var(--text-muted);
  background: rgba(160, 176, 169, 0.1);
}

.timer-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--mint-primary);
  background: var(--mint-light);
  padding: 2px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

.timer-icon {
  font-size: 13px;
}

/* ===== 操作按钮 ===== */
.task-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
  min-width: 90px;
  justify-content: flex-end;
}

.timer-btn {
  transition: all 0.2s ease;
}
.timer-btn:hover {
  transform: scale(1.1);
}

.action-icon-btn {
  transition: all 0.2s ease;
}
.action-icon-btn:hover {
  background: var(--mint-light) !important;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1) !important;
}
.delete-btn :deep(.n-icon) {
  color: #EF4444;
}

/* ===== 对话框 ===== */
.unit-text {
  margin-left: 8px;
  width: 15%;
  color: var(--text-secondary);
  font-size: 13px;
}
.dialog-date {
  width: 100%;
}

.repeat-hint {
  font-size: 12px;
  margin-left: 8px;
  max-width: 160px;
  line-height: 1.4;
}

.weekday-group {
  flex-wrap: wrap;
  gap: 8px 16px;
}

.series-tag {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--mint-light);
  border-radius: 20px;
  padding: 1px 8px;
  line-height: 1.6;
}

.dialog-form {
  padding: 0 16px;
}

.dialog-form :deep(.n-input),
.dialog-form :deep(.n-select),
.dialog-form :deep(.n-date-picker),
.dialog-form :deep(.n-input-number) {
  width: 100%;
}

.task-dialog :deep(.n-dialog) {
  border-radius: 14px;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .tasks-page {
    padding: 0 8px 24px;
  }
  .top-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px 16px;
  }
  .top-actions {
    justify-content: flex-end;
  }
  .task-actions {
    opacity: 1;
  }
  .task-name {
    font-size: 13px;
  }
}
</style>
