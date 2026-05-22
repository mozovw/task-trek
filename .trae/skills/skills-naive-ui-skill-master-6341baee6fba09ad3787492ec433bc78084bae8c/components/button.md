# 组件

# 按钮 Button


# 按钮 Button
按钮用来触发一些操作。


## 演示
按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

使用 dashed 来使用虚线按钮。

长得就像文本。

按钮可以被禁用。

处理按钮的事件。

Ghost 按钮有透明的背景。

这两个颜色看起来像毒蘑菇。

有时你可能会想用图标作为按钮并且自定义一些尺寸。这时你可以使用 text 按钮和 font-size 来进行设定。

有 tiny、small、medium 和 large 尺寸。

你可以把按钮渲染成不同的标签，比如 <a />。

在按钮上使用图标，可以使用 render-icon 属性或 icon 插槽。

按钮拥有不同的形状。

按钮有加载状态。

可以把几个按钮结合成按钮组。

disabled 的原生 button 不会触发部分鼠标事件，因此 n-popover 无法监听到相关的事件。如果你需要在这种情况下使用，可以使用 tag 属性来调整 button 的行为。


## API

### Button Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| attr-type | 'button' | 'submit' | 'reset' | 'button' | 按钮的 DOM 的 type 属性 |  |
| block | boolean | false | 按钮是否显示为块级 |  |
| bordered | boolean | true | 按钮是否显示 border |  |
| circle | boolean | false | 按钮是否为圆形 |  |
| color | string | undefined | 按钮颜色（支持形如 #FFF， #FFFFFF， yellow，rgb(0, 0, 0) 的颜色） |  |
| dashed | boolean | false | 按钮边框是否为虚线 |  |
| disabled | boolean | false | 按钮是否禁用 |  |
| focusable | boolean | true | 按钮是否可以被聚焦 |  |
| ghost | boolean | false | 按钮是否透明 |  |
| native-focus-behavior | boolean | 浏览器不是 Safari | 按钮是否遵循原生的 focus 行为。Safari 原生的 button 无法通过点击被聚焦，所以默认情况下 naive-ui 做了一些处理使它可以被聚焦，如果你不需要这种行为，或者发现你需要让按钮可被拖动，可以开启这个属性 | 2.28.3 |
| icon-placement | 'left' | 'right' | 'left' | 按钮中图标的位置 |  |
| keyboard | boolean | true | 是否支持键盘操作 |  |
| loading | boolean | false | 按钮是否显示加载状态 |  |
| quaternary | boolean | false | 是否是四级按钮 |  |
| spin-props | { strokeWidth?: number, stroke?: string, scale?: number, radius?: number } | undefined | 加载图标的属性 | 2.44.0 |
| render-icon | () => VNodeChild | undefined | 按钮图标的渲染函数 | 2.34.0 |
| round | boolean | false | 按钮是否显示圆角 |  |
| size | 'tiny' | 'small' | 'medium' | 'large' | 'medium' | 按钮的尺寸 |  |
| secondary | boolean | false | 是否是次要按钮 |  |
| strong | boolean | false | 按钮文字是否加粗 |  |
| tertiary | boolean | false | 是否是三级按钮 |  |
| text | boolean | false | 是否显示为文本按钮 |  |
| text-color | string | undefined | 按钮文字颜色（支持形如 #FFF， #FFFFFF， yellow，rgb(0, 0, 0) 的颜色） |  |
| type | 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default' | 按钮的类型 |  |
| tag | string | 'button' | 按钮需要被渲染为什么标签 |  |


### ButtonGroup Props
| 名称 | 类型 | 默认值 | 说明 |
| size | 'tiny' | 'small' | 'medium' | 'large' | undefined | 在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效 |
| vertical | boolean | false | 组内按钮的排列方式 |


### Button Slots
| 名称 | 参数 | 说明 |
| default | () | 按钮的内容 |
| icon | () | 按钮的图标 |


### ButtonGroup Slots
| 名称 | 参数 | 说明 |
| default | () | 按钮组的内容 |