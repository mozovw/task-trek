<template>
  <div class="calendar-page">
    <n-card  style="margin-top: 20px" >
      <template #header>
        <div class="calendar-header">
          <n-button circle @click="prevMonth">
            <template #icon><n-icon><ChevronBack /></n-icon></template>
          </n-button>
          <span class="month-title">{{ currentYear }}年{{ currentMonth }}月</span>
          <n-button circle @click="nextMonth">
            <template #icon><n-icon><ChevronForward /></n-icon></template>
          </n-button>
        </div>
      </template>
      <div class="calendar-grid">
        <div class="weekday-row">
          <div v-for="day in weekdays" :key="day" class="weekday-cell">{{ day }}</div>
        </div>
        <div class="days-grid">
          <div
            v-for="cell in calendarCells"
            :key="cell.date"
            :class="['day-cell', { 'other-month': !cell.isCurrentMonth, today: cell.isToday }]"
            @click="goToTasks(cell.date)"
          >
            <div class="day-number">{{ cell.day }}</div>
            <div v-if="cell.tasks && cell.tasks.length > 0" class="day-tasks">
              <div
                v-for="task in cell.tasks.slice(0, 3)"
                :key="task.id"
                :class="['day-task', { done: task.status === 'done' }]"
              >
                {{ task.name }}
              </div>
              <div v-if="cell.tasks.length > 3" class="more-tasks">+{{ cell.tasks.length - 3 }} 更多</div>
            </div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronBack, ChevronForward } from '@vicons/ionicons5'
import { statsApi } from '@/api/modules'

const router = useRouter()

const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth() + 1)
const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const calendarData = ref<Record<string, any[]>>({})

const calendarCells = computed(() => {
  const cells: { date: string; day: number; isCurrentMonth: boolean; isToday: boolean; tasks?: any[] }[] = []
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value, 0)
  const startOffset = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  const today = new Date().toISOString().split('T')[0]

  // Previous month days
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value - 1, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const d = new Date(currentYear.value, currentMonth.value - 2, day)
    const dateStr = d.toISOString().split('T')[0]
    cells.push({ date: dateStr, day, isCurrentMonth: false, isToday: dateStr === today })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    cells.push({
      date: dateStr,
      day: i,
      isCurrentMonth: true,
      isToday: dateStr === today,
      tasks: calendarData.value[dateStr],
    })
  }

  // Next month days
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(currentYear.value, currentMonth.value, i)
    const dateStr = d.toISOString().split('T')[0]
    cells.push({ date: dateStr, day: i, isCurrentMonth: false, isToday: dateStr === today })
  }

  return cells
})

const loadCalendar = async () => {
  try {
    const { data } = await statsApi.getCalendar(currentYear.value, currentMonth.value)
    calendarData.value = data
  } catch {
    // handled
  }
}

const goToTasks = (date: string) => {
  router.push({ path: '/tasks', query: { date } })
}

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
  loadCalendar()
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
  loadCalendar()
}

onMounted(() => {
  loadCalendar()
})
</script>

<style scoped>
.calendar-page {
  max-width: 900px;
  margin: 0 auto;
}

.calendar-page :deep(.n-card) {
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  margin-top: 16px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.month-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.calendar-page :deep(.n-button.circle) {
  transition: all 0.2s ease;
}

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  color: var(--text-muted);
  padding: 10px 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 13px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-cell {
  min-height: 90px;
  padding: 8px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  margin: 1px;
}

.day-cell:hover {
  background: var(--mint-light);
}

.day-cell.other-month {
  background: rgba(226, 237, 237, 0.3);
  color: var(--text-muted);
}

.day-cell.today {
  background: var(--mint-light);
  border-color: var(--mint-primary);
  border-width: 1.5px;
}

.day-number {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.day-cell.other-month .day-number {
  color: var(--text-muted);
}

.day-cell.today .day-number {
  color: var(--mint-primary);
}

.day-tasks {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.day-task {
  font-size: 11px;
  padding: 2px 6px;
  margin: 1px 0;
  background: var(--mint-light);
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-secondary);
  transition: background 0.2s ease;
}

.day-cell:hover .day-task {
  background: rgba(123, 200, 164, 0.15);
}

.day-task.done {
  text-decoration: line-through;
  color: var(--text-muted);
  opacity: 0.6;
}

.more-tasks {
  font-size: 11px;
  color: var(--mint-primary);
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.more-tasks:hover {
  background: var(--mint-light);
}

@media (max-width: 768px) {
  .calendar-page {
    max-width: 100%;
  }
  .month-title {
    font-size: 16px;
  }
  .day-cell {
    min-height: 50px;
    padding: 3px;
  }
  .day-number {
    font-size: 11px;
    margin-bottom: 2px;
  }
  .day-task {
    font-size: 9px;
    padding: 1px 2px;
    margin: 1px 0;
  }
  .more-tasks {
    font-size: 9px;
  }
  .weekday-row {
    font-size: 12px;
    padding: 6px 0;
  }
}
</style>
