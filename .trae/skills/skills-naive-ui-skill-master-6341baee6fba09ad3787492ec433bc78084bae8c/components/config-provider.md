# 全局化配置

# 全局化配置 Config Provider


# 全局化配置 Config Provider
全局化配置设置内部组件的主题、语言和组件卸载于其他位置的 DOM 的类名。

了解更多关于主题设定的信息，参见调整主题。


## 演示
设置 n-config-provider 内部组件的主题。

如果不设置 n-config-provider 的主题，则 n-config-provider 主题默认继承外面的主题。

naive-ui 默认情况下使用 inline style 作为主题变量的载体，因此每个组件上都会挂载许多 inline CSS。如果你需要 SSR，或者想让开发者工具看起来更干净，可以打开 inline-theme-disabled 属性。

注意，如果你需要频繁的改动 theme-overrides，不建议使用这个属性，这样会生成大量无用的 style 标签。

这个属性不是响应式的。

组件的一部分是挂载在 document.body 上的。如需给这些可卸载的元素添加 class，使用 n-config-provider 的 namespace 属性。打开开发者工具可以看到被卸载的 DOM。

Naive UI 提供 useOsTheme 来获取当前操作系统的主题。

如果不需要包裹 DOM，设置 abstract。

通过 component-options 按组件配置尺寸。


## API

### ConfigProvider Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| abstract | boolean | false | 是否不存在 DOM 包裹 |  |
| breakpoints | { [k: string]: number } | { xs: <640, s: ≥640, m: ≥1024, l: ≥1280, xl: ≥1536, xxl: ≥1920 } | 屏幕响应式断点，对 n-grid 生效。这个属性不是响应式的，你需要在组件第一次挂载时就设定好 |  |
| cls-prefix | string | undefined | 内部所有组件的类的前缀。（从 2.40.0 开始）如果不设置 n-config-provider 的类前缀 cls-prefix，则默认继承父级的类前缀。注意，该属性不是响应式的。 |  |
| component-options | GlobalComponentConfig | undefined | 全局组件配置项。一些属性可以按组件维度分别配置。为 undefined 时会继承上级 n-config-provider |  |
| date-locale | DateLocale | null | undefined | 对后代组件生效的日期语言对象，为 null 时会使用默认 dateEnUS，为 undefined 时会继承上级 n-config-provider |  |
| inline-theme-disabled | boolean | false | 是否禁用 inline css 主题变量，如果你不会频繁调整主题变量，并且需要 SSR 或者想让 devtools 看起来更干净，可以打开这个选项。注意，这个属性不是响应式的 | 2.26.0 |
| katex | object | undefined | 公式组件需要的 katex 对象 | 2.34.0 |
| locale | Locale | null | undefined | 对后代组件生效的语言对象，为 null 时会使用默认 enUS，为 undefined 时会继承上级 n-config-provider |  |
| namespace | string | undefined | n-config-provider 内部组件被卸载于其他位置的 DOM 的类名 |  |
| preflight-style-disabled | boolean | false | 是否禁用默认样式，如果你禁用了它，便可以完全控制全局样式。你也可以使用 n-global-style 去挂载全局样式（推荐，样式是响应式的） | 2.29.0 |
| style-mount-target | ParentNode | undefined | 组件样式的挂载位置。注意，该属性不是响应式的。 | 2.40.0 |
| tag | string | 'div' | n-config-provider 被渲染成的元素 |  |
| theme | Theme | null | undefined | 对后代组件生效的主题对象，为 null 时会使用默认亮色，为 undefined 时会继承上级 n-config-provider。更多信息参见调整主题 |  |
| theme-overrides | ThemeOverrides | null | undefined | 对后代组件生效的主题变量覆盖，为 null 时会清除全部覆盖变量，为 undefined 时会继承上级 n-config-provider。更多信息参见调整主题 |  |


#### GlobalComponentConfig 类型

```
interface GlobalComponentConfig {
  AutoComplete?: {
    size?: AutoCompleteSize
  }
  Button?: {
    size?: ButtonSize
  }
  Card?: {
    size?: CardSize
  }
  Cascader?: {
    size?: CascaderSize
    renderEmpty?: () => VNodeChild
  }
  Checkbox?: {
    size?: CheckboxSize
  }
  ColorPicker?: {
    size?: ColorPickerSize
  }
  DataTable?: {
    size?: DataTableSize
    renderFilter?: DataTableRenderFilter
    renderSorter?: DataTableRenderSorter
    renderEmpty?: () => VNodeChild
  }
  DatePicker?: {
    size?: DatePickerSize
    timePickerSize?: TimePickerSize
  }
  Descriptions?: {
    size?: DescriptionsSize
  }
  Dialog?: {
    iconPlacement?: IconPlacement
  }
  Dropdown?: {
    size?: DropdownSize
  }
  DynamicInput?: {
    buttonSize?: ButtonSize
  }
  DynamicTags?: {
    size?: DynamicTagsSize
  }
  Empty?: Pick<EmptyProps, 'description' | 'renderIcon'>
  Form?: {
    size?: FormSize
  }
  Input?: {
    size?: InputSize
  }
  InputNumber?: {
    size?: InputNumberSize
  }
  InputOtp?: {
    size?: InputOtpSize
  }
  Mention?: {
    size?: MentionSize
  }
  Pagination?: {
    size?: PaginationSize
    inputSize?: InputSize
    selectSize?: SelectSize
  }
  Popselect?: {
    size?: PopselectSize
  }
  Radio?: {
    size?: RadioSize
  }
  Rate?: {
    size?: RateSize
  }
  Result?: {
    size?: ResultSize
  }
  Select?: {
    size?: SelectSize
    renderEmpty?: () => VNodeChild
  }
  Skeleton?: {
    size?: SkeletonSize
  }
  Space?: {
    size?: SpaceSize
  }
  Switch?: {
    size?: SwitchSize
  }
  Table?: {
    size?: TableSize
  }
  Tabs?: {
    size?: TabsSize
  }
  Tag?: {
    size?: TagSize
  }
  TimePicker?: {
    size?: TimePickerSize
  }
  Transfer?: {
    size?: TransferSize
    renderEmpty?: () => VNodeChild
  }
  Tree?: {
    renderEmpty?: () => VNodeChild
  }
  TreeSelect?: {
    size?: TreeSelectSize
    renderEmpty?: () => VNodeChild
  }
}