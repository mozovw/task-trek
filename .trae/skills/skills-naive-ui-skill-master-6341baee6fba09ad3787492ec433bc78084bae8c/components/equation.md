# 公式

# 公式 Equation


# 公式 Equation
没有人会想到一个组件库会有这种组件，但是作者的一位朋友需要这个。

下面的代码展示了如何为 Equation 设定 katex。


```
<template>
  <n-config-provider :katex="katex">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import katex from 'katex'
  import 'katex/dist/katex.css'

  export default defineComponent({
    setup() {
      return {
        katex
      }
    }
  })
</script>

## 演示

## API

### Equation Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| katex | object | undefined | Katex | 2.34.0 |
| katex-options | object | undefined | Katex 公式的配置 | 2.34.0 |
| value | string | undefined | Latex 格式的公式表达式 | 2.34.0 |