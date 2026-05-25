<template>
  <div class="profile-page">
    <n-card title="个人信息" style="margin-top: 20px">
      <n-form label-placement="left" label-width="100">
        <n-form-item label="用户名">
          <span>{{ userStore.user?.username }}</span>
        </n-form-item>
        <n-form-item label="昵称">
          <n-input v-model:value="nameForm.name" style="width: 200px" />
          <n-button type="primary" size="small" style="margin-left: 8px" @click="updateName">保存</n-button>
        </n-form-item>
      </n-form>
    </n-card>

    <n-card style="margin-top: 20px" title="修改密码">
      <n-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-placement="left" label-width="100">
        <n-form-item label="原密码" path="oldPassword">
          <n-input v-model:value="passwordForm.oldPassword" type="password" show-password-on="click" style="width: 200px" />
        </n-form-item>
        <n-form-item label="新密码" path="newPassword">
          <n-input v-model:value="passwordForm.newPassword" type="password" show-password-on="click" style="width: 200px" />
        </n-form-item>
        <n-form-item label="确认新密码" path="newPasswordConfirm">
          <n-input v-model:value="passwordForm.newPasswordConfirm" type="password" show-password-on="click" style="width: 200px" @keyup.enter="changePassword" />
                <n-button type="primary"  style="margin-left: 8px" size="small" @click="changePassword">修改密码</n-button>

        </n-form-item>
     
      </n-form>
    </n-card>

    <n-card style="margin-top: 20px" title="数据管理">
      <div class="data-actions">
        <n-button size="small" type="success" @click="downloadTemplate">下载 MD 模板</n-button>
        <n-button type="primary" size="small" @click="exportMarkdown">导出 MD</n-button>
        
        <n-button type="warning" size="small" @click="showImportDialog">导入 MD</n-button>
        <n-button type="error" size="small" @click="clearAllTasks">清空任务</n-button>
      </div>
    </n-card>

    <n-card style="margin-top: 20px" title="白噪音设置">
      <n-form label-placement="left" label-width="100">
        <n-form-item label="选择白噪音">
          <n-radio-group v-model:value="selectedNoiseId" name="whiteNoise" @update:value="handleNoiseChange">
            <n-space>
              <n-radio 
                v-for="noise in whiteNoiseOptions" 
                :key="noise.id" 
                :value="noise.id"
                :label="noise.name"
              />
            </n-space>
          </n-radio-group>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 导入对话框 -->
    <n-modal v-model:show="importDialogVisible" preset="dialog" title="导入 MD" :style="{ width: '600px' }">
      <div class="import-dialog">
        <n-tabs v-model:value="importMode" type="segment" @update:value="handleImportModeChange">
          <n-tab-pane name="file" tab="文件上传">
            <n-upload 
              accept=".md" 
              :max="1" 
              :show-file-list="true" 
              @change="handleFileChange"
            >
              <n-button size="small">选择 Markdown 文件</n-button>
            </n-upload>
          </n-tab-pane>
          <n-tab-pane name="text" tab="粘贴内容">
            <n-input
              v-model:value="textContent"
              type="textarea"
              placeholder="请粘贴或输入 Markdown 内容..."
              :rows="10"
              :autosize="{ minRows: 10, maxRows: 20 }"
            />
          </n-tab-pane>
        </n-tabs>
      </div>
      <template #action>
        <n-space>
          <n-button size="small" @click="importDialogVisible = false">取消</n-button>
          <n-button size="small" type="primary" :disabled="!canImport" @click="importMarkdown">导入</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { userApi, authApi, exportApi } from '@/api/modules'
import { useUserStore } from '@/stores/user'
import { useWhiteNoiseStore, whiteNoiseOptions } from '@/stores/whiteNoise'

const message = useMessage()
const dialog = useDialog()
const userStore = useUserStore()
const whiteNoiseStore = useWhiteNoiseStore()

const passwordFormRef = ref<FormInst | null>(null)
const importDialogVisible = ref(false)
const fileContent = ref('')
const textContent = ref('')
const importMode = ref<'file' | 'text'>('file')

// 白噪音相关
const selectedNoiseId = ref<string | null>(null)
const previewTimer = ref<number | null>(null)

// 计算是否可以导入
const canImport = computed(() => {
  if (importMode.value === 'file') {
    return !!fileContent.value
  }
  return !!textContent.value
})

// 切换导入模式时清空另一个模式的内容
const handleImportModeChange = (mode: 'file' | 'text') => {
  if (mode === 'file') {
    textContent.value = ''
  } else {
    fileContent.value = ''
  }
}

const handleFileChange = ({ file }: any) => {
  const rawFile = file.file
  if (!rawFile) return
  const reader = new FileReader()
  reader.onload = (e) => {
    fileContent.value = e.target?.result as string
  }
  reader.readAsText(rawFile)
}

const nameForm = reactive({
  name: '',
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
})

const validatePasswordConfirm = (_rule: any, value: string) => {
  if (value !== passwordForm.newPassword) {
    return new Error('两次输入的密码不一致')
  }
  return true
}

const passwordRules = {
  oldPassword: { required: true, message: '请输入原密码', trigger: 'blur' },
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' },
  ],
  newPasswordConfirm: { required: true, validator: validatePasswordConfirm, trigger: 'blur' },
}

const updateName = async () => {
  if (!nameForm.name) {
    message.warning('昵称不能为空')
    return
  }
  if (nameForm.name.length > 20) {
    message.warning('昵称不能超过20个字符')
    return
  }
  try {
    const { data } = await userApi.updateName(nameForm.name)
    userStore.setUser(data, userStore.token)
    message.success('昵称修改成功')
  } catch {
    // handled
  }
}

const changePassword = async () => {
  const valid = await passwordFormRef.value?.validate().catch(() => false)
  if (!valid) return

  try {
    await authApi.changePassword(passwordForm.oldPassword, passwordForm.newPassword, passwordForm.newPasswordConfirm)
    message.success('密码修改成功，请重新登录')
    userStore.logout()
    setTimeout(() => {
      window.location.href = '/login'
    }, 1000)
  } catch {
    // handled
  }
}

const exportMarkdown = async () => {
  try {
    const { data } = await exportApi.exportMarkdown()
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'tasks.md')
    document.body.appendChild(link)
    link.click()
    link.remove()
    message.success('导出成功')
  } catch {
    message.error('导出失败')
  }
}

const downloadTemplate = async () => {
  try {
    const { data } = await exportApi.getTemplate()
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'task_template.md')
    document.body.appendChild(link)
    link.click()
    link.remove()
    message.success('模板下载成功')
  } catch {
    message.error('下载失败')
  }
}

const showImportDialog = () => {
  fileContent.value = ''
  textContent.value = ''
  importMode.value = 'file'
  importDialogVisible.value = true
}

const importMarkdown = async () => {
  const content = importMode.value === 'file' ? fileContent.value : textContent.value
  if (!content) {
    message.warning(importMode.value === 'file' ? '请选择文件' : '请输入内容')
    return
  }
  try {
    const { data } = await exportApi.importMarkdown(content)
    message.success(`导入成功：${data.success} 条，更新：${data.updated} 条`)
    importDialogVisible.value = false
  } catch {
    // handled
  }
}

const clearAllTasks = () => {
  dialog.warning({
    title: '警告',
    content: '确定要清空所有任务吗？此操作不可恢复！',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await exportApi.clearAllTasks()
        message.success('已清空所有任务')
      } catch {
        // handled
      }
    },
  })
}

// 白噪音相关方法
const handleNoiseChange = async (noiseId: string) => {
  // 清除之前的定时器
  if (previewTimer.value) {
    clearTimeout(previewTimer.value)
    previewTimer.value = null
  }

  if (!noiseId || noiseId === 'none') {
    whiteNoiseStore.stopNoise()
    // 自动保存选择
    try {
      await whiteNoiseStore.setSelectedNoise(noiseId)
    } catch {
      message.error('保存失败')
    }
    return
  }

  whiteNoiseStore.playNoise(noiseId)
  message.success('正在试听白噪音（5秒后自动停止），设置已保存')

  // 5秒后自动停止
  previewTimer.value = window.setTimeout(() => {
    whiteNoiseStore.stopNoise()
    previewTimer.value = null
  }, 5000)

  // 自动保存选择
  try {
    await whiteNoiseStore.setSelectedNoise(noiseId)
  } catch {
    message.error('保存失败')
  }
}

onMounted(async () => {
  nameForm.name = userStore.user?.name || ''
  // 加载用户的白噪音设置
  await whiteNoiseStore.loadUserSettings()
  selectedNoiseId.value = whiteNoiseStore.selectedNoiseId
})
</script>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 0 auto;
}

.profile-page :deep(.n-card) {
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  margin-top: 16px;
}

.profile-page :deep(.n-card:first-child) {
  margin-top: 0;
}

.profile-page :deep(.n-card-header__title) {
  font-weight: 600;
  color: var(--text-primary);
}

.data-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.data-actions :deep(.n-button) {
  border-radius: 8px !important;
  transition: all 0.2s ease;
}

.import-dialog {
  padding: 8px 0;
}

.import-dialog :deep(.n-tabs) {
  margin-top: 8px;
}

.import-dialog :deep(.n-tabs-pane-wrapper) {
  padding: 12px 0;
}

.import-dialog :deep(.n-upload) {
  width: 100%;
}

.import-dialog :deep(.n-input__textarea) {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
}

@media (max-width: 768px) {
  .profile-page {
    max-width: 100%;
  }
  .data-actions {
    flex-direction: column;
  }
  .data-actions :deep(.n-button) {
    width: 100%;
  }
}
</style>
