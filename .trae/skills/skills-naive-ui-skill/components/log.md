# 日志

# 日志 Log


# 日志 Log
如果你有一些日志要展示，可以使用 Log。

在本页如何高亮的演示中，我们定义了一个叫做 naive-log 的语言来高亮全部的数字。下面的代码是我们怎么定义的。如果你想了解 highlight.js，可以参考 highlight.js 和 highlight.js developer documentation


```
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'

  hljs.registerLanguage('naive-log', () => ({
    contains: [
      {
        className: 'number',
        begin: /\d+/
      }
    ]
  }))

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>

## 演示
使用 rows 来设定 Log 的尺寸。

1
2
3
4
5
6
Log 有 require-more、reach-top 和 reach-bottom 事件。需要注意的是即使 Log 已经滚到了头或者尾，你继续滚动鼠标的时候，require-more 还是会被触发，而 reach-xxx 并不会。如果你不需要这种特性，可以使用 reach-top 或者 reach-bottom。

0.a7184225d4ae
0.b40f398bff4d9
0.39f93991fc711
0.b33d859d547ad
0.c486b29944b578
0.98ff8ccf532248
0.b3c281c16d6138
0.b33b41bf05332
0.31a0606bafbeb8
0.beadbe7cd0be9
你可以很简单的让 Log 滚到顶部或者底部。同时你可以控制这个滚动操作是否发出事件。

0.a2a2bacb0cbbb
0.5c4fd710b66d7
0.a77323a4342748
0.df1507182bbfa
0.08fc505ab28e38
0.90f5f70de072a
0.7972a5e11585b8
0.ce07c85aad9598
0.98b09e87273af8
0.3f674af77db6b
在你使用高亮之前，请看本页开始的注意事项，那些对于确保这个例子按预期展示是很重要的。

0.fff49653832a6
0.94c78857745de
0.85833bdf9d2b9
0.8ffa7ebf8198d8
0.f76b3de627ec78
0.bf651b70632128
0.5ad552dad945b8
0.a4146873c7f9b
0.27ade1435ddfb
0.6afeb7d2bcfac
0.e45b3cc1eecd98
0.01fc756d3f389
0.02f7c0352ccd2
0.0ef2bdebeee2d
0.a239eeab75d1a8
0.b203e3c97ef888
0.49da0753dfc0c8
0.19f29b0476812
0.fb3a1849c2d16
0.4e8694d67a49d8
0.3812a7ba8bff2
0.b6e8e16539968
0.8651d5d108d648
0.09dd4764d7aa9
0.e44587be952f9
0.09bbfaa128bd4
0.3ac839ae5c1888
0.26b17322d5237
0.e33985eda0451
0.b09532080a9cc
0.752dd6f0a42ac8
0.2b98114e0263e
0.d11a1d491f20e8
0.e754deb360499
0.7fb895cb03412
0.64590c67fa345
0.16ef0c5d964e
0.91af7f791835f
0.604729ebb22b18
0.6dd5c23d8400e8
0.3e28a35633f288
0.3ab7312ad57028
0.d154636954393
0.51124f86fa6
0.0f38c320f64df
0.f334a7d5df55e8
0.dca8a7ed5a621
0.d2820bb1cc1e58
0.acbffb5231c6c
0.87b0989719e07
0.c685a64f2a0f3
0.9a7e867aa4ce78
0.19e3a39c2a45a8
0.0423791685b868
0.7245790f932c68
0.785b501473521
0.08563c1c813808
0.c25479bc5688e
0.358c813734b8a
0.2d680f81df82c
0.5c3f8335b79e6
0.c8a9f15b5cb6
0.38438467c61898
0.8b997ac800ddf8
0.427971e6279b98
0.9aad11c859fa2
0.87714c9e78d018
0.008033b8781ea
0.805f37ef5fd6a
0.46df7e6dfe939
0.cfa8bfcd30c488
0.332efcaad95f88
0.2dcac29cb7e6d8
0.f4590c137bf0f8
0.593906e913a8a
0.095789190d4878
0.a0ca39e2a7df48
0.6298b8654bc8c8
0.12f5685a8df1d8
0.44b4a0a330157
当日志不断增加时总是滚动到最新。

0.4a8d35d15c4e7
0.9409bd13928a
0.5cbfe02986b588
0.6d94bf554510f
0.239a21a4b5e21
0.a64fbfdf9483d
0.8786da8d1e08b
0.e5fcde184a93c
0.a8341d14740d
0.55a21f984afe68
0.784a3891c7be18
0.421c6dbef6805
0.04edeab5d6a0c
0.cd05b9df581768
0.cf9a9ff0d23a98
0.5ff766c6c5058
0.4d9e81859ae1f
0.a2b2b75de6955
0.9622cc801c1bf8
0.73df9b049ef888
0.f6b2a24cfc28f8
0.ed3ab29c0f5b4
0.5fad0372b22b88
0.e14c451dd40a5
0.6b9bf624062d48
0.390d00f4858ad8
0.78c3e1a5a2579
0.bc718105756d9
0.4650a7fd362ce
0.62ba6a3645ef7
0.aa9efad2a2a2a8
0.e2aa7735748ae8
0.92810eb6ebb0e8
0.dc8a2e129581e8
0.4e500fe98a9b5
0.d4bc6cf6130f98
0.9e9457f2afa068
0.4d612ef90b2e
0.87faeb379bd3e8
0.3ba18dfe0fa6f8

## API

### Log Props
| 名称 | 类型 | 默认值 | 说明 |
| font-size | number | 14 | 文字大小 |
| hljs | Object | undefined | 如果你想局部设定 hljs ，可以通过这个属性传给组件 |
| language | string | undefined | 日志在 highlightjs 中的语言 |
| line-height | number | 1.25 | 行高 |
| lines | Array<string> | undefined | 按行显示日志内容，在同时存在 log 参数时，该参数无效 |
| loading | boolean | false | 是否显示加载中 |
| log | string | undefined | 日志的内容 |
| rows | number | 15 | 日志的尺寸 |
| spin-props | { strokeWidth?: number, stroke?: string, scale?: number, radius?: number } | undefined | 加载图标的属性 |
| trim | boolean | false | 是否显示 trim 后的日志 |
| on-require-more | (from: 'top' | 'bottom') => void | undefined | 滚动加载日志的回调函数 |
| on-reach-top | () => void | undefined | 滚动到顶部的回调函数 |
| on-reach-bottom | () => void | undefined | 滚动到底部的回调函数 |


### Log Methods
| 名称 | 参数 | 说明 |
| scrollTo | (options: { top?: number, position?: 'top' | 'bottom', silent?: boolean }) | 滚动事件的回调函数 |