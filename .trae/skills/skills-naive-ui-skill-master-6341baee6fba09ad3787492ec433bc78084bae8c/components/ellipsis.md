# 文本省略

# 文本省略 Ellipsis


# 文本省略 Ellipsis
复杂度不会消失，只会转移。

当你听到一些人对于精致的概念模型侃侃而谈，请保持清醒。


## 演示
带弹出提示基本的单行省略。

使用 expand-trigger="click" 搭配 line-clamp 参数可以实现点击缩略文本展开完整文本的功能。

通常情况下，普通的省略已经能满足性能需求，但是在大量渲染的情况下，你可以使用 n-performant-ellipsis 来替代普通的 n-ellipsis。它具备更好的性能，但是也存在一些问题：内部的组件有可能被卸载再重新挂载，所以请谨慎使用。

naive-ui 提供基于 -webkit-line-clamp 的多行省略。兼容性参见 caniuse。

使用 tooltip slot 定制 tooltip 内容。


## API

### Ellipsis, PerformantEllipsis Props
n-performant-ellipsis 从 2.35.0 开始提供。

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| expand-trigger | 'click' | undefined | 展开的触发方式 | 2.1.0 |
| line-clamp | number | string | undefined | 最大行数 | 2.1.0 |
| tooltip | boolean | TooltipProps | true | Tooltip 的属性 | 2.1.0 |


### Ellipsis Slots
| 名称 | 参数 | 说明 |
| default | () | 文本省略的内容 |
| tooltip | () | tooltip 的内容 |