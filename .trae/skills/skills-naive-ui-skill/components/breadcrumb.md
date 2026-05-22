# 面包屑

# 面包屑 Breadcrumb


# 面包屑 Breadcrumb
这东西长得和它名字不怎么像。


## 演示
- 北京总行 /
- 天津分行 /
- 平山道支行 /

使用 separator prop 自定义分隔符。

- 北京总行 >
- 天津分行 >
- 平山道支行 >

和下拉菜单一起使用。

- I'm ok /
- I'm ok /

使用 separator prop 或 separator slot 自定义每一项的分隔符。如果二者均提供，将优先使用 separator slot。

- 北京总行 >
- 天津分行 ~
- 平山道支行 /


## API

### Breadcrumb Props
| 名称 | 类型 | 默认值 | 说明 |
| separator | string | '/' | 面包屑之间的分隔符 |


### BreadcrumbItem Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| clickable | boolean | true | 是否可点击 | 2.30.0 |
| href | string | undefined | 链接地址 |  |
| separator | string | '/' | 面包屑子项之间的分隔符 | 2.44.0 |
| show-separator | boolean | true | 是否显示分隔符 |  |


### Breadcrumb Slots
| 名称 | 参数 | 说明 |
| default | () | Breadcrumb 默认填充的内容 |


### Breadcrumb Item Slots
| 名称 | 参数 | 说明 |
| default | () | BreadcrumbItem 默认填充的内容 |
| separator | () | 分隔符填充的内容 |