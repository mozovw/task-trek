# 头像

# 头像 Avatar


# 头像 Avatar
在互联网上，没有人知道你是 *** 。


## 演示
头像有 small、medium 和 large 大小，也可以自己设定尺寸。

你可以把它设成某种和你爱吃的东西有关的颜色。

我喜欢用图标当头像。

下面的头像加载失败时会展示 07akioni。

让图片进入视口再加载，两种使用方式：一种是单独使用 lazy 属性，则将设置为原生 HTMLImageElement.loading 的属性值； 另一种方式是配合 intersection-observer-options 配置，将采用 IntersectionObserver API 实现懒加载。

单独设置  lazy  属性

lazy  属性配合  intersection-observer-options

头像可以是圆形。

和 Badge 一起用也挺好的 (如果你喜欢看到一堆一堆的推送)。

字号会根据内容文字自动调整。

人多不一定是好事。

请注意，该演示使用了 NGAvatarGroup 组件，该组件自 naive-ui 的 2.43.0 起才可用。

NGAvatarGroup 与 NAvatarGroup 几乎完全相同，不同之处在于它新增了一个通用的 options 属性（generic options prop），这可以使在 .vue 文件中使用时让 slots 和 props 的类型更精确。

该组件仅在 Vue >= 3.3 且在 .vue 文件中才能使用。

如果你的开发环境不支持 Vue 泛型组件，请改用 NAvatarGroup。

NGAvatarGroup 应从 'naive-ui/generic' 中导入。


## API

### Avatar Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| bordered | boolean | false | 头像是否带边框 |  |
| color | string | undefined | 头像的背景色 |  |
| fallback-src | string | undefined | 头像加载失败时显示的图片的地址 |  |
| img-props | ImgHTMLAttributes | undefined | 组件中 img 元素的属性 | 2.34.0 |
| intersection-observer-options | { root?: Element | Document | string | null, rootMargin?: string, threshold?: number | number[]; } | undefined | lazy=true 时 intersection observer 观测的配置 | 2.31.0 |
| lazy | boolean | false | 是否让图片进入视口再加载，单独使用将设置为HTMLImageElement.loading 的属性值；也可配合 intersection-observer-options 配置实现懒加载 | 2.31.0 |
| object-fit | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | 'fill' | 头像的图片在容器内的的适应类型 |  |
| render-fallback | () => VNodeChild | undefined | 加载失败的渲染函数 | 2.33.4 |
| render-placeholder | () => VNodeChild | undefined | 占位的渲染函数 | 2.33.4 |
| round | boolean | false | 头像是否圆形 |  |
| size | 'small' | 'medium' | 'large' | number | 'medium' | 头像的尺寸 |  |
| src | string | undefined | 头像的地址 |  |
| on-error | (e: Event) => void | undefined | 头像的图片加载失败执行的回调 |  |


### AvatarGroup Props
泛型 <T extends AvatarGroupOption = AvatarGroupOption>，自 2.43.0 可用。

泛型能力仅在 .vue 文件中，Vue >= 3.3，通过 import { NGAvatarGroup } from 'naive-ui/generic' 可用，否则请使用普通的 n-avatar-group。


```
interface AvatarGroupOption {
  src: string
}
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| expand-on-hover | boolean | false | 悬停时展开 | 2.37.0 |
| max | number | undefined | 组内头像显示的最大个数 |  |
| max-style | Object | string | undefined | 溢出标识的样式 |  |
| options | Array<T extends AvatarGroupOption = AvatarGroupOption> | [] | 头像组的选项 |  |
| size | 'small' | 'medium' | 'large' | number | 'medium' | 头像的尺寸 | 2.43.0 |
| vertical | boolean | false | 组内头像是否垂直排列 |  |


### Avatar Slots
| 名称 | 参数 | 说明 | 版本 |
| default | () | 头像内填充的内容 |  |
| fallback | () | 加载失败的内容 | 2.33.4 |
| placeholder | () | 图像没有完成加载时候的占位 | 2.31.0 |


### AvatarGroup Slots
| 名称 | 参数 | 说明 |
| avatar | (info: { option: { src: string } }) | 头像组头像 |
| default | () | 头像组内填充的内容 |
| rest | (info: { options: Array<{ src: string }>, rest: number }) | 头像组溢出容器 |