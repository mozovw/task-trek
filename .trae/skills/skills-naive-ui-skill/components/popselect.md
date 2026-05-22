# 弹出选择

# 弹出选择 Popselect


# 弹出选择 Popselect
如果你想选择一些数据，还不想看到那个框子，可以使用 Popselect。


## 演示
有人要在选择菜单里用插槽吗？

在弹出选择选中多个值。


## API

### Popselect Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| multiple | boolean | false | 是否为多选 |  |
| node-props | (option: SelectOption | SelectGroupOption) => object | undefined | 选项的 DOM 属性生成函数 | 2.30.4 |
| options | Array<SelectOption | SelectGroupOption> | [] | 配置选项内容，详情参考 Select |  |
| scrollable | boolean | false | 选择菜单是否可滚动 |  |
| scrollbar-props | ScrollbarProps | undefined | 属性参考 Scrollbar props | 2.44.0 |
| render-label | (option: SelectOption | SelectGroupOption) => VNodeChild | undefined | 控制全部选项的渲染 |  |
| size | 'small' | 'medium' | 'large' | 'medium' | 组件尺寸 |  |
| value | string | number | Array<string | number> | null | null | 受控模式下的值 |  |
| virtual-scroll | boolean | false | 是否启用虚拟滚动 | 2.30.4 |
| on-update:value | (value: string | number | Array<string | number> | null, option: SelectBaseOption | null | Array<SelectBaseOption>) => void | undefined | 值更新的回调 |  |

对于 SelectOption & SelectGroupOption，参考 Select

对于其他 props，参考 Popover


### Popselect Slots
| 名称 | 参数 | 说明 | 版本 |
| header | () | 菜单头部区域的 slot | 2.36.0 |
| action | () | 菜单操作区域的 slot | 2.22.0 |
| empty | () | 菜单无数据时的 slot | 2.22.0 |