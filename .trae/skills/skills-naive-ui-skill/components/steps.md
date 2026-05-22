# 步骤

# 步骤 Steps


# 步骤 Steps
1、2、3...成了！


## 演示
有 small 和 medium 大小。

Al through the day, I me mine I me mine, I me mine

When I find myself in times of trouble Mother Mary comes to me

Here come old flat top He come grooving up slowly

Something in the way she moves Attracts me like no other lover

可以定制 'finish' 和 'error' 状态下的图标和每一步的图标。

当设定 @update:current 时，可以通过点击切换步骤。


## API

### Steps Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| content-placement | 'right' | 'bottom' | right | 步骤条内容位置，仅在横向模式下生效 | 2.43.2 |
| current | number | undefined | 当前选中在第几步 |  |
| size | 'small' | 'medium' | 'medium' | 步骤条大小 |  |
| status | 'process' | 'finish' | 'error' | 'wait' | 'process' | 步骤条状态 |  |
| vertical | boolean | false | 步骤条方向 |  |
| on-update:current | (index: number) => void | undefined | 更新当前第几步的回调，设定后可点击切换步骤 | 2.29.1 |


### Step Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| description | string | undefined | 节点描述 |  |
| disabled | boolean | false | 是否可点击 | 2.29.1 |
| status | 'process' | 'finish' | 'error' | 'wait' | undefined | 节点状态 |  |
| title | string | undefined | 节点标题 |  |


### Steps Slots
| 名称 | 参数 | 说明 |
| default | () | 步骤条内容 |
| finish-icon | () | 'finish' 状态按钮配置 |
| error-icon | () | 'error' 状态按钮配置 |


### Step Slots
| 名称 | 参数 | 说明 | 版本 |
| default | () | 步骤节点内容 |  |
| icon | () | 步骤节点图标 | 2.26.1 |
| title | () | 步骤节点标题 |  |