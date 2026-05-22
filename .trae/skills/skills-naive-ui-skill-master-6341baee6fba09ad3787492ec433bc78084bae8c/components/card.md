# 卡片

# 卡片 Card


# 卡片 Card
放点东西进去。


## 演示
基础卡片

卡片可以有封面。

卡片有很多插槽，希望能帮你少写点代码。

content 和 footer 可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。

谁说卡片一定要有标题呢。

使用 n-skeleton 模拟加载效果。

在亮色模式下，有的时候你希望背景色暗一点，来和纯色背景分割。

卡片有 small、medium、large、huge 尺寸。

卡片可以没有边框。

用于 Modal 的时候，你可能需要这个属性。

开启 content-scrollable 后，卡片会把滚动限制在内容区，头部和底部不会跟着滚动。通常配合固定高度使用。

第 1 条任务：只滚动内容区域。

第 2 条任务：只滚动内容区域。

第 3 条任务：只滚动内容区域。

第 4 条任务：只滚动内容区域。

第 5 条任务：只滚动内容区域。

第 6 条任务：只滚动内容区域。

第 7 条任务：只滚动内容区域。

第 8 条任务：只滚动内容区域。

第 9 条任务：只滚动内容区域。

第 10 条任务：只滚动内容区域。

第 11 条任务：只滚动内容区域。

第 12 条任务：只滚动内容区域。

第 13 条任务：只滚动内容区域。

第 14 条任务：只滚动内容区域。

第 15 条任务：只滚动内容区域。

第 16 条任务：只滚动内容区域。

第 17 条任务：只滚动内容区域。

第 18 条任务：只滚动内容区域。

第 19 条任务：只滚动内容区域。

第 20 条任务：只滚动内容区域。

卡片提供 content-style、header-style、footer-style 来帮助你自定义样式，比如你想要一个没有 padding 的卡片来往里面放一些乱七八糟的东西。


## API

### Card Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| action | () => VNodeChild | undefined | 操作区域内容，需要是 render 函数 | 2.38.2 |
| bordered | boolean | true | 是否显示卡片边框 |  |
| closable | boolean | false | 是否允许关闭 |  |
| close-focusable | boolean | false | 关闭按钮是否可以聚焦 | 2.43.0 |
| content | string | (() => VNodeChild) | undefined | 卡片内容，可以是 render 函数 | 2.38.2 |
| content-class | string | undefined | 卡片内容区域的类名 | 2.36.0 |
| content-scrollable | boolean | false | 是否仅让卡片内容区域可滚动（建议配合固定高度） | 2.44.0 |
| content-style | Object | string | undefined | 卡片内容区域的样式 |  |
| cover | () => VNodeChild | undefined | 覆盖内容，需要是 render 函数 | 2.38.2 |
| embedded | boolean | false | 使用更深的背景色展现嵌入效果，只对亮色主题生效 |  |
| footer | () => VNodeChild | undefined | 底部内容 | 2.38.2 |
| footer-class | string | undefined | 卡片底部区域的类名 | 2.36.0 |
| footer-style | Object | string | undefined | 卡片底部区域的样式 |  |
| header-class | string | undefined | 卡片头部区域的类名 | 2.36.0 |
| header-style | Object | string | undefined | 卡片头部区域的样式 |  |
| header-extra | () => VNodeChild | undefined | 头部额外内容，需要是 render 函数 | 2.38.2 |
| header-extra-class | string | undefined | 卡片头部额外内容的类名 | 2.36.0 |
| header-extra-style | Object | string | undefined | 卡片头部额外内容的样式 | 2.25.0 |
| hoverable | boolean | false | 卡片是否可悬浮 |  |
| segmented | boolean | { [part in 'content' | 'footer' | 'action']?: boolean | 'soft' } | false | 卡片的分段区域设置 |  |
| size | 'small' | 'medium' | 'large' | 'huge' | 'medium' | 卡片的尺寸 |  |
| tag | string | 'div' | 卡片组件要渲染为什么标签 | 2.34.3 |
| title | string | (() => VNodeChild) | undefined | 卡片的标题，可以是 render 函数 | 2.38.2 支持 render 函数 |
| on-close | () => void | undefined | 点击卡片关闭图标时的回调 |  |


### Card Slots
| 名称 | 参数 | 说明 |
| cover | () | 覆盖内容 |
| header | () | 头部内容 |
| header-extra | () | 头部额外内容 |
| default | () | 卡片内容 |
| footer | () | 底部内容 |
| action | () | 操作区域内容 |