<template>
  <div class="progress-page">
        <n-card   style="margin-top: 20px" >
    <n-grid :cols="4" :x-gap="16">
      <n-gi>
        <n-statistic label="总任务数" :value="overview.total" />
      </n-gi>
      <n-gi>
        <n-statistic label="已完成" :value="overview.completed" />
      </n-gi>
      <n-gi>
        <n-statistic label="完成率">
          <template #suffix>%</template>
          {{ overview.completionRate }}
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="逾期未完成" :value="overview.overdue">
          <template #prefix>
            <n-icon color="#f56c6c"><Warning /></n-icon>
          </template>
        </n-statistic>
      </n-gi>
    </n-grid>
  </n-card>

    <n-card style="margin-top: 20px">
      <template #header>
        <div class="chart-header">
          <span>完成趋势</span>
          <n-radio-group v-model:value="trendDays" size="small" @update:value="loadTrend">
            <n-radio-button :value="7">7天</n-radio-button>
            <n-radio-button :value="30">30天</n-radio-button>
            <n-radio-button :value="180">半年</n-radio-button>
          </n-radio-group>
        </div>
      </template>
      <div ref="trendChartRef" style="height: 400px"></div>
    </n-card>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon, NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import * as echarts from 'echarts'
import { Warning } from '@vicons/ionicons5'
import { statsApi, taskApi } from '@/api/modules'
import type { UnfinishedTask } from '@/types'

const router = useRouter()
const message = useMessage()

const overview = ref({ total: 0, completed: 0, completionRate: 0, overdue: 0 })
const trendDays = ref(7)
const trendData = ref<any[]>([])
const unfinished = ref<UnfinishedTask[]>([])
const trendChartRef = ref<HTMLElement>()

const loadOverview = async () => {
  try {
    const { data } = await statsApi.getOverview()
    overview.value = data
  } catch {
    // handled
  }
}

const loadTrend = async () => {
  try {
    const { data } = await statsApi.getTrend(trendDays.value)
    trendData.value = data
    renderTrendChart()
  } catch {
    // handled
  }
}

const loadUnfinished = async () => {
  try {
    const { data } = await statsApi.getUnfinished()
    unfinished.value = data
  } catch {
    // handled
  }
}

const renderTrendChart = () => {
  if (!trendChartRef.value) return
  const chart = echarts.init(trendChartRef.value)
  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['完成任务数', '耗时 (分钟)'] },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: trendData.value.map((d) => d.date),
      axisLabel: { rotate: 45 },
    },
    yAxis: [
      { type: 'value', name: '耗时 (分钟)', position: 'left' },
      { type: 'value', name: '任务数', position: 'right' },
    ],
    series: [
      {
        name: '耗时 (分钟)',
        type: 'line',
        data: trendData.value.map((d) => d.minutes),
        smooth: true,
      },
      {
        name: '完成任务数',
        type: 'line',
        yAxisIndex: 1,
        data: trendData.value.map((d) => d.count),
        smooth: true,
      },
    ],
  })
  window.addEventListener('resize', () => chart.resize())
}

const unfinishedColumns: DataTableColumns<UnfinishedTask> = [
  { title: '任务名称', key: 'name' },
  { title: '计划日期', key: 'plannedDate', width: 120 },
  { title: '耗时(分钟)', key: 'estimatedMinutes', width: 100 },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row) =>
      h(
        NButton,
        { size: 'small', type: 'primary', onClick: async () => { await taskApi.checkinTask(row.id); message.success('打卡成功'); loadUnfinished(); } },
        { default: () => '去打卡' }
      ),
  },
]

onMounted(() => {
  loadOverview()
  loadTrend()
  loadUnfinished()
})
</script>

<style scoped>
.progress-page {
  max-width: 900px;
  margin: 0 auto;
}

.progress-page :deep(.n-card) {
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  margin-top: 16px;
}

.progress-page :deep(.n-card:first-child) {
  margin-top: 0;
}

.progress-page :deep(.n-card-header__title) {
  font-weight: 600;
  color: var(--text-primary);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.progress-page :deep(.n-statistic) {
  color: var(--text-primary);
}

.progress-page :deep(.n-statistic__label) {
  color: var(--text-secondary);
  font-size: 13px;
}

.progress-page :deep(.n-statistic__value) {
  font-weight: 600;
  color: var(--text-primary);
}

.progress-page :deep(.n-grid) {
  text-align: center;
}

.progress-page :deep(.n-gi) {
  display: flex;
  justify-content: center;
}

.progress-page :deep(.n-statistic) {
  text-align: center;
}

@media (max-width: 768px) {
  .progress-page {
    max-width: 100%;
  }
  :deep(.n-statistic) {
    font-size: 13px;
  }
  :deep(.n-data-table) {
    font-size: 12px;
  }
}
</style>
