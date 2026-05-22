import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api/modules'

export interface WhiteNoiseOption {
  id: string
  name: string
  url: string | null
}

export const whiteNoiseOptions: WhiteNoiseOption[] = [
  { id: 'none', name: '无', url: null },
  { id: 'waves', name: '海浪', url: 'https://www.ppbzy.com/audio/Background/Waves_fa-water/Beach_64.m4a' },
  { id: 'bonfire', name: '篝火', url: 'https://www.ppbzy.com/audio/Background/Bonfire_fa-fire/Bonfire%201_64.m4a' },
  { id: 'rain', name: '雨声', url: 'https://www.ppbzy.com/audio/Background/Rain_fa-cloud-showers-heavy/rain%20on%20the%20window_64.m4a' },
  { id: 'stream', name: '溪水', url: 'https://www.ppbzy.com/audio/Background/Stream_fa-bars-staggered/Stream_64.m4a' },
  { id: 'night', name: '夜晚', url: 'https://www.ppbzy.com/audio/Background/Night_fa-moon/Night_64.m4a' },
  { id: 'chill', name: '轻松', url: 'https://www.ppbzy.com/audio/Lofi/Chill/Lofi%20chill%201.m4a' },
  { id: 'sleep', name: '助眠', url: 'https://www.ppbzy.com/audio/Lofi/Sleep/Lofi%20sleep%201.m4a' },
  { id: 'piano', name: '钢琴', url: 'https://www.ppbzy.com/audio/Lofi/Piano/Lofi%20piano%201.m4a' },
]

export const useWhiteNoiseStore = defineStore('whiteNoise', () => {
  const selectedNoiseId = ref<string | null>(null)
  const audio = ref<HTMLAudioElement | null>(null)

  // 初始化音频对象
  const initAudio = () => {
    if (!audio.value) {
      audio.value = new Audio()
      audio.value.loop = true
    }
  }

  // 获取当前选中的白噪音
  const getSelectedNoise = computed(() => {
    if (!selectedNoiseId.value) return null
    return whiteNoiseOptions.find(n => n.id === selectedNoiseId.value) || null
  })

  // 从 URL 解析白噪音 ID
  const getNoiseIdByUrl = (url: string | null): string | null => {
    if (!url) return 'none'
    const noise = whiteNoiseOptions.find(n => n.url === url)
    return noise ? noise.id : null
  }

  // 从白噪音 ID 获取 URL
  const getNoiseUrlById = (noiseId: string | null): string | null => {
    if (!noiseId) return null
    const noise = whiteNoiseOptions.find(n => n.id === noiseId)
    return noise ? noise.url : null
  }

  // 加载用户设置（从后端）
  const loadUserSettings = async () => {
    try {
      const { data } = await userApi.getWhiteNoiseUrl()
      selectedNoiseId.value = getNoiseIdByUrl(data.whiteNoiseUrl)
    } catch {
      // ignore errors
    }
  }

  // 设置选中的白噪音并保存到后端
  const setSelectedNoise = async (noiseId: string | null) => {
    selectedNoiseId.value = noiseId
    const noiseUrl = getNoiseUrlById(noiseId)
    try {
      await userApi.updateWhiteNoiseUrl(noiseUrl)
    } catch {
      // ignore errors
    }
  }

  // 播放白噪音
  const playNoise = async (noiseId?: string) => {
    initAudio()
    const targetId = noiseId || selectedNoiseId.value
    if (!targetId || targetId === 'none') return

    const noise = whiteNoiseOptions.find(n => n.id === targetId)
    if (!noise || !noise.url) return

    // 如果当前播放的不是目标音频，切换音频
    if (audio.value && audio.value.src !== noise.url) {
      audio.value.src = noise.url
      audio.value.currentTime = 0
    }

    try {
      await audio.value?.play()
    } catch {
      // ignore play errors
    }
  }

  // 暂停白噪音
  const pauseNoise = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value.currentTime = 0
    }
  }

  // 停止白噪音
  const stopNoise = () => {
    pauseNoise()
  }

  return {
    selectedNoiseId,
    getSelectedNoise,
    setSelectedNoise,
    playNoise,
    pauseNoise,
    stopNoise,
    loadUserSettings,
  }
})
