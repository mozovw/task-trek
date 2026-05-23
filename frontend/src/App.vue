<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2D6A5D',
    primaryColorHover: '#245a4e',
    primaryColorPressed: '#1e4a40',
    primaryColorSuppl: '#2D6A5D',
    infoColor: '#2D6A5D',
    infoColorHover: '#245a4e',
    infoColorPressed: '#1e4a40',
    infoColorSuppl: '#2D6A5D',
    successColor: '#7BC8A4',
    successColorHover: '#5fb891',
    warningColor: '#F59E0B',
    warningColorHover: '#d97706',
    errorColor: '#EF4444',
    errorColorHover: '#dc2626',
    borderRadius: '8px',
    borderRadiusSmall: '6px',
    borderRadiusMedium: '8px',
    borderRadiusLarge: '12px',
    boxShadow1: '0 2px 12px rgba(45, 106, 93, 0.06)',
    boxShadow2: '0 4px 16px rgba(45, 106, 93, 0.1)',
    boxShadow3: '0 6px 24px rgba(45, 106, 93, 0.12)',
  },
  Button: {
    borderRadiusMedium: '8px',
    borderRadiusSmall: '8px',
    borderRadiusTiny: '6px',
    colorPrimary: '#2D6A5D',
    textColorPrimary: '#FFFFFF',
    colorHoverPrimary: '#245a4e',
    colorPressedPrimary: '#1e4a40',
    colorFocusPrimary: '#2D6A5D',
    borderPrimary: '1px solid #2D6A5D',
    borderHoverPrimary: '1px solid #245a4e',
    borderPressedPrimary: '1px solid #1e4a40',
    colorInfo: '#2D6A5D',
    textColorInfo: '#FFFFFF',
    colorHoverInfo: '#245a4e',
    colorPressedInfo: '#1e4a40',
    colorFocusInfo: '#2D6A5D',
  },
  Card: {
    borderRadius: '12px',
    color: '#FFFFFF',
    borderColor: 'transparent',
  },
  Menu: {
    itemHeight: '40px',
    itemBorderRadius: '8px',
    color: '#FFFFFF',
    itemColorHover: '#E8F5F0',
    itemColorActive: '#E8F5F0',
    itemTextColorActive: '#2D6A5D',
    itemIconColorActive: '#2D6A5D',
  },
  DatePicker: {},
  Radio: {
    radioSize: '16px',
  },
  Checkbox: {
    size: '18px',
  },
  Tag: {},
  Input: {},
  Select: {},
  Empty: {
    textColor: '#A0B0A9',
  },
}
</script>

<style>
:root {
  --mint-primary: #2D6A5D;
  --mint-primary-hover: #245a4e;
  --mint-light: #E8F5F0;
  --mint-bg: #F0F7F4;
  --mint-accent: #7BC8A4;
  --text-primary: #2C3E3A;
  --text-secondary: #6B7F77;
  --text-muted: #A0B0A9;
  --border-subtle: #E2EDED;
  --card-shadow: 0 2px 12px rgba(45, 106, 93, 0.06);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  background: var(--mint-bg);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border-subtle);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
</style>
