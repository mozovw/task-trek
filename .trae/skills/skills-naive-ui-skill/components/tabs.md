# 标签页

# 标签页 Tabs


# 标签页 Tabs
在同一块区域切换内容。


## 演示
设定 type='card'。

使用 prefix、suffix slot 来添加前后缀。

可以制定标签页展示的指令为 if 、 show 或者 show:lazy 。使用 show 的时候标签页内容不会随着切换重置。使用 show:lazy 的时候显示效果跟 show 一致，不过内容会进行延迟加载。

你可以延迟或阻止 Tab 切换。

因为 n-tabs 直接读取 children 渲染，所以它无法理解你的更新意图，在某些极端情况下，需要你手动的更新条的位置。

可以使用 trigger='hover' 触发标签页的改变。

分段类型的标签页。


### 五美金的礼品卡
只对 'line' 和 'bar' 类型的 Tabs 生效。

Tabs 可以有不同的尺寸。

增加一些标签页。只对 'card' 类型生效。

n-tabs 自带面板的显示，如果你只想要显示 tab 的部分，可以使用 n-tab 代替 n-tab-pane。

想怎么搞就怎么搞。


## API

### Tabs Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| addable | boolean | { disabled?: boolean } | false | 是否允许添加标签，只在标签的 type 为 card 时生效 |  |
| add-tab-class | string | undefined | 添加标签标签的类名 | 2.37.0 |
| add-tab-style | string | object | undefined | 添加标签标签的样式 | 2.37.0 |
| animated | boolean | false | 标签页切换是否使用动画，当 placement 为 'left' 或 'right' 时不生效 | 2.27.0 |
| bar-width | number | undefined | 标签条的宽度 | 2.25.0 |
| closable | boolean | false | 是否允许关闭标签，只在标签的 type 为 card 时生效 |  |
| default-value | string | number | undefined | 非受控模式下的默认值 |  |
| justify-content | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'center' | 'end' | undefined | flex 布局下主轴的排列方式，只对 'line' 和 'bar' 类型生效 | space-* 2.29.1 |
| size | 'small' | 'medium' | 'large' | 'medium' | 标签页的尺寸 |  |
| pane-class | string | undefined | 面板的类名 |  |
| pane-style | string | object | undefined | 面板的样式 |  |
| pane-wrapper-class | string | undefined | 面板容器的类名 | 2.34.4 |
| pane-wrapper-style | string | object | undefined | 面板容器的样式 | 2.34.4 |
| placement | 'left' | 'right' | 'top' | 'bottom' | 'top' | 标签的位置，对于 'segment' 类型的 n-tabs 不生效 | 2.34.4 |
| tab-class | string | undefined | 标签的类名 | 2.37.0 |
| tab-style | string | object | undefined | 标签的样式 |  |
| tabs-padding | number | 0 | 全部标签最左和最右的 padding |  |
| trigger | 'click' | 'hover' | 'click' | 触发 tab 的方式 | 2.27.0 |
| type | 'bar' | 'line' | 'card' | 'segment' | 'bar' | 标签类型 |  |
| value | string | number | undefined | 受控模式下的值 |  |
| on-add | () => void | undefined | 添加标签的回调函数 |  |
| on-before-leave | (name: string | number, oldName: string | number | null) => boolean | Promise<boolean> | undefined | 切换标签之前的钩子函数，返回 false 或 promise resolve false 或 promise reject 会阻止切换 |  |
| on-close | (name: string | number) => void | undefined | 关闭标签的回调函数 |  |
| on-update:value | (value: string | number) => void | undefined | 选中发生改变时的回调函数 |  |


### TabPane Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| closable | boolean | false | 是否允许关闭标签，只在标签的 type 为 card 时生效 |  |
| disabled | boolean | false | 是否禁用 |  |
| display-directive | 'if' | 'show' | 'show:lazy' | 'if' | 选择性渲染使用的指令，if 对应 v-if，show 对应 v-show，使用 show 的时候标签页状态切换后不会被重置，使用 show:lazy 的时候显示效果跟 show 一致，不过内容会进行延迟加载 |  |
| name | string | number | undefined | 必填，标签的名称 |  |
| tab | string | VNode | () => VNodeChild | undefined | 标签的 tab |  |
| tab-props | Object | undefined | 标签 tab 的 DOM 属性 | 2.24.2 |


### Tab Props
| 名称 | 类型 | 默认值 | 说明 |
| closable | boolean | false | 是否允许关闭标签，只在标签的 type 为 card 时生效 |
| disabled | boolean | false | 是否禁用 |
| name | string | number | undefined | 必填，标签的名称 |


### Tabs Slots
| 名称 | 参数 | 说明 |
| default | () | 标签的内容 |
| prefix | () | 标签的前缀 |
| suffix | () | 标签的后缀 |


### TabPane Slots
| 名称 | 参数 | 说明 |
| default | () | 标签项的内容 |
| tab | () | 标签项 tab 的内容 |


### Tab Slots
| 名称 | 参数 | 说明 |
| default | () | tab 的内容 |


### Tabs Methods
| 名称 | 类型 | 说明 | 版本 |
| syncBarPosition | () => void | 更新指示条的位置 | 2.24.0 |