# 数据表格

# 数据表格 Data Table


# 数据表格 Data Table
数据表格用来显示一些格式化信息。

- 传入 data 属性的数组的每一项都代表渲染的一行数据，每一行数据都要有唯一的 key，否则需要在 table 上声明 row-key 属性。
- 在非异步状况下，总页数 page-count 是由数据的数量决定的，即使传入 page-count 也不会生效，如果你希望指定总页数，需要设定 remote 属性。
- 如果你想使用服务端返回的数据进行展示，分页，过滤，排序等，请参考异步。


## 演示
| No | Title | Length | Action |
| 3 | Wonderwall | 4:18 | Play |
| 4 | Don't Look Back in Anger | 4:48 | Play |
| 12 | Champagne Supernova | 7:27 | Play |

| Name | Age | Address | Tags | Action |

| Name | Age | Address | Tags | Action |
| John Brown | 32 | New York No. 1 Lake Park | nicedeveloper | Send Email |
| Jim Green | 42 | London No. 1 Lake Park | wow | Send Email |
| Joe Black | 32 | Sidney No. 1 Lake Park | coolteacher | Send Email |

| Name | Age | Address | Tags | Action |
| John Brown | 32 | New York No. 1 Lake Park | nicedeveloper | Send Email |
| Jim Green | 42 | London No. 1 Lake Park | wow | Send Email |
| Joe Black | 32 | Sidney No. 1 Lake Park | coolteacher | Send Email |

| Name | Age | Address | Tags | Action |
| John Brown | 32 | New York No. 1 Lake Park | nicedeveloper | Send Email |
| Jim Green | 42 | London No. 1 Lake Park | wow | Send Email |
| Joe Black | 32 | Sidney No. 1 Lake Park | coolteacher | Send Email |

| Name | Age | Address | Tags | Action |
| John Brown | 32 | New York No. 1 Lake Park | nicedeveloper | Send Email |
| Jim Green | 42 | London No. 1 Lake Park | wow | Send Email |
| Joe Black | 32 | Sidney No. 1 Lake Park | coolteacher | Send Email |

| Name | Age | Address | Tags | Action |
| John Brown | 32 | New York No. 1 Lake Park | nicedeveloper | Send Email |
| Jim Green | 42 | London No. 1 Lake Park | wow | Send Email |
| Joe Black | 32 | Sidney No. 1 Lake Park | coolteacher | Send Email |

如果你想给行增加一些属性或者事件处理器，使用 row-props 属性。

| Name | Age | Address |
| 07akioni | 18 | Yiheyuan Road |
| 08akioni | 14 | Pingshan Road |
| 09akioni | 22 | Haidian Bridge |

设定列的 colSpan 和 rowSpan 来控制单元格的 colspan 和 rowspan。设定列的 titleColSpan 控制表头的 colspan。

| Name | Address | Tags |
| John Brown | New York No. 1 Lake Park | nicedeveloper | Send Email |
| London No. 1 Lake Park | wow |
| Joe Black | 32 | Sidney No. 1 Lake Park | Send Email |

| Name | Age | Address |
| Jim Green | 42 | London No. 1 Lake Park |
| Jim Red | 32 | London No. 2 Lake Park |
| John Brown | 32 | New York No. 1 Lake Park |

配置 pagination-behavior-on-filter 控制过滤后的页面停留在当前页还是首页。

如果设置停留在当前页，过滤后的数据总数达不到当前页时，会展示最后一页的数据。

| Name | Age | Address |
| John Brown | 32 | New York No. 1 Lake Park |
| Jim Green | 42 | London No. 1 Lake Park |
| Joe Black | 32 | Sidney No. 1 Lake Park |

为 sorter 设定 multiple 和 compare 来开启多列排序，其中 multiple 为多列排序的优先级，越高优先级越高。

| Name | Age | Chinese Score | Math Score | English Score | Address |
| John Brown | 32 | 98 | 60 | 70 | New York No. 1 Lake Park |
| Jim Green | 42 | 98 | 66 | 89 | London No. 1 Lake Park |
| Joe Black | 32 | 98 | 66 | 89 | Sidney No. 1 Lake Park |
| Jim Red | 32 | 88 | 99 | 89 | London No. 2 Lake Park |

| Name | Age ( 仅升序和降序切换 ) | Score ( 常规三态排序 ) | Address |
| John Brown | 32 | 89 | New York No. 1 Lake Park |
| Joe Black | 32 | 78 | Sidney No. 1 Lake Park |
| Jim Green | 42 | 92 | London No. 1 Lake Park |

仅支持叶子结点。

| No | Title | Length (minWidth: 100, maxWidth: 500) | Action |
| 3 | Wonderwall | 4:18 | Play |
| 4 | Don't Look Back in Anger | 4:48 | Play |
| 12 | Champagne Supernova | 7:27 | Play |

可以通过把第一列的类型设为 selection 来让行变成可选的。

你选中了 0 行。

|  | Name | Age | Address |
|  | Edward King 0 | 32 | London, Park Lane no. 0 |
|  | Edward King 1 | 32 | London, Park Lane no. 1 |
|  | Edward King 2 | 32 | London, Park Lane no. 2 |
|  | Edward King 3 | 32 | London, Park Lane no. 3 |
|  | Edward King 4 | 32 | London, Park Lane no. 4 |

在 type='selection' 的列，同时设置 multiple=false 来变成单选模式。

|  | Name | Age | Address |
|  | Edward King 0 | 32 | London, Park Lane no. 0 |
|  | Edward King 1 | 32 | London, Park Lane no. 1 |
|  | Edward King 2 | 32 | London, Park Lane no. 2 |
|  | Edward King 3 | 32 | London, Park Lane no. 3 |
|  | Edward King 4 | 32 | London, Park Lane no. 4 |
|  | Edward King 5 | 32 | London, Park Lane no. 5 |

在 type='selection' 的列设定 options 来在头部勾选框旁边创建下拉菜单。

你选中了 0 行。

|  | Name | Age | Address |
|  | Edward King 0 | 32 | London, Park Lane no. 0 |
|  | Edward King 1 | 32 | London, Park Lane no. 1 |
|  | Edward King 2 | 32 | London, Park Lane no. 2 |
|  | Edward King 3 | 32 | London, Park Lane no. 3 |
|  | Edward King 4 | 32 | London, Park Lane no. 4 |
|  | Edward King 5 | 32 | London, Park Lane no. 5 |

注意：如果你希望分组的表头拥有固定列的效果，你需要给所有固定列表头都设定好宽度，包括所有的父级节点，否则可能产生错位。

| Name | Attrs |
| Attack | Defend | Speed |
| Physics Attack | Magic Attack |
| name_0 | physicsAttack_0 | magicAttack_0 | defend_0 | speed_0 |
| name_1 | physicsAttack_1 | magicAttack_1 | defend_1 | speed_1 |
| name_2 | physicsAttack_2 | magicAttack_2 | defend_2 | speed_2 |
| name_3 | physicsAttack_3 | magicAttack_3 | defend_3 | speed_3 |
| name_4 | physicsAttack_4 | magicAttack_4 | defend_4 | speed_4 |
| name_5 | physicsAttack_5 | magicAttack_5 | defend_5 | speed_5 |
| name_6 | physicsAttack_6 | magicAttack_6 | defend_6 | speed_6 |
| name_7 | physicsAttack_7 | magicAttack_7 | defend_7 | speed_7 |
| name_8 | physicsAttack_8 | magicAttack_8 | defend_8 | speed_8 |
| name_9 | physicsAttack_9 | magicAttack_9 | defend_9 | speed_9 |

| Name | Age | Address |
| Edward King 5 | 32 | London, Park Lane no. 5 |
| Edward King 6 | 32 | London, Park Lane no. 6 |
| Edward King 7 | 32 | London, Park Lane no. 7 |
| Edward King 8 | 32 | London, Park Lane no. 8 |
| Edward King 9 | 32 | London, Park Lane no. 9 |

| Name | Age | Address |
| John Brown | 32 | New York No. 1 Lake Park |
| Jim Green | 42 | London No. 1 Lake Park |
| Joe Black | 32 | Sidney No. 1 Lake Park |
| Jim Red | 32 | London No. 2 Lake Park |

如果列对象的 sortOrder 属性被设为 'ascend'、'descend' 或者 false，表格的排序将为受控状态。如果很多列的 sortOrder 都被设定了，那么只有他们之中的第一列会生效。

| Name | Age | Address |
| John Brown | 38 | New York No. 1 Lake Park |
| Jim Green | 42 | London No. 1 Lake Park |
| Jim Red | 32 | London No. 2 Lake Park |

如果列对象的 sortOrder 属性被设为 'ascend'、'descend' 或者 false，表格的排序将为受控状态。

如果你只需要 UI 显示多列排序的状态，那么不传 compare 即可。

| Name | Age | Chinese Score | Math Score | English Score |
| John Brown | 32 | 98 | 60 | 70 |
| Jim Green | 42 | 98 | 66 | 89 |
| Joe Black | 32 | 98 | 66 | 89 |
| Jim Red | 32 | 88 | 99 | 89 |

在展示大量数据的时候通过设定 max-height 来固定头部、滚动数据。

| Name | Age | Address |

| Edward King 0 | 32 | London, Park Lane no. 0 |
| Edward King 1 | 32 | London, Park Lane no. 1 |
| Edward King 2 | 32 | London, Park Lane no. 2 |
| Edward King 3 | 32 | London, Park Lane no. 3 |
| Edward King 4 | 32 | London, Park Lane no. 4 |
| Edward King 5 | 32 | London, Park Lane no. 5 |
| Edward King 6 | 32 | London, Park Lane no. 6 |
| Edward King 7 | 32 | London, Park Lane no. 7 |
| Edward King 8 | 32 | London, Park Lane no. 8 |
| Edward King 9 | 32 | London, Park Lane no. 9 |
| Edward King 10 | 32 | London, Park Lane no. 10 |
| Edward King 11 | 32 | London, Park Lane no. 11 |
| Edward King 12 | 32 | London, Park Lane no. 12 |
| Edward King 13 | 32 | London, Park Lane no. 13 |
| Edward King 14 | 32 | London, Park Lane no. 14 |

注意：如果设定了固定的列，你需要同时设定 scroll-x。

|  | Name | Age | Row | Row1 | Row2 | Address |

|  | Edward King 0 | 32 | row 0 | row 0 | row 0 | London, Park Lane no. 0 |
|  | Edward King 1 | 32 | row 1 | row 1 | row 1 | London, Park Lane no. 1 |
|  | Edward King 2 | 32 | row 2 | row 2 | row 2 | London, Park Lane no. 2 |
|  | Edward King 3 | 32 | row 3 | row 3 | row 3 | London, Park Lane no. 3 |
|  | Edward King 4 | 32 | row 4 | row 4 | row 4 | London, Park Lane no. 4 |
|  | Edward King 5 | 32 | row 5 | row 5 | row 5 | London, Park Lane no. 5 |
|  | Edward King 6 | 32 | row 6 | row 6 | row 6 | London, Park Lane no. 6 |
|  | Edward King 7 | 32 | row 7 | row 7 | row 7 | London, Park Lane no. 7 |
|  | Edward King 8 | 32 | row 8 | row 8 | row 8 | London, Park Lane no. 8 |
|  | Edward King 9 | 32 | row 9 | row 9 | row 9 | London, Park Lane no. 9 |

使用 summary 属性渲染总结栏。

|  | Name | Age | Address |
|  | John Brown | 32 | New York No. 1 Lake Park |
|  | Jim Green | 42 | London No. 1 Lake Park |
|  | Joe Black | 32 | Sidney No. 1 Lake Park |
|  | 106 |

通过设定 column.ellipsis 省略单元格内容。

| Name | Age | Address | Another Address |
| John Brown | 32 | New York No. 1 Lake Park | New York No. 1 Lake Park |
| Jim Green | 42 | London No. 1 Lake Park | New York No. 1 Lake Park |
| Joe Black | 32 | Sidney No. 1 Lake Park | New York No. 1 Lake Park |

通过设定 column.ellipsis.tooltip 使得省略内容有弹出提示。column.ellipsis 接受的属性和 n-ellipsis 相同。

| Name | Age | Address | Another Address |
| John Brown | 32 | New York No. 1 Lake Park | New York No. 1 Lake Park |
| Jim Green | 42 | London No. 1 Lake Park | New York No. 1 Lake Park |
| Joe Black | 32 | Sidney No. 1 Lake Park | New York No. 1 Lake Park |

注意：展开行不计入 render 的 index 内

|  |  | # | Name | Age | Address | Tags | Action |
|  |  | 1 | John Brown | 32 | New York No. 1 Lake Park | nicedeveloper | Send Email |
| John Brown is a good guy. |
|  |  | 2 | Jim Green | 42 | London No. 1 Lake Park | wow | Send Email |
|  |  | 3 | Joe Black | 32 | Sidney No. 1 Lake Park | coolteacher | Send Email |
| Joe Black is a good guy. |

| Name | Age | Address |
| John Brown | 32 | New York No. 1 Lake Park |
| Jim Green | 42 | London No. 1 Lake Park |
| Joe Black | 32 | Sidney No. 1 Lake Park |

列：在列对象上设定 className 属性为确定的列设定 class。

| Name | Age | Address |
| John Brown | 32 | New York No. 1 Lake Park |
| Jim Green | 42 | London No. 1 Lake Park |
| Joe Black | 32 | Sidney No. 1 Lake Park |

| column1 | column2 | Column3 |

注意：当 virtual-scroll 为 true 时，rowSpan 将不生效。

|  | Name | Age | Row | Row1 | Row2 | Address |

|  | Edward King 0 | 32 | row 0 | row 0 | row 0 | London, Park Lane no. 0 |
|  | Edward King 1 | 32 | row 1 | row 1 | row 1 | London, Park Lane no. 1 |
|  | Edward King 2 | 32 | row 2 | row 2 | row 2 | London, Park Lane no. 2 |
|  | Edward King 3 | 32 | row 3 | row 3 | row 3 | London, Park Lane no. 3 |
|  | Edward King 4 | 32 | row 4 | row 4 | row 4 | London, Park Lane no. 4 |
|  | Edward King 5 | 32 | row 5 | row 5 | row 5 | London, Park Lane no. 5 |
|  | Edward King 6 | 32 | row 6 | row 6 | row 6 | London, Park Lane no. 6 |
|  | Edward King 7 | 32 | row 7 | row 7 | row 7 | London, Park Lane no. 7 |
|  | Edward King 8 | 32 | row 8 | row 8 | row 8 | London, Park Lane no. 8 |
|  | Edward King 9 | 32 | row 9 | row 9 | row 9 | London, Park Lane no. 9 |
|  | Edward King 10 | 32 | row 10 | row 10 | row 10 | London, Park Lane no. 10 |

如果你有大量行数据和列数据，例如几千行 + 几百列，naive-ui 提供了横向 + 纵向虚拟滚动的功能。

因为横向虚拟滚动的天然的复杂性，对应的配置也会较为复杂，以下多数内容都是必须的：

1. 配置 virtual-scroll 打开纵向虚拟滚动
1. 配置 virtual-scroll-x 打开横向虚拟滚动每一个列都需要配置 width 属性配置 scroll-x 属性，设为所有列的总宽度配置 min-row-height 属性，设为每一行的最小高度，所有的行高度必须比这个值更大配置 height-for-row 属性，用于配置每一行的高度（因为每一行永远只有一部分格子是可见的，因此无法自动求出），如果不配置，每一行的高度会被设为 min-row-height
1. 每一个列都需要配置 width 属性
1. 配置 scroll-x 属性，设为所有列的总宽度
1. 配置 min-row-height 属性，设为每一行的最小高度，所有的行高度必须比这个值更大
1. 配置 height-for-row 属性，用于配置每一行的高度（因为每一行永远只有一部分格子是可见的，因此无法自动求出），如果不配置，每一行的高度会被设为 min-row-height
1. 如有需要，配置 virtual-scroll-header，默认情况下，表头依然会全量渲染以保持兼容性，你可以通过此配置来打开表头的虚拟渲染配置 header-height 属性，设为表头的高度
1. 配置 header-height 属性，设为表头的高度

- 每一个列都需要配置 width 属性
- 配置 scroll-x 属性，设为所有列的总宽度
- 配置 min-row-height 属性，设为每一行的最小高度，所有的行高度必须比这个值更大
- 配置 height-for-row 属性，用于配置每一行的高度（因为每一行永远只有一部分格子是可见的，因此无法自动求出），如果不配置，每一行的高度会被设为 min-row-height

- 配置 header-height 属性，设为表头的高度

下面的例子对应了一个 1000 行 * 1000 列的表格。

naive-ui 的表格可以轻松的支持千万级的表格数据，你在不收钱的组件库不容易找得到这样的功能。

| Col 0 | Col 1 |  | Col 998 | Col 999 |

| 0-0 | 1-0 |  | 998-0 | 999-0 |
| 0-1 | 1-1 |  | 998-1 | 999-1 |
| 0-2 | 1-2 |  | 998-2 | 999-2 |
| 0-3 | 1-3 |  | 998-3 | 999-3 |
| 0-4 | 1-4 |  | 998-4 | 999-4 |
| 0-5 | 1-5 |  | 998-5 | 999-5 |
| 0-6 | 1-6 |  | 998-6 | 999-6 |
| 0-7 | 1-7 |  | 998-7 | 999-7 |

你可以自定义过滤图标、过滤菜单、排序图标、展开图标的样式。

|  | Left🤔 | Right |
|  | 1 | 1 |
|  | 2 | 2 |

在行数据中设定 children 来展示树型数据。如果你想用别的 key 来获取 children，那么可以设定 children-key。

|  | name | index |
|  | 07akioni | 07 |
|  | 08akioni | 08 |
|  | 09akioni | 09 |
|  | 10akioni | 10 |
|  | 11akioni | 11 |

如果你想设定表格的整体高度，你可以在设定好表格高度的情况下设定 flex-height 属性。

|  | Name | Age | Row | Row1 | Row2 | Address |

|  | Edward King 0 | 32 | row 0 | row 0 | row 0 | London, Park Lane no. 0 |
|  | Edward King 1 | 32 | row 1 | row 1 | row 1 | London, Park Lane no. 1 |
|  | Edward King 2 | 32 | row 2 | row 2 | row 2 | London, Park Lane no. 2 |
|  | Edward King 3 | 32 | row 3 | row 3 | row 3 | London, Park Lane no. 3 |
|  | Edward King 4 | 32 | row 4 | row 4 | row 4 | London, Park Lane no. 4 |
|  | Edward King 5 | 32 | row 5 | row 5 | row 5 | London, Park Lane no. 5 |
|  | Edward King 6 | 32 | row 6 | row 6 | row 6 | London, Park Lane no. 6 |
|  | Edward King 7 | 32 | row 7 | row 7 | row 7 | London, Park Lane no. 7 |
|  | Edward King 8 | 32 | row 8 | row 8 | row 8 | London, Park Lane no. 8 |
|  | Edward King 9 | 32 | row 9 | row 9 | row 9 | London, Park Lane no. 9 |

使用 striped 属性渲染条纹，使得表格明暗交替。

|  | Name | Age | Address |
|  | John Brown | 32 | New York No. 1 Lake Park |
|  | Jim Green | 42 | London No. 1 Lake Park |
|  | Joe Black | 32 | Sidney No. 1 Lake Park |

| Name | Age | Address |
|  |  |  |
|  |  |  |
|  |  |  |


```
[
  {
    "key": 0,
    "name": "John Brown",
    "age": "32",
    "address": "New York No. 1 Lake Park"
  },
  {
    "key": 1,
    "name": "Jim Green",
    "age": "42",
    "address": "London No. 1 Lake Park"
  },
  {
    "key": 2,
    "name": "Joe Black",
    "age": "32",
    "address": "Sidney No. 1 Lake Park"
  }
]
| Name | Age | Address |
| John Brown 0 | 30 | New York No. 0 Lake Park |
| John Brown 1 | 25 | New York No. 1 Lake Park |
| John Brown 2 | 18 | New York No. 2 Lake Park |
| John Brown 3 | 25 | New York No. 3 Lake Park |
| John Brown 4 | 23 | New York No. 4 Lake Park |
| John Brown 5 | 37 | New York No. 5 Lake Park |
| John Brown 6 | 5 | New York No. 6 Lake Park |
| John Brown 7 | 20 | New York No. 7 Lake Park |
| John Brown 8 | 31 | New York No. 8 Lake Park |
| John Brown 9 | 3 | New York No. 9 Lake Park |

配合 n-dropdown 实现右键菜单。

| No. | Title | Length |
| 1 | Hello | 3:21 |
| 2 | Roll with It | 3:59 |
| 3 | Wonderwall | 4:18 |
| 4 | Don't Look Back in Anger | 4:48 |
| 5 | Hey Now! | 5:41 |
| 6 | Untitled | 0:44 |
| 7 | Some Might Say | 5:29 |
| 8 | Cast No Shadow | 4:51 |
| 9 | She's Electric | 3:40 |
| 10 | Monring Glory | 5:03 |
| 11 | Untitled | 0:39 |
| 12 | Champagne Supernova | 7:27 |

在 onLoad 回调中更改数据。

|  | Example |
|  | p1 |
|  | p2 |
|  | p3 |

你可以使用 render-cell 去渲染空状态。

| 日期 | 记录 |
| 星期 1 | 未填写 |
| 星期 2 | 未填写 |
| 星期 3 | 未填写 |
| 星期 4 | 未填写 |
| 星期 5 | 未填写 |

你可以用 downloadCsv 方法导出表格数据为 CSV 文件。

如果默认的 CSV 生成逻辑不能满足你的需求，例如 title 使用了渲染函数，或者需要调整每个单元格的数据格式，你可以用 get-csv-header 和 get-csv-cell 属性自定义导出的表头和单元格。

| Name | Age | Address |
| John Brown | 18 | New York No. 1 Lake Park |
| Jim Green | 28 | London No. 1 Lake Park |
| Joe Black | 38 | Sidney No. 1 Lake Park |
| Jim Red | 48 | London No. 2 Lake Park |


## API

### DataTable Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| allow-checking-not-loaded | boolean | false | 是否允许级联勾选还没有完全加载的节点。如果你要用这个属性，请记住 checked-row-keys 可能是不完整的 | 2.28.0 |
| bordered | boolean | true | 是否显示 border |  |
| bottom-bordered | boolean | true | 是否显示 bottom border |  |
| checked-row-keys | Array<string | number> | undefined | 被选中的行的 key |  |
| cascade | boolean | true | 在进行树型数据选择的时候是否级联 |  |
| children-key | string | 'children' | 树形数据下后代节点在数据中的 key |  |
| columns | Array<DataTableColumn> | [] | 需要展示的列 |  |
| data | Array<object> | [] | 需要展示的数据 |  |
| default-checked-row-keys | Array<string | number> | [] | 默认选中的 key 值 |  |
| default-expanded-row-keys | Array<string | number> | [] | 默认展开行的 key 值 |  |
| default-expand-all | boolean | false | 是否默认展开全部可展开的行，不可在异步展开行时使用 | 2.30.4 |
| expanded-row-keys | Array<string | number> | undefined | 展开行的 key 值 |  |
| filter-icon-popover-props | PopoverProps | { trigger: click, placement: bottom } | 过滤按钮的 Popover 属性，属性参考 Popover props | 2.39.0 |
| flex-height | boolean | false | 是否让表格主体的高度自动适应整个表格区域的高度，打开这个选项会让 table-layout 始终为 'fixed' |  |
| get-csv-cell | (value: any, row: object, col: DataTableBaseColumn) => string | undefined | 获取 CSV 的单元格数据 | 2.40.2 |
| get-csv-header | (cols: Array<DataTableColumn>) => string | undefined | 获取 CSV 的 header | 2.40.2 |
| header-height | number | 28 | 在开启 virtual-scroll-header 属性的情况下，表头的高度 | 2.40.0 |
| height-for-row | (rowData: object, index: number) => number | undefined | 每行高度的配置函数，必须配合 virtual-scroll-x 使用，如果不进行配置，每一行的高度会被设为 min-row-height | 2.40.0 |
| indent | number | 16 | 使用树形数据时行内容的缩进 |  |
| loading | boolean | false | 是否显示 loading 状态 |  |
| max-height | number | string | undefined | 表格内容的最大高度，可以是 CSS 属性值 |  |
| min-height | number | string | undefined | 表格内容的最低高度，可以是 CSS 属性值 |  |
| min-row-height | number | 28 | 在开启 virtual-scroll 或 virtual-scroll-x 的情况下，每一行的最小高度，所有的行的高度必须比这个值更大 | 2.40.0 |
| paginate-single-page | boolean | true | 当表格数据只有一页时是否显示分页面 | 2.28.0 |
| pagination | false | object | false | 属性参考 Pagination props |  |
| pagination-behavior-on-filter | 'first' | 'current' | 'current' | 过滤操作后页面的状态，'first' 为回到首页，'current' 为停留在当前页 | 2.28.3 |
| remote | boolean | false | 表格是否自动分页数据，在异步的状况下你可能需要把它设为 true |  |
| render-cell | (value: any, rowData: object, column: DataTableBaseColumn) => VNodeChild | undefined | 自定义单元格渲染，优先级低于列的 render | 2.30.5 |
| render-expand-icon | ({ expanded, rowData }: { expanded: boolean, rowData: object }) => VNodeChild | undefined | 自定义渲染展开图标 | 2.32.2, expanded: 2.34.4, rowData: 2.40.0 |
| row-class-name | string | (rowData: object, index : number) => string | undefined | 每一行上的类名 |  |
| row-key | (rowData: object) => (number | string) | undefined | 通过行数据创建行的 key（如果你不想给每一行加上 key） |  |
| row-props | (rowData: object, rowIndex : number) => HTMLAttributes | undefined | 自定义行属性 |  |
| scroll-x | number | string | undefined | 表格内容的横向宽度，如果列被水平固定了，则需要设定它 |  |
| scrollbar-props | ScrollbarProps | undefined | 属性参考 Scrollbar props，DataTable 中已存在 on-scroll 属性，此处 on-scroll 属性不生效 |  |
| single-column | boolean | false | 是否不设定行的分割线，当参数为true时，则单元格没有下边线 |  |
| single-line | boolean | true | 是否不设定列的分割线，当参数值为 true 时，则单元格没有右边线 |  |
| size | 'small' | 'medium' | 'large' | 'medium' | 表格的尺寸 |  |
| spin-props | { strokeWidth?: number, stroke?: string, scale?: number, radius?: number } | undefined | 表格 spin 的属性 | 2.34.0 |
| sticky-expanded-rows | boolean | false | 展开行是否不随表格横向滚动 | 2.32.2 |
| striped | boolean | false | 是否使用斑马线条纹 |  |
| summary | DataTableCreateSummary | undefined | 表格总结栏的数据，类型见 DataTableCreateSummary Type |  |
| summary-placement | 'top' | 'bottom' | 'bottom' | 总结栏的位置 | 2.33.3 |
| table-layout | 'auto' | 'fixed' | 'auto' | 表格的 table-layout 样式属性，在设定 ellipsis 或 max-height 的情况下固定为 'fixed' |  |
| virtual-scroll | boolean | false | 是否开启虚拟滚动，应对大规模数据，开启前请设定好 max-height。当 virtual-scroll 为 true 时，rowSpan 将不生效 |  |
| virtual-scroll-header | boolean | false | 是否打开表头的虚拟滚动，如果横向列太多，可以考虑打开此属性，打开此属性会导致表头单元格跨行列的功能不可用，同时必须要配置 header-height | 2.40.0 |
| virtual-scroll-x | boolean | false | 是否打开表主体的横向虚拟滚动，如果横向列太多，可以考虑打开此属性，打开此属性会导致单元格跨行列的功能不可用，此属性开启时，必须要和 virtual-scroll、scroll-x、min-row-height、height-for-row、virtual-scroll-header、header-height 属性配合使用，同时每一列必须都配置 width 属性，你可以参考 完整的例子 | 2.40.0 |
| on-load | (rowData: object) => Promise<void> | undefined | 异步展开树形数据的回调 | 2.27.0 |
| on-scroll | (e: Event) => void | undefined | 表格主体滚动的回调 | 2.29.1 |
| on-update:checked-row-keys | (keys: Array<string | number>, rows: object[], meta: { row: object | undefined, action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll' }) => void | undefined | checked-row-keys 值改变时触发的回调函数 | rows 2.30.5, meta 2.33.4 |
| on-update:expanded-row-keys | (keys: Array<string | number>) => void | undefined | expanded-row-keys 值改变时触发的回调函数 |  |
| on-update:filters | (filters: DataTableFilterState, initiatorColumn: DataTableBaseColumn) | undefined | filters 数据改变时触发的回调函数 |  |
| on-update:page | (page: number) | undefined | page 改变时触发的回调函数 |  |
| on-update:page-size | (pageSize: number) => void | undefined | page-size 改变时触发的回调函数 |  |
| on-update:sorter | (options: DataTableSortState | DataTableSortState[] | null) => void | undefined | 如果变动列为多列排序则返回 DataTableSortState[] | null 否则返回 DataTableSortState | null |  |


#### DataTableColumn Properties
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| align | 'left' | 'right' | 'center' | 'left' | 列内的文本排列 |  |
| allowExport | boolean | true | 这一列是否可以导出 | 2.40.0 |
| cellProps | (rowData: object, rowIndex: number) => object | undefined | 该列单元格的 HTML 属性 | 2.27.0 |
| children | DataTableColumn[] | undefined | 成组列头的子节点 |  |
| className | string | undefined | 列的类名 |  |
| colSpan | (rowData: object, rowIndex: number) => number | undefined | 该列单元格的的 col span |  |
| customNextSortOrder | (order: 'descend' | 'ascend' | false) => 'descend' | 'ascend' | false | undefined | 使用这个函数自定义下一个排序的状态 | 2.43.0 |
| defaultFilterOptionValue | string | number | null | null | 非受控状态下默认的过滤器选项值（过滤器单选时生效） |  |
| defaultFilterOptionValues | Array<string | number> | [] | 非受控状态下默认的过滤器选项值（过滤器多选时生效） |  |
| defaultSortOrder | 'descend' | 'ascend' | false | false | 非受控状态下表格默认的排序方式 |  |
| disabled | (rowData: object) => boolean | undefined | 是否禁用 |  |
| ellipsis | boolean | EllipsisProps | false | 文本溢出的设置 |  |
| ellipsis-component | 'ellipsis' | 'performant-ellipsis' | 'ellipsis' | 渲染文本溢出时使用的组件，在 ellipsis 属性为 EllipsisProps 时生效。若为 'ellipsis' 则使用常规的 n-ellipsis 组件渲染，若为 'performant-ellipsis' 则使用 n-performant-ellipsis 渲染，这种情况下会有更高的渲染性能，但是每个折叠的单元格中的组件有可能被重新卸载和挂载 | 2.35.0 |
| expandable | (rowData: object) => boolean | undefined | 行是否可展开，仅在 type 为 'expand' 时生效 |  |
| filter | boolean | (optionValue: string | number, rowData: object) => boolean | 'default' | undefined | 这一列的过滤方法。如果设为 true，表格将只会在这列展示一个排序图标，在异步的时候可能有用。 |  |
| filterMode | 'and' | 'or' | 'or' | 同一列筛选方式为与还是或 |  |
| filterMultiple | boolean | true | 同一列是否可以筛选多个 |  |
| filterOptionValue | string | number | null | undefined | 受控状态下，当前激活的过滤器选项值。如果不做设定，这一列的过滤行为将是非受控的（过滤器单选时生效） |  |
| filterOptionValues | Array<string | number> | null | undefined | 受控状态下，当前激活的过滤器选项值数组。如果不做设定，这一列的过滤行为将是非受控的（过滤器多选时生效） |  |
| filterOptions | Array<{ label: string, value: string | number}> | undefined | filter 的 options 数据 |  |
| fixed | 'left | 'right' | false | false | 该列是否需要 fixed |  |
| key | string | number | undefined | 这一列的 key，不可重复。 |  |
| maxWidth | number | string | undefined | 列的最大宽度，仅在 resizable 为 true 的时候生效 | 2.33.4 |
| minWidth | number | string | undefined | 列的最小宽度 | 2.28.3 |
| multiple | boolean | true | 是否开启多选，仅在 type 为 'selection' 的时候生效 | 2.31.0 |
| options | Array<'all' | 'none' | { label: string, key: string | number, onSelect: (pageData: RowData[]) => void }> | undefined | 自定义选择项的选项，只对 type='selection' 生效 |  |
| render | (rowData: object, rowIndex: number) => VNodeChild | undefined | 渲染函数，渲染这一列的每一行的单元格 |  |
| renderExpand | (rowData: object, rowIndex: number) => VNodeChild | undefined | 展开区域的渲染函数，仅在 type 为 'expand' 的时候生效 |  |
| renderFilter | (options: { active: boolean, show: boolean }) => VNodeChild | undefined | 渲染函数，渲染过滤器触发元素 |  |
| renderFilterIcon | (options: { active: boolean, show: boolean }) => VNodeChild | undefined | 渲染函数，渲染过滤器图标 |  |
| renderFilterMenu | (actions: { hide: () => void }) => VNodeChild | undefined | 渲染函数，渲染这一列的过滤器菜单 |  |
| renderSorter | (options: { order: 'descend' | 'ascend' | false }) => VNodeChild | undefined | 渲染函数，渲染排序触发 | 2.24.2 |
| renderSorterIcon | (options: { order: 'descend' | 'ascend' | false }) => VNodeChild | undefined | 渲染函数，渲染排序图标 | 2.24.2 |
| resizable | boolean | undefined | 列宽是否可以拖动 | 2.33.4 |
| rowSpan | (rowData: object, rowIndex: number) => number | undefined | 该列单元格的 row span |  |
| sortOrder | 'descend' | 'ascend' | false | undefined | 受控状态下表格的排序方式。如果多列都设定了有效值，那么只有第一个会生效 |  |
| sorter | boolean | function | 'default' | undefined | 这一列的排序方法。如果设为 'default' 表格将会使用一个内置的排序函数；如果设为 true，表格将只会在这列展示一个排序图标，在异步的时候可能有用。其他情况下它工作的方式类似 Array.sort 的对比函数 |  |
| title | string | (() => VNodeChild) | undefined | 列的 title 信息，可以是渲染函数 |  |
| titleAlign | 'left' | 'right' | 'center' | 'null' | 表头列对齐方式，若不设置该项，则使用列内的文本排列 | 2.34.4 |
| titleColSpan | number | undefined | title 列占据的列数 |  |
| tree | boolean | false | 是否在这一列展示树形数据的展开按钮 | 2.28.3 |
| type | 'selection' | 'expand' | undefined | 列的类型 |  |
| width | number | string | undefined | 列的宽度（在列固定时是必需的，并且需要为 number 类型） | 2.24.0（string 类型） |

下面的类型可以直接从包中引入。


#### DataTableSortState Type
interface DataTableSortState {
  columnKey: string | number
  sorter: 'default' | function | boolean
  order: 'ascend' | 'descend' | false
}

#### DataTableFilterState Type
interface DataTableFilterState {
  [key: string]: Array<string | number> | string | number | null | undefined
}

#### DataTableCreateSummary Type
type DataTableCreateSummary = (pageData: RowData[]) =>
  | Array<{
    [columnKey: string]: {
      value?: VNodeChild
      colSpan?: number
      rowSpan?: number
    }
  }>
  | {
    [columnKey: string]: {
      value?: VNodeChild
      colSpan?: number
      rowSpan?: number
    }
  }

### DataTable Methods
这些方法可以帮助你在非受控的状态下改变表格，但是，并不推荐在异步的状况下使用这些方法。如果需要异步操作，最好用受控的方式使用表格。

| 名称 | 类型 | 说明 | 版本 |
| clearFilters | () => void | 清空所有的 filter 状态 |  |
| clearSorter | () => void | 清空所有的 sort 状态 |  |
| downloadCsv | (options?: { fileName?: string, keepOriginalData?: boolean }) => void | 下载 CSV | 2.37.0 |
| filters | (filters: DataTableFilterState | null) => void | 设定表格当前的过滤器 |  |
| page | (page: number) => void | 手动设置 page |  |
| scrollTo | (options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void | 滚动内容 | 2.30.4 |
| sort | (columnKey: string | number | null, order: 'ascend' | 'descend' | false) => void | 设定表格的过滤状态 |  |


### DataTable Slots
| 名称 | 参数 | 说明 | 版本 |
| empty | () | 表格数据为空时的展示 |  |
| loading | () | 表格 loading 时的展示 | 2.34.0 |