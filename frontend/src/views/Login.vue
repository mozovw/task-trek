<template>
  <div class="login-page">
    <n-card class="login-card" title="Task Trek - 登录">
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" label-width="0">
        <n-form-item path="username">
          <n-input v-model:value="form.username" placeholder="用户名" />
        </n-form-item>
        <n-form-item path="password">
          <n-input v-model:value="form.password" type="password" placeholder="密码" @keyup.enter="handleLogin" />
        </n-form-item>
      </n-form>
      <div class="actions">
        <n-button type="primary" block :loading="loading" @click="handleLogin">登录</n-button>
        <n-button block style="margin-top: 12px" @click="$router.push('/register')">注册</n-button>
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
import { useUserStore } from '@/stores/user'

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
}

const handleLogin = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const { data } = await authApi.login(form.username, form.password)
    userStore.setUser(data.user, data.access_token)
    message.success('登录成功')
    router.push('/tasks')
  } catch (e: any) {
    message.error(e.response?.data?.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px;
  box-sizing: border-box;
}
.login-card {
  width: 400px;
  max-width: 100%;
}
.actions {
  margin-top: 20px;
}

@media (max-width: 480px) {
  .login-card {
    width: 100%;
  }
}
</style>
