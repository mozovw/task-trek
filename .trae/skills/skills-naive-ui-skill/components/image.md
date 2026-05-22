# 图像

# 图像 Image


# 图像 Image
预览一下。


## 演示
使用 fallback-src 设定失败时的图像。或者你可以使用下一个例子里的 error slot。

你可以使用 preview-disabled 来禁止预览。

默认的工具栏样式不一定符合你的需求，我们来调整一下。

让图片进入视口再加载，两种使用方式：一种是单独使用 lazy 属性，则将设置为原生 HTMLImageElement.loading 的属性值； 另一种方式是配合 intersection-observer-options 配置，将采用 IntersectionObserver API 实现懒加载。

单独设置  lazy  属性

lazy  属性配合  intersection-observer-options

通过调用 showPreview 来触发大图预览。

使用 <n-image-group /> 的 src-list 属性预览多张图片，无需使用 <n-image />。


```
currentIndex: 0
你可以使用 error slot 来自定义加载失败时的内容。

你可以使用 render-toolbar 来自定义工具栏。

设定 show-toolbar-tooltip 来使用弹出提示。因为有的用户不知道如何进行键盘操作。

可以通过 previewed-img-props 设定预览时图像的属性。

n-image-preview 可单独使用。


## API

### Image Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| alt | string | undefined | 图片说明 |  |
| fallback-src | string | undefined | 图片加载失败时显示的地址 |  |
| height | string | number | undefined | 图片高度 |  |
| img-props | ImgHTMLAttributes | undefined | 组件中 img 元素的属性 |  |
| lazy | boolean | false | 是否让图片进入视口再加载，单独使用将设置为HTMLImageElement.loading 的属性值；也可配合 intersection-observer-options 配置实现懒加载 | 2.30.5 |
| intersection-observer-options | { root?: Element | Document | string | null, rootMargin?: string, threshold?: number | number[]; } | undefined | lazy=true 时 intersection observer 观测的配置 | 2.30.5 |
| object-fit | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | 'fill' | 图片在容器内的的适应类型 |  |
| preview-src | string | undefined | 预览图片的图片地址 |  |
| preview-disabled | boolean | false | 是否禁用单击图像预览 |  |
| previewed-img-props | HTMLAttributes | undefined | 预览图片时 img 元素的属性 | 2.34.0 |
| render-toolbar | (props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild | undefined | 工具栏的渲染函数 | 2.38.2 |
| show-toolbar | boolean | true | 图片放大后是否展示底部工具栏 |  |
| show-toolbar-tooltip | boolean | false | 是否展示工具栏的提示 | 2.24.0 |
| src | string | undefined | 图片来源 |  |
| width | string | number | undefined | 图片宽度 |  |
| on-error | (e: Event) => void | undefined | 图片加载失败执行的回调 |  |
| on-load | (e: Event) => void | undefined | 图片加载完成执行的回调 |  |


### ImageGroup Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| current | number | undefined | 当前展示的图片的下标 | 2.43.0 |
| default-current | number | 0 | 默认展示的图片的下标 | 2.43.0 |
| default-show | boolean | false | 默认展示大图预览 | 2.43.0 |
| render-toolbar | (props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild | undefined | 工具栏的渲染函数 | 2.38.2 |
| show | boolean | undefined | 是否展示大图预览 | 2.43.0 |
| show-toolbar | boolean | true | 图片放大后是否展示底部工具栏 |  |
| show-toolbar-tooltip | boolean | false | 是否展示工具栏的提示 | 2.24.0 |
| src-list | string[] | undefined | 图片列表 | 2.43.0 |
| on-preview-next | () => void | undefined | 点击下一张的回调 |  |
| on-preview-prev | () => void | undefined | 点击上一张的回调 |  |
| on-update:current | (value: number) => void | undefined | 显示状态改变的回调函数 | 2.43.0 |
| on-update:show | (value: boolean) => void | undefined | 显示状态改变的回调函数 | 2.43.0 |


### ImagePreview Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| default-show | boolean | false | 默认展示大图预览 | 2.43.0 |
| render-toolbar | (props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild | undefined | 工具栏的渲染函数 | 2.43.0 |
| show | boolean | undefined | 是否展示大图预览 | 2.43.0 |
| show-toolbar | boolean | true | 图片放大后是否展示底部工具栏 | 2.43.0 |
| show-toolbar-tooltip | boolean | false | 是否展示工具栏的提示 | 2.43.0 |
| src | string | undefined | 图片地址 | 2.43.0 |
| on-close | () => void | undefined | 关闭预览时的回调 | 2.43.0 |
| on-update:show | (value: boolean) => void | undefined | 显示状态改变的回调函数 | 2.43.0 |


### Image Slots
| 名称 | 参数 | 说明 | 版本 |
| error | () | 图像加载失败时候的占位 | 2.40.2 |
| placeholder | () | 图像没有加载成功时候的占位 | 2.30.5 |


### ImageGroup Slots
| 名称 | 参数 | 说明 |
| default | () | 图像组的内容 |


### Image Methods
| 名称 | 类型 | 说明 | 版本 |
| showPreview | () => void | 手动打开大图预览 | 2.43.0 |