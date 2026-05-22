# 轮播图

# 轮播图 Carousel


# 轮播图 Carousel
一般用来播放一些好消息。


## 演示
设定 autoplay 然后它就能自己动了。

需要注意，slides-per-view 属性会与 loop 冲突，如果你需要自定义每屏显示数量，那么 loop 功能将被禁用。

设定 centered-slides 来将所有的 slide 居中显示，这仅在 effect 为 slide 以及 card 的时候有用。

如果你想要自定义过渡效果，可以使用 transition-props，并把 effect 设置为 'custom'，具体配置见官方文档。

是否通过按键切换轮播图，只有焦点在 Dots 上时才有效。

轮播图会默认启用 Touch 事件模拟，如果你需要轮播图响应鼠标拖拽，可以使用 draggable 属性。

你可以使用 next-slide-style 和 prev-slide-style 来调整前后卡片的比例。

设定 show-arrow 来显示箭头。

设定 dot-type 来更改指示器的样式，可以使用 :show-dots="false" 来隐藏指示点。

设定 dot-placement 来更改指示点的位置。

如果你想要自定义过渡效果，可以使用 transition-props，并把 effect 设置为 custom。

设定 trigger 为 hover 鼠标经过指示点时触发切换。


## API

### Carousel Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| autoplay | boolean | false | 是否自动播放 |  |
| centered-slides | boolean | false | 是否居中显示当前页轮播图 | 2.24.0 |
| current-index | number | undefined | 当前显示页 | 2.24.0 |
| default-index | number | 0 | 默认显示页 | 2.24.0 |
| direction | 'horizontal' | 'vertical' | 'horizontal' | 轮播图显示的方向 |  |
| dot-placement | 'top' | 'bottom' | 'left' | 'right' | 'bottom' | 轮播指示点位置 | 2.24.0 |
| dot-type | 'dot' | 'line' | 'dot' | 轮播指示点样式 | 2.24.0 |
| draggable | boolean | false | 是否通过鼠标拖拽切换轮播图 | 2.24.0 |
| effect | 'slide' | 'fade' | 'card' | 'custom' | 'slide' | 轮播图切换时的过渡效果 | 2.24.0, 'card' 2.24.2 |
| interval | number | 5000 | 自动播放的间隔（ms） |  |
| keyboard | boolean | false | 是否通过按键切换轮播图，只有焦点在 Dots 上时才起作用 | 2.24.0 |
| loop | boolean | true | 是否循环播放 | 2.24.0 |
| mousewheel | boolean | false | 是否通过鼠标滚轮切换轮播图 | 2.24.0 |
| next-slide-style | object | string | undefined | 下一张轮播图的样式 | 2.27.0 |
| prev-slide-style | object | string | undefined | 上一张轮播图的样式 | 2.27.0 |
| slides-per-view | 'auto' | number | 1 | 每一页显示的轮播图数量 | 2.24.0 |
| space-between | number | 0 | 轮播图之间的间距 | 2.24.0 |
| show-arrow | boolean | false | 是否显示箭头按钮 | 2.24.0 |
| show-dots | boolean | true | 是否展示指示点 | 2.24.0 |
| touchable | boolean | true | 是否通过触摸拖拽切换轮播图 | 2.24.0 |
| transition-style | { transitionDuration?: string, transitionTimingFunction?: string } | { transitionDuration: '300ms' } | 过渡效果的样式 | 2.24.0 |
| transition-props | TransitionProps | undefined | 自定义过渡效果属性，参考 Vue 文档 | 2.24.0 |
| trigger | 'click' | 'hover' | 'click' | 触发切换的方式 |  |
| on-update:current-index | (currentIndex: number, lastIndex: number) => void | undefined | 当前页变化时的回调函数 | 2.24.0 |


### Carousel Slots
| 名称 | 参数 | 说明 | 版本 |
| default | () | 轮播的内容 |  |
| arrow | (info: { total: number, currentIndex: number, to: (index: number) => void, prev: () => void, next: () => void }) | 箭头 | 2.24.0 |
| dots | (info: { total: number, currentIndex: number, to: (index: number) => void }) | 指示点 | 2.24.0 |


### Carousel Methods
| 名称 | 类型 | 说明 | 版本 |
| to | (index: number) => void | 滑动至某一页 | 2.24.0 |
| prev | () => void | 滑动至前一页 | 2.24.0 |
| next | () => void | 滑动至后一页 | 2.24.0 |
| getCurrentIndex | () => number | 获取当前页 | 2.24.0 |