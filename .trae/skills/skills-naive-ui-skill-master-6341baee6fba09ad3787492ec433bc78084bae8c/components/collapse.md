# 折叠面板

# 折叠面板 Collapse


# 折叠面板 Collapse
我看到它总被用在界面边栏的控制面板上。


## 演示
像一个手风琴

设定 display-directive 为 if 或 show 来控制 n-collapse-item 里面的 DOM 是否保持。

在右边放一些信息。

当你需要自定义展开区域时，可以使用 trigger-areas 属性来指定触发展开的区域。

使用 arrow-placement 来设定箭头的位置。

可以嵌套。

应当注意的是，即使只打算展开一个面板，default-expanded-names也应当传入数组，除非使用了accordion。


## API

### Collapse Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| accordion | boolean | false | 是否只允许展开一个面板 |  |
| arrow-placement | 'left' | 'right' | 'left' | 箭头位置 |  |
| default-expanded-names | string | number | Array<string | number> | null | null | 非受控模式下展开的面板 name。accordion 模式时不为数组 |  |
| display-directive | 'if' | 'show' | 'if' | 内部 n-collapse-item 在控制内容是否渲染时使用的指令，'if' 对应 v-if，'show' 对应 v-show |  |
| expanded-names | string | number | Array<string | number> | null | undefined | 受控模式下展开的面板的 name，accordion 模式时不为数组 |  |
| trigger-areas | Array<'main' | 'arrow' | 'extra'> | ['main', 'arrow', 'extra'] | 触发展开的区域，如果不想让某些区域触发展开，可以使用此属性 | 2.37.1 |
| on-item-header-click | (data: { name: string | number, expanded: boolean, event: MouseEvent }) => void | undefined | 点击标题时触发的回调函数 |  |
| on-update:expanded-names | (expandedNames: Array<string | number> | string | number | null) => void | undefined | 展开内容改变时触发的回调函数 |  |


### CollapseItem Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| disabled | boolean | false | 是否禁用展开 | 2.32.2 |
| display-directive | 'if' | 'show' | undefined | 自身在控制内容是否渲染时使用的指令，'if' 对应 v-if，'show' 对应 v-show。在设定为 undefined 的时候跟随外层的 n-collapse |  |
| name | string | number | 随机字符串 | 名称 |  |
| title | string | undefined | 标题 |  |


### Collapse Slots
| 名称 | 参数 | 说明 |
| arrow | (props: { collapsed: boolean }) | 折叠面板的自定义图标 |
| default | () | 折叠面板的内容 |
| header-extra | (props: { collapsed: boolean }) | 折叠面板节点头部的额外内容 |


### CollapseItem Slots
| 名称 | 参数 | 说明 |
| arrow | (props: { collapsed: boolean }) | 折叠面板节点头部的自定义图标 |
| default | () | 折叠面板节点的内容 |
| header | (props: { collapsed: boolean }) | 折叠面板节点头部的内容 |
| header-extra | (props: { collapsed: boolean }) | 折叠面板节点头部的额外内容 |