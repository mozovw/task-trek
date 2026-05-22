# 水印

# 水印 Watermark


# 水印 Watermark
出现在钱上的时候比较可爱。


## 演示
| 复盘 | 赋能 | 协同 | ... | 串联 |
| 拉通 | 打通 | 树立 | ... | 履约 |
| ... | ... | ... | ... | ... |

可以打开全屏，这样显得很专业。

放点图。

记得注意图像 URL 的跨域设置，这会影响图片是否能正常显示。

自 2.38.2 起，支持由 \n 分割的多行文本。

水印支持显示多行文本内容。

| 复盘 | 赋能 | 协同 | ... | 串联 |
| 拉通 | 打通 | 树立 | ... | 履约 |
| ... | ... | ... | ... | ... |

通过配置自定义参数来预览水印效果。


#### 底层逻辑是打通信息屏障，创建行业新生态。顶层设计时聚焦用户感知赛道，通过差异化和颗粒度达到引爆点。交付价值是在垂直领域采取复用大发达成持久收益。抽离透传归因分析作为抓手为产品赋能，体验度量作为闭环的评判标准。亮点是载体，优势是链路。思考整个生命周期，完善逻辑考虑资源倾斜。方法论是组合拳达到平台化标准。
| 复盘 | 赋能 | 协同 | ... | 串联 |
| 拉通 | 打通 | 树立 | ... | 履约 |
| ... | ... | ... | ... | ... |


## API

### Watermark Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| content | string | undefined | 水印文本 | 2.25.3，自 2.38.2 支持多行文本 |
| cross | boolean | false | 是否跨越边界显示 | 2.25.3 |
| debug | boolean | false | 是否显示调试信息 | 2.25.3 |
| font-size | number | 14 | 字体大小 | 2.25.3 |
| font-family | string | undefined | 字体族 | 2.25.3 |
| font-style | 'normal' | 'italic' | `oblique ${number}deg` | normal | 字体风格 | 2.25.3 |
| font-variant | string | '' | 字型 | 2.25.3 |
| font-weight | number | 400 | 字重 | 2.25.3 |
| font-color | string | rgba(128, 128, 128, .3) | 字体颜色 | 2.25.3 |
| fullscreen | boolean | false | 是否展示全屏 | 2.25.3 |
| global-rotate | number | 0 | 水印整体的旋转 | 2.32.0 |
| line-height | number | 14 | 行高 | 2.25.3 |
| height | number | 32 | 高度 | 2.25.3 |
| image | string | undefined | 图片路径 | 2.25.3 |
| image-height | number | undefined | 图片高度 | 2.25.3 |
| image-opacity | number | 1 | 图片不透明度 | 2.25.3 |
| image-width | number | undefined | 图片宽度 | 2.25.3 |
| rotate | number | 0 | 旋转角度 | 2.25.3 |
| selectable | boolean | true | 被水印覆盖的内容是否可选中 | 2.25.3 |
| text-align | 'left' | 'center' | 'right' | 'left' | 在文本有多行的情况下，多行文本的对齐方式 | 2.38.2 |
| width | number | 32 | 宽度 | 2.25.3 |
| x-gap | number | 0 | x 轴间隔 | 2.25.3 |
| x-offset | number | 0 | x 轴偏移 | 2.25.3 |
| y-gap | number | 0 | y 轴间隔 | 2.25.3 |
| y-offset | number | 0 | y 轴偏移 | 2.25.3 |
| z-index | number | 10 | z 轴高度 | 2.25.3 |


### Watermark Slots
| 名称 | 参数 | 说明 | 版本 |
| default | () | 水印覆盖的内容 | 2.25.3 |