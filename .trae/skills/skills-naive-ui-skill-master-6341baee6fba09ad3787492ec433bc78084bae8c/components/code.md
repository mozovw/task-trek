# 代码

# 代码 Code


# 代码 Code

## 预备条件
下面的代码展示了如何为 Code 设定 hljs。比较推荐的方式是按需引入，因为它可以极大地减小打包尺寸。


```
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  hljs.registerLanguage('javascript', javascript)

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>

## 演示
JavaScript、Python、C++ 的例子。

function sleep (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
def say_hello():
    print('Hello Naive UI')
int main () {
  std::cout << "Hello Naive UI";
  return 0;
}
code 可以在溢出时自动换行。

function padEnd(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)? (string + createPadding(length - strLength, chars)): (string || '')
}
JavaScript 的例子。

可以在代码块左侧显示行号。

1
2
3
4
5
6
7
8
9
10
11
12
13
14
#include <bits/stdc++.h>
using namespace std;

int main() {
  cout <<"你" << endl;
  cout <<"觉" << endl;
  cout <<"得" << endl;
  cout <<"恨" << endl;
  cout <<"却" << endl;
  cout <<"离" << endl;
  cout <<"不" << endl;
  cout <<"开" << endl;
  return 0;
}

## API

### Code Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| code | string | '' | 传入的 code 字符串 |  |
| inline | boolean | false | 使用行内样式 |  |
| hljs | Object | undefined | 如果你想局部设定 hljs，可以通过这个属性传给组件 |  |
| language | string | undefined | 代码在 highlightjs 中的语言 |  |
| show-line-numbers | boolean | false | 是否显示行号，在 inline 或 word-wrap 的情况下不生效 | 2.32.0 |
| trim | boolean | true | 是否显示 trim 后的代码 |  |
| word-wrap | boolean | false | 代码过长时是否自动换行 | 2.24.0 |