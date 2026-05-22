# 固钉

# 固钉 Affix


# 固钉 Affix
Affix 可以让内容在页面滚动的时候固定在一个位置，它和 position: sticky 有那么点像不过可以做更多事。


## 演示
Affix 有 trigger-top、top、trigger-bottom 和 bottom 属性。trigger-top 是顶部固定的触发距离，top 是在触发顶部固定之后 CSS 的 top 值。trigger-bottom 和 bottom 类似。

Affix 可以 absolute 或者 fixed 定位。你可能还需要写一些额外的 CSS 才能让达到例子的效果。 默认情况下位置是 fixed，因为大多数情况下，滚动的元素是 document。


## API

### Affix Props
| 名称 | 类型 | 默认值 | 描述 |
| bottom | number | undefined | 在触发底部固定后 Affix 的 CSS bottom 属性（如果没设定，会使用 trigger-bottom 代替) |
| listen-to | string | HTMLElement | Document | Window | (() => HTMLElement) | document | 需要监听滚动的元素 |
| trigger-bottom | number | undefined | 触发底部固定时，Affix 和目标元素元素的底部距离（如果没设定，会使用 bottom 代替) |
| trigger-top | number | undefined | 触发顶部固定时，Affix 和目标元素元素的顶部距离（如果没设定，会使用 top 代替) |
| position | 'fixed' | 'absolute' | 'fixed' | Affix 的 CSS position |
| top | number | undefined | 在触发顶部固定后 Affix 的 CSS top 属性（如果没设定，会使用 trigger-top 代替) |