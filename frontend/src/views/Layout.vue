<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      bordered
      :width="200"
      :collapsed-width="64"
      :collapsed="collapsed"
      show-trigger
      collapse-mode="width"
      @update:collapsed="onCollapse"
    >
      <div class="logo">{{ collapsed ? 'TT' : 'Task Trek' }}</div>
      <n-menu
        :value="activeMenu"
        :options="menuOptions"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered class="header">
        <n-button quaternary circle class="menu-toggle" @click="collapsed = !collapsed">
          <template #icon><n-icon><MenuOutline /></n-icon></template>
        </n-button>
        <div class="header-right">
          <n-dropdown :options="userOptions" @select="handleUserAction">
            <n-button quaternary>
              <span class="user-name">{{ userStore.user?.name || userStore.user?.username }}</span>
              <template #icon>
                <n-icon><PersonOutline /></n-icon>
              </template>
            </n-button>
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout-content class="content">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage, NIcon } from 'naive-ui'
import {
  ListOutline as TasksIcon,
  BarChartOutline as ProgressIcon,
  CalendarOutline as CalendarIcon,
  SettingsOutline as ProfileIcon,
  PersonOutline,
  LogOutOutline,
  SettingsOutline,
  MenuOutline,
} from '@vicons/ionicons5'
import { authApi } from '@/api/modules'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const message = useMessage()
const userStore = useUserStore()

const collapsed = ref(false)

const activeMenu = computed(() => route.path)

const onCollapse = (value: boolean) => {
  collapsed.value = value
}

const renderIcon = (icon: any) => () => h(NIcon, null, { default: () => h(icon) })

const menuOptions = [
  { label: '任务管理', key: '/tasks', icon: renderIcon(TasksIcon) },
  { label: '进度统计', key: '/progress', icon: renderIcon(ProgressIcon) },
  { label: '日历视图', key: '/calendar', icon: renderIcon(CalendarIcon) },
  { label: '个人设置', key: '/profile', icon: renderIcon(ProfileIcon) },
]

const userOptions = [
  { label: '个人设置', key: 'profile', icon: renderIcon(SettingsOutline) },
  { label: '退出登录', key: 'logout', icon: renderIcon(LogOutOutline) },
]

const handleMenuClick = (key: string) => {
  router.push(key)
}

const handleUserAction = async (key: string) => {
  if (key === 'profile') {
    router.push('/profile')
  } else if (key === 'logout') {
    try {
      await authApi.logout()
    } catch {
      // ignore
    }
    userStore.logout()
    message.success('已退出登录')
    router.push('/login')
  }
}
</script>

<style scoped>
.layout {
  height: 100vh;
}
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #2080f0;
  border-bottom: 1px solid #f0f0f0;
}
.header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}
.menu-toggle {
  display: none;
}
.user-name {
  margin-right: 4px;
}
.content {
  padding: 20px;
  background: #f5f7fa;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: inline-flex;
  }
  .user-name {
    display: none;
  }
  .content {
    padding: 12px;
  }
}
</style>
