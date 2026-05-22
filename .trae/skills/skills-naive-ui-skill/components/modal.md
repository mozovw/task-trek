# 模态框

# 模态框 Modal


# 模态框 Modal
它会弹出来，然后给你看点东西。

- 如果你想通过 useModal 使用模态框，你需要把调用其方法的组件放在 n-modal-provider 内部并且使用 useModal 去获取 API。
- 如果你想知道如何在 setup 外使用，请参考页面最下方的 Q & A。

例如：


```
<!-- App.vue -->
<n-modal-provider>
  <content />
</n-modal-provider>
import { useModal } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup() {
    const modal = useModal()
    return {
      showModal() {
        modal.create({
          title: '标题',
          content: '内容'
        })
      }
    }
  }
})

## 演示
模态框的基础用法，你可以把任何东西放进去，比如一个卡片。

自 2.38.0 开始提供。

你可以使用 useModal.create 来打开一个模态框。（请确保使用此 API 的组件被 n-modal-provider 包含。）

使用 mask-closable=false 使点击遮罩层不发出关闭事件。

模态框有一些预设，让你在设定之后可以使用对应的 slots 还有 props。

插槽也会随着预设变动。

设定 draggable 属性为 true，弹窗即可拖拽。如果你希望弹窗可以被拖出 window 的范围，可以设置 draggable 为 { bounds: 'none' }。

如果你希望拖拽完全自定义 modal 的内容，你可以使用 default 插槽内的 draggableClass，设定在你希望触发拖拽的元素上。

使用 Card 预设时，开启 content-scrollable 可以让滚动仅发生在内容区域，标题和底部保持固定。

模态框的显示可以是受控的。

通过固定定位设定 Modal 的位置。

dialog 预设的例子。

虽然从点击位置展开模态框的动画很好看，但是有时候我们需要简单点的从屏幕中间开始的动画。你可以把 transform-origin 设为 'center' 来达成这个效果。

也可以不显示模态框的遮罩层，可以拿来做一个悬浮窗。

注意，此时遮罩层相关的 API 将不起作用，焦点也不会被限制在 Modal 内部（这会导致键盘事件例如 Esc 不总是生效）。


## API

### ModalProvider Props
自 2.38.0 开始提供。

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| to | string | HTMLElement | body | 模态的挂载位置 | 2.38.0 |


### useModal API
自 2.38.0 开始提供。

| 名称 | 类型 | 说明 | 版本 |
| create | (options: ModalOptions) => ModalReactive | 创建模态框 | 2.38.0 |
| destroyAll | () => void | 销毁所有弹出的模态框 | 2.38.0 |

ModalOptions 的属性和 ModalReactive 属性同 ModalProps（属性应使用 camelCase，例如 auto-focus 对应 autoFocus）。


### Modal Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| auto-focus | boolean | true | 是否自动聚焦 Modal 第一个可聚焦的元素 | 2.24.2 |
| block-scroll | boolean | true | 是否在打开时禁用 body 滚动 | 2.28.3 |
| close-on-esc | boolean | true | 是否在摁下 Esc 键的时候关闭 Modal | 2.24.2 |
| display-directive | 'if' | 'show' | 'if' | 使用何种指令控制模态框主体的条件渲染 |  |
| draggable | boolean | { bounds?: 'none' } | false | 是否可拖拽，bounds === 'none' 时拖拽可超出视口 | 2.41.0 |
| mask-closable | boolean | true | 点击遮罩时是否发出 update:show 事件 |  |
| preset | 'dialog' | 'card' | undefined | 模态框使用何种预设 |  |
| show | boolean | false | 是否展示 Modal |  |
| show-mask | boolean | true | 是否显示遮罩层，如果设为 false，遮罩层相关的 API 将不起作用，焦点也不会被限制在 Modal 内部（这会导致键盘事件例如 Esc 不总是生效）。 | 2.43.0 |
| to | string | HTMLElement | body | Modal 的挂载位置 |  |
| transform-origin | 'mouse' | 'center' | 'mouse' | 模态框动画出现的位置 |  |
| trap-focus | boolean | true | 是否将焦点锁定在 Modal 内部 | 2.24.2 |
| z-index | number | undefined | Modal 的 z-index | 2.24.0 |
| on-after-enter | () => void | undefined | Modal 出现后的回调 |  |
| on-after-leave | () => void | undefined | Modal 关闭后的回调 |  |
| on-esc | () => void | undefined | 焦点在 Modal 内部时按下 Esc 键的回调 | 2.24.2 |
| on-mask-click | () => void | undefined | 点击遮罩时的回调 |  |
| on-update:show | (value: boolean) => void | undefined | 模态框更新是否展示状态的回调 |  |


### Modal（Card 预设）Props
参考 Card props


### Modal（Dialog 预设）Props
参考 Dialog props


### Modal（无预设）Slots
| 名称 | 参数 | 说明 |
| default | () | 模态框的内容 |


### Modal（Card 预设）Slots
参考 Card slots

注意，default slot 参数类型为 (props: { draggableClass: string })


### Modal（Dialog 预设）Slots
参考 Dialog slots

注意，default slot 参数类型为 (props: { draggableClass: string })


## Q & A

### 在 setup 外使用

#### 选择 1
使用 createDiscreteApi。如果你想使用它，请认真阅读它的注意事项。你最好不要把它和 useModal 在同一 App 中混用。


#### 选择 2
<!-- App.vue -->
<n-modal-provider>
  <content />
</n-modal-provider>
<!-- content.vue -->
<template>...</template>

<script>
  import { useModal } from 'naive-ui'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$modal = useModal()
    }
  })
</script>
// xxx.js
export function handler() {
  // 需要确保已经在 setup 中执行了 window.$modal = modal
  window.$modal.create({
    title: '标题',
    content: '内容'
  })
}