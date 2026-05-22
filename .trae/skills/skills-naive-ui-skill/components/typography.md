# 排印

# 排印 Typography


# 排印 Typography
Naive UI 提供了常用 HTML 标签的一些基本样式，以及对文本渲染提供帮助的组件。

排印是一门艺术。


## 演示
Header 不光是 Header。你知道 UI 一般很喜欢在 Header 旁边弄一个带颜色的竖条（确实，光有文字太单调了）。所以这它可以有个条。


# sin(x)

# sin(x)

# sin(x)

# sin(x)

# sin(x)

# sin(x)

# sin(x)

## cos(x)

## cos(x)

## cos(x)

### -sin(x)

### -sin(x)

### -sin(x)

#### -cos(x)

#### -cos(x)

#### -cos(x)
用不同类型的文本展示各种信息。

其他的 Naive UI 内置标签。


# h1 标签
《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。


## h2 标签
《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。


### h3 标签
《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。


#### h4 标签
《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。

《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。

《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。

- li 标签
- li 标签
- li 标签

1. li 标签
1. li 标签
1. li 标签

- li 标签
- li 标签
- li 标签

1. li 标签
1. li 标签
1. li 标签

有的时候会需要让 <n-a /> 具有 router-link 的功能。

如果你觉得写起来很麻烦，可以再封装一个组件。


## API

### Text Props
| 名称 | 类型 | 默认值 | 说明 |
| type | 'default' | 'success' | 'info' | 'warning' | 'error' | 'default' | 排印类型 |
| strong | boolean | false | 粗体 |
| italic | boolean | false | 斜体 |
| underline | boolean | false | 文字下划线 |
| delete | boolean | false | 文字删除线 |
| code | boolean | false | 代码模式 |
| depth | 1 | 2 | 3 | '1' | '2' | '3' | undefined | 文字深度 |
| tag | string | undefined | 需要被渲染为什么标签，在 code 和 del 设定的情况下不生效 |


### P Props
| 名称 | 类型 | 默认值 | 说明 |
| depth | 1 | 2 | 3 | '1' | '2' | '3' | undefined | 文字深度 |


### H1, H2, H3, H4, H5, H6 Props
| 名称 | 类型 | 默认值 | 说明 |
| align-text | boolean | false | 文本对齐 |
| type | 'default' | 'success' | 'info' | 'warning' | 'error' | 'default' | 排印类型 |
| prefix | 'bar' | undefined | 在字首显示条块 |


### Ul, Ol Props
| 名称 | 类型 | 默认值 | 说明 |
| align-text | boolean | false | 文本对齐 |


### Blockquote Props
| 名称 | 类型 | 默认值 | 说明 |
| align-text | boolean | false | 文本对齐 |


### All Typography Components Slots
| 名称 | 参数 | 说明 |
| default | () | 排印的内容 |