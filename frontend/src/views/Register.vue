<template>
  <div class="register-page">
    <n-card class="register-card" title="注册新账号">
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" label-width="0">
        <n-form-item path="username">
          <n-input v-model:value="form.username" placeholder="用户名" />
        </n-form-item>
        <n-form-item path="name">
          <n-input v-model:value="form.name" placeholder="昵称（可选）" />
        </n-form-item>
        <n-form-item path="password">
          <n-input v-model:value="form.password" type="password" placeholder="密码" />
        </n-form-item>
        <n-form-item path="confirmPassword">
          <n-input v-model:value="form.confirmPassword" type="password" placeholder="确认密码" @keyup.enter="handleRegister" />
        </n-form-item>
      </n-form>
      <div class="actions">
        <n-button type="primary" block :loading="loading" @click="handleRegister">注册</n-button>
        <n-button block style="margin-top: 12px" @click="$router.push('/login')">返回登录</n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { authApi } from '@/api/modules'

const router = useRouter()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const form = reactive({
  username: '',
  name: '',
  password: '',
  confirmPassword: '',
})

const validateUsername = (_rule: any, value: string) => {
  if (!value) {
    return new Error('请输入用户名')
  }
  if (value.length < 3 || value.length > 20) {
    return new Error('用户名长度3-20个字符')
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return new Error('用户名仅支持字母、数字、下划线')
  }
  return true
}

const validateConfirmPassword = (_rule: any, value: string) => {
  if (value !== form.password) {
    return new Error('两次输入的密码不一致')
  }
  return true
}

const rules = {
  username: { required: true, validator: validateUsername, trigger: 'blur' },
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' },
  ],
  confirmPassword: { required: true, validator: validateConfirmPassword, trigger: 'blur' },
}

const handleRegister = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    await authApi.register(form.username, form.password, form.name || undefined)
    message.success('注册成功，请登录')
    router.push('/login')
  } catch (e: any) {
    message.error(e.response?.data?.message || '注册失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #F0F7F4 0%, #D4EDE4 50%, #B8E0D1 100%);
  padding: 16px;
  box-sizing: border-box;
}
.register-card {
  width: 400px;
  max-width: 100%;
  border-radius: 14px;
  box-shadow: var(--card-shadow);
}
.actions {
  margin-top: 20px;
}

@media (max-width: 480px) {
  .register-card {
    width: 100%;
  }
}
</style>
