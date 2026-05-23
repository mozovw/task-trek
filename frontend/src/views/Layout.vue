<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      bordered
      :width="180"
      :collapsed-width="0"
      :collapsed="collapsed"
      :collapse-mode="isMobile ? 'overlay' : 'width'"
      @update:collapsed="onCollapse"
    >
      <div class="sider-header" @click="collapsed = !collapsed" style="cursor: pointer;">
        <span v-if="!collapsed" class="logo-text">Task Trek</span>
        <span v-else class="logo-text">TT</span>
      </div>
      <n-menu
        :value="activeMenu"
        :options="menuOptions"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered class="header">
        <n-button quaternary circle @click="collapsed = !collapsed">
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
        <div v-if="isMobile && !collapsed" class="sidebar-overlay" @click="collapsed = true"></div>
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

const isMobile = ref(window.innerWidth <= 768)
const collapsed = ref(isMobile.value)

const activeMenu = computed(() => route.path)

const onCollapse = (value: boolean) => {
  collapsed.value = value
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    collapsed.value = false
  }
})

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
.sider-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--mint-primary);
  border-bottom: 1px solid var(--border-subtle);
  letter-spacing: 0.5px;
  transition: background 0.2s ease;
}
.sider-header:hover {
  background: var(--mint-light);
}
.logo-text {
  white-space: nowrap;
  padding-right: 20px;
}

.header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid var(--border-subtle) !important;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}
.user-name {
  margin-right: 4px;
  font-weight: 500;
  color: var(--text-primary);
}
.content {
  padding: 0;
  background: var(--mint-bg);
  position: relative;
}
:deep(.n-layout-scroll-container) {
  background: var(--mint-bg) !important;
}
:deep(.n-layout-sider) {
  background: #fff !important;
  border-right: 1px solid var(--border-subtle) !important;
}
:deep(.n-menu .n-menu-item) {
  border-radius: 8px;
  margin: 2px 8px;
}
:deep(.n-menu .n-menu-item--active) {
  background: var(--mint-light) !important;
  color: var(--mint-primary) !important;
}
.sidebar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

@media (max-width: 768px) {
  .n-layout-sider {
    position: fixed !important;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
  }
  .user-name {
    display: none;
  }
  .content {
    padding: 8px;
  }
}
</style>
