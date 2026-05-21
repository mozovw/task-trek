<template>
  <div class="tasks-page">
    <n-card  style="margin-top: 20px" >
    <div class="date-nav">
      <n-button circle @click="prevDay">
        <template #icon><n-icon><ChevronBack /></n-icon></template>
      </n-button>
      <n-date-picker v-model:value="currentDate" type="date" value-format="yyyy-MM-dd" :input-readonly="true" style="width: 120px" @update:value="loadTasks" />
      <n-button circle @click="nextDay">
        <template #icon><n-icon><ChevronForward /></n-icon></template>
      </n-button>
      <div class="right-actions">
        <n-button size="small" @click="showUnfinished">未完成任务</n-button>
        <n-button size="small" @click="goToday">今天</n-button>
        <n-button type="primary" size="small" @click="showCreateDialog">
          <template #icon><n-icon><Add /></n-icon></template>
          新建任务
        </n-button>
      </div>
    </div>
</n-card>
    <n-card  style="margin-top: 20px; min-height: 550px">
      <n-empty v-if="tasks.length === 0" description="暂无任务" />
      <div v-for="task in tasks" :key="task.id" class="task-item" :style="{ paddingLeft: (task.level - 1) * 24 + 'px' }" :class="{ 'timer-running': task.timerRunning }">
        <div class="task-content">
          <n-checkbox
            :checked="task.status === 'done'"
            @update:checked="() => toggleCheckin(task)"
          />
          <div class="task-info">
            <span :class="{ 'task-done': task.status === 'done', 'counting-down': task.timerRunning }" class="task-name">{{ task.name }}</span>
            <span v-if="task.description" class="task-desc">{{ task.description }}</span>
          </div>
          <n-tag v-if="task.estimatedMinutes > 0 && !task.timerRunning" size="small" type="info">{{ task.estimatedMinutes }}分钟</n-tag>
          <span v-if="task.timerRunning" class="timer-display">⏱ {{ formatTimer(localRemainingSeconds[task.id] ?? task.remainingSeconds) }}</span>
        </div>
        <div class="task-actions">
          <!-- 倒计时按钮 - 仅叶子节点且有预计耗时且未完成时显示 -->
          <n-button v-if="!task.children?.length && !task.timerRunning && task.estimatedMinutes > 0 && task.status !== 'done'" size="tiny" circle class="timer-btn start" @click="toggleTimer(task)">
            <template #icon>
              <n-icon><component :is="PlayCircleOutline" /></n-icon>
            </template>
          </n-button>
          <n-button v-if="task.timerRunning" size="tiny" quaternary circle type="warning" class="timer-btn pause" @click="toggleTimer(task)">
            <template #icon>
              <n-icon><PauseCircleOutline /></n-icon>
            </template>
          </n-button>
          <n-button v-if="task.level < 3 && !task.timerRunning && !task.children?.length" size="tiny" quaternary circle @click="showAddChildDialog(task)">
            <template #icon><n-icon><AddCircle /></n-icon></template>
          </n-button>
          <n-button size="tiny" quaternary circle @click="showEditDialog(task)">
            <template #icon><n-icon><Create /></n-icon></template>
          </n-button>
          <n-button size="tiny" quaternary circle type="error" @click="deleteTask(task)">
            <template #icon><n-icon><Trash /></n-icon></template>
          </n-button>
        </div>
      </div>
    </n-card>

    <!-- 创建/编辑对话框 -->
    <n-modal v-model:show="dialogVisible" preset="dialog" :title="isEdit ? '编辑任务' : '新建任务'">
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
          <n-date-picker v-model:value="taskForm.plannedDate" type="date" value-format="yyyy-MM-dd" style="width: 180px" />
        </n-form-item>
        <n-form-item label="预计耗时">
          <n-input-number v-model:value="taskForm.estimatedMinutes" :min="0" />
          <span style="margin-left: 8px">分钟</span>
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="taskForm.description" type="textarea" :rows="3" />
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
    <n-modal v-model:show="showUnfinishedModal" preset="dialog" title="未完成任务">
      <n-data-table
        :columns="unfinishedColumns"
        :data="unfinishedTasks"
        :pagination="false"
        size="small"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, h, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMessage, useDialog, type DataTableColumns } from 'naive-ui'
import { NIcon, NButton } from 'naive-ui'
import { ChevronBack, ChevronForward, Add, AddCircle, Create, Trash, PlayCircleOutline, PauseCircleOutline } from '@vicons/ionicons5'
import { taskApi, statsApi } from '@/api/modules'
import type { Task, UnfinishedTask } from '@/types'

const message = useMessage()
const dialog = useDialog()
const route = useRoute()

const now = new Date()
const currentDate = ref((route.query.date as string) || now.toISOString().split('T')[0])
const tasks = ref<Task[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref<number | null>(null)
const allTasks = ref<Task[]>([])

const timerIntervals = new Map<number, number>() // taskId -> intervalId (5s sync)
const localTimerIntervals = new Map<number, number>() // taskId -> intervalId (1s local countdown)

const showUnfinishedModal = ref(false)
const unfinishedTasks = ref<UnfinishedTask[]>([])

// 本地倒计时状态（用于每秒更新显示）
const localRemainingSeconds = ref<Record<number, number>>({})

const taskForm = reactive({
  name: '',
  level: 1,
  plannedDate: now.toISOString().split('T')[0] as string,
  estimatedMinutes: 0,
  description: '',
  parentId: undefined as number | undefined,
})

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
      delete localRemainingSeconds.value[task.id]
      message.success('已暂停')
    } else {
      // 开始计时器
      const updatedTask = await taskApi.startTimer(task.id)
      // 初始化本地剩余时间
      localRemainingSeconds.value[task.id] = updatedTask.data.remainingSeconds
      // 启动本地每秒倒计时
      startLocalCountdown(task.id, updatedTask.data.remainingSeconds)
      // 启动数据库同步循环（5 秒一次）
      startTimerInterval(task.id)
      message.success('已开始计时')
    }
    loadTasks()
  } catch (e: any) {
    message.error(e.message || '操作失败')
  }
}

// 启动本地每秒倒计时（仅更新显示，不同步 DB）
const startLocalCountdown = (taskId: number, initialSeconds: number) => {
  let seconds = initialSeconds
  
  // 如果有之前的定时器，先清除
  stopLocalCountdown(taskId)
  
  const interval = window.setInterval(() => {
    seconds--
    localRemainingSeconds.value[taskId] = seconds
    
    // 如果倒计时结束，停止并重新加载
    if (seconds <= 0) {
      stopLocalCountdown(taskId)
      loadTasks()
    }
  }, 1000)
  
  localTimerIntervals.set(taskId, interval)
}

// 停止本地倒计时
const stopLocalCountdown = (taskId: number) => {
  const interval = localTimerIntervals.get(taskId)
  if (interval) {
    window.clearInterval(interval)
    localTimerIntervals.delete(taskId)
  }
}

// 启动本地倒计时循环（每 5 秒同步一次到数据库）
const startTimerInterval = (taskId: number) => {
  const interval = window.setInterval(async () => {
    try {
      await taskApi.syncTimer(taskId)
      // 重新加载任务列表以更新本地状态
      await loadTasks()
      // 同步后重置本地倒计时
      const task = tasks.value.find(t => t.id === taskId)
      if (task && task.timerRunning && task.remainingSeconds > 0) {
        localRemainingSeconds.value[taskId] = task.remainingSeconds
        startLocalCountdown(taskId, task.remainingSeconds)
      }
    } catch {
      // ignore sync errors
    }
  }, 5000)
  timerIntervals.set(taskId, interval)
}

// 停止计时器循环
const stopTimerInterval = (taskId: number) => {
  const interval = timerIntervals.get(taskId)
  if (interval) {
    window.clearInterval(interval)
    timerIntervals.delete(taskId)
  }
}

// 停止所有定时器（本地 + 同步）
const stopAllIntervals = (taskId: number) => {
  stopTimerInterval(taskId)
  stopLocalCountdown(taskId)
}

// 清理所有计时器循环
onUnmounted(() => {
  timerIntervals.forEach((interval) => {
    window.clearInterval(interval)
  })
  localTimerIntervals.forEach((interval) => {
    window.clearInterval(interval)
  })
  timerIntervals.clear()
  localTimerIntervals.clear()
})

const loadTasks = async () => {
  try {
    const { data } = await taskApi.getTasks(currentDate.value)
    tasks.value = flattenTree(data)
    const { data: all } = await taskApi.getTasks()
    allTasks.value = all
  } catch {
    // handled
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
          onClick: async () => {
            await taskApi.checkinTask(row.id)
            message.success('打卡成功')
            loadUnfinished()
          },
        },
        '打卡'
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
  dialogVisible.value = true
}

const showEditDialog = (task: Task) => {
  isEdit.value = true
  editingId.value = task.id
  taskForm.name = task.name
  taskForm.level = task.level
  taskForm.plannedDate = task.plannedDate
  taskForm.estimatedMinutes = task.estimatedMinutes
  taskForm.description = task.description || ''
  taskForm.parentId = task.parentId || undefined
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
    if (isEdit.value && editingId.value) {
      await taskApi.updateTask(editingId.value, payload)
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
  dialog.warning({
    title: '确认删除',
    content: `确定删除"${task.name}"及其所有子任务吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await taskApi.deleteTask(task.id)
        message.success('删除成功')
        loadTasks()
      } catch {
        // handled
      }
    },
  })
}

const toggleCheckin = async (task: Task) => {
  try {
    if (task.status === 'done') {
      await taskApi.cancelCheckin(task.id)
      message.success('已取消打卡')
    } else {
      await taskApi.checkinTask(task.id)
      message.success('打卡成功')
    }
    loadTasks()
  } catch {
    // handled
  }
}

onMounted(() => {
  loadTasks()
})
</script>

<style scoped>
.tasks-page {
  max-width: 900px;
  margin: 0 auto;
}
.date-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.date-nav .right-align {
  margin-left: auto;
}
.right-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
.date-nav :deep(.n-date-picker) {
  flex: none;
  min-width: 100px;
}
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  border-bottom: 1px solid #f0f0f0;
}
.task-item:last-child {
  border-bottom: none;
}
.task-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  position: relative;
}
.task-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.task-name {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task-desc {
  font-size: 12px;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task-done {
  text-decoration: line-through;
  color: #909399;
  opacity: 0.6;
}
.task-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  flex-shrink: 0;
}
.task-item:hover .task-actions {
  opacity: 1;
}
.timer-running {
  background: linear-gradient(90deg, #fff7e6 0%, #e6f7ff 100%);
}
.counting-down {
  color: #1890ff;
  font-weight: bold;
}
.timer-display {
  font-size: 13px;
  color: #1890ff;
  font-weight: bold;
  white-space: nowrap;
  margin-left: 8px;
  padding: 2px 8px;
  background: #e6f7ff;
  border-radius: 4px;
  display: inline-block;
  position: absolute;
  right: 120px;
  z-index: 10;
}
.timer-btn.start,
.timer-btn.pause {
  position: relative;
  z-index: 20;
}
.dialog-form {
  padding: 0 16px;
}

@media (max-width: 768px) {
  .tasks-page {
    max-width: 100%;
  }
  .task-actions {
    opacity: 1;
  }
  .date-nav {
    gap: 6px;
  }
  .date-nav :deep(.n-button) {
    padding: 0 8px;
  }
  .task-name {
    font-size: 13px;
  }
}
</style>
