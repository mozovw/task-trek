# 时间

# 时间 Time


# 时间 Time
Time 提供一些基本的时间格式化功能。


## 演示
格式化时间， 详尽文档请查看 date-fns format。

使用 Unix 时间戳作为时间。

date、datetime 或者 relative。

时间组件使用 date-fns 的 formatDistanceStrict 格式化相对时间。

如果你对于显示没有很多定制化的要求，这个一般够用了。


## API

### Time Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| format | string | undefined | 时间格式化字符串，详情见 format |  |
| time | number | Date | Date.now() | 时间 |  |
| time-zone | string | undefined | 格式化值时使用的时区，遵循 iana time zones 格式。你可以使用 Intl.supportedValuesOf('timeZone') 来查看支持的时区 | 2.30.0 |
| to | number | Date | Date.now() | 目标时间 |  |
| type | 'relative' | 'date' | 'datetime' | 'datetime' | 时间类型 |  |
| unix | boolean | false | unix 时间戳 |  |