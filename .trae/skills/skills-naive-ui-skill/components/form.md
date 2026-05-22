# 表单

# 表单 Form


# 表单 Form
收集、验证信息。


## 演示
一个行内表单的例子。


```
{
  "user": {
    "name": "",
    "age": ""
  },
  "phone": ""
}
有时候内置的 trigger 无法满足验证的需要。你可以通过设定自定的 trigger 然后手动触发它来控制验证。

{
  "age": null,
  "password": null,
  "reenteredPassword": null
}
你可能需要对可能异常的值向用户显示警告，但是不希望 validate 方法抛出异常， 这种情况下 FormItemRule 的 level 属性可以帮到你（level: 'warning'）。

你可能需要自定义验证的时机和效果，使用 validation-status 和 feedback 来控制表项的验证效果。在这种情况下通常不需要提供 path。

表单的规则支持 renderMessage，你可以利用它来完成验证信息的国际化。

使用 n-grid 和 n-form-item-gi（grid item）轻松写表单。

{
  "inputValue": null,
  "textareaValue": null,
  "selectValue": null,
  "multipleSelectValue": null,
  "datetimeValue": null,
  "nestedValue": {
    "path1": null,
    "path2": null
  },
  "switchValue": false,
  "checkboxGroupValue": null,
  "radioGroupValue": null,
  "radioButtonGroupValue": null,
  "inputNumberValue": null,
  "timePickerValue": null,
  "sliderValue": 0,
  "transferValue": null
}
{
  "inputValue": null,
  "textareaValue": null,
  "selectValue": null,
  "multipleSelectValue": null,
  "datetimeValue": null,
  "nestedValue": {
    "path1": null,
    "path2": null
  },
  "switchValue": false,
  "checkboxGroupValue": null,
  "radioGroupValue": null,
  "radioButtonGroupValue": null,
  "inputNumberValue": null,
  "timePickerValue": null,
  "sliderValue": 0,
  "transferValue": null
}
你可以单独使用 n-form-item，不在 n-form 中验证表项。

{
  "user": {
    "name": "name",
    "age": "15",
    "address": "0"
  },
  "phone": "1251550092"
}
若 show-label 在 n-form-item 上未被设定，则会继承 n-form 的 show-label，默认为 true。

在验证的过程中，你可能并不总想验证全部的表单项，你可以使用 form.validate 的第二个参数控制应用的规则。

你可以自定义 async-validator 的默认验证信息，不过考虑这个信息和代码耦合很严重，估计对于中文的页面没什么价值。

{
  "user": {
    "name": ""
  }
}
动态增加、删除表单项。

使用 feedback-style 和 feedback-class 可以自定义反馈信息的样式。


## API

### Form Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| disabled | boolean | false | 是否禁用 |  |
| inline | boolean | false | 是否展示为行内表单 |  |
| label-width | number | string | 'auto' | undefined | 标签的宽度，在 label-placement 是 'left' 的时候可能会有用，'auto' 意味着 label width 会被自动调整 |  |
| label-align | 'left' | 'right' | - | 标签的文本对齐方式 |  |
| label-placement | 'left' | 'top' | 'top' | 标签显示的位置 |  |
| model | Object | {} | 获取表项中收集到的值的对象 |  |
| rules | type FormRules = { [itemValidatePath: string]: FormItemRule | Array<FormItemRule> | FormRules } | {} | 验证表项的规则 |  |
| show-feedback | boolean | true | 是否展示校验反馈 |  |
| show-label | boolean | true | 是否展示标签 |  |
| show-require-mark | boolean | - | 是否展示必填的星号 |  |
| require-mark-placement | 'left' | 'right' | 'right-hanging' | 'right' | 必填星号的位置 | 'right-hanging' 2.24.0 |
| size | 'small' | 'medium' | 'large' | 'medium' | 尺寸 |  |
| validate-messages | FormValidateMessages | undefined | async-validator 的默认验证信息 | 2.27.0 |


#### FormItemRule Type
| 属性 | 类型 | 默认值 | 说明 | 版本 |
| asyncValidator | (rule: FormItemRule, value: any, callback: (error?: Error) => void) => void | undefined | 异步校验，支持定义回调函数 |  |
| key | string | undefined | 规则的唯一 key，可用于只执行部分规则验证。参考示例 只执行部分规则 |  |
| level | 'error' | 'warning' | undefined | 验证级别。如果存在 error 级别错误，则会跳过 warning 级别验证 |  |
| message | string | undefined | 校验失败时展示的信息 |  |
| renderMessage | () => VNodeChild | undefined | 信息的渲染函数 | 2.29.1 |
| required | boolean | undefined | 是否必填 |  |
| trigger | string | Array<string> | undefined | 触发方式 |  |
| validator | (rule: FormItemRule, value: any) => boolean | Error | undefined | 校验规则 |  |


### FormItem Props
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| content-class | string | undefined | 内容的类名 | 2.43.0 |
| content-style | string | object | undefined | 内容的样式 | 2.43.0 |
| feedback | string | undefined | 表项的反馈信息。不设为 undefined 时，会覆盖规则验证的结果 |  |
| feedback-class | string | undefined | 反馈校验竖向展示定位 | 2.38.2 |
| feedback-style | string | object | undefined | 反馈校验横向展示定位 | 2.38.2 |
| first | boolean | false | 是否只展示首个出错信息 |  |
| ignore-path-change | boolean | false | 通常 path 的改变会导致数据来源的变化，所以 naive-ui 会清空验证信息。如果不期望这个行为，可以将其置为 true |  |
| label | string | undefined | 标签信息 |  |
| label-align | 'left' | 'right' | undefined | 标签的文本对齐方式。如果没有被设定，使用外层表单的 label-align |  |
| label-placement | 'left' | 'top' | undefined | 如果没有被设定，使用外层表单的 label-placement |  |
| label-style | CSSProperties | string | undefined | 标签的样式 |  |
| label-props | LabelHTMLAttributes | undefined | 标签元素的属性 | 2.24.0 |
| label-width | number | string | 'auto' | undefined | 如果没有被设定，使用外层表单的 label-width，'auto' 意味着 label width 会被自动调整 |  |
| path | string | undefined | 将值收集到外层表单 model 对象的路径 |  |
| rule | FormItemRule | Array<FormItemRule> | undefined | 验证表项的规则，它会被通过 rule-path 从外层表单获取的规则合并来作为表项的验证规则。推荐还是在外层表单设置所有规则 |  |
| rule-path | string | undefined | 从外层表单的 rules 对象获取规则的路径。如果没有设定，使用表项的 path 代替 |  |
| show-feedback | boolean | true | 是否展示校验反馈 |  |
| show-label | boolean | true | 是否展示标签。如果没有被设定，使用外层 n-form 的 show-label |  |
| show-require-mark | boolean | - | 是否展示必填的星号。如果没有被设定，使用外层 n-form 的 show-require-mark |  |
| require-mark-placement | 'left' | 'right' | 'right-hanging' | 'right' | 必填的星号的位置。如果没有被设定，使用外层 n-form 的 require-mark-placement | 'right-hanging' 2.24.0 |
| size | 'small' | 'medium' | 'large' | 'medium' | 尺寸 |  |
| validation-status | 'error' | 'success' | 'warning' | undefined | 表单的验证状态。不设为 undefined时，会覆盖规则验证的结果 |  |


### FormItemGi Props
接受 FormItem & GridItem 所有的 Props。


### Form Methods
| 名称 | 类型 | 说明 | 版本 |
| validate | (validateCallback?: (errors: Array<FormValidationError> | undefined, extra: { warnings: Array<FormValidationError> | undefined }) => void, shouldRuleBeApplied?: FormItemRule => boolean) => Promise<{ warnings: Array<FormValidationError> | undefined }> | 验证表单，Promise rejection 的返回值类型是 Array<FormValidationError> | warnings 2.37.1 |
| restoreValidation | () => void | 还原到未校验的状态 |  |
| invalidateLabelWidth | () => void | 重新计算所有表项的标签宽度。在使用 label-width="auto" 且标签内容动态变化时有用 | NEXT_VESION |


### FormItem, FormItemGi Methods
| 名称 | 类型 | 说明 | 版本 |
| validate | (options: { trigger?: string, callback?: (errors: FormValidationError | undefined, extra: { warnings: FormValidationError | undefined }) => void, shouldRuleBeApplied?: FormItemRule => boolean, options?: AsyncValidatorOptions }) => Promise<{ warnings: FormValidationError | undefined }> | 验证表项，Promise rejection 的返回值类型是 FormValidationError。如果不设定 trigger，这一个表项全部的规则都会被使用。shouldRuleBeApplied 可以用来进一步过滤已经经过 trigger 筛选的规则 | warnings 2.37.1 |
| restoreValidation | () => void | 还原到未校验的状态 |  |
| invalidateLabelWidth | () => void | 重新计算该表项的标签宽度。在使用 label-width="auto" 且标签内容动态变化时有用 | NEXT_VESION |

关于 AsyncValidatorOptions，参考 async-validator。


### Form Slots
| 名称 | 参数 | 说明 |
| default | () | 内容 |


### FormItem, FormItemGi Slots
| 名称 | 参数 | 说明 | 版本 |
| default | () | 内容 |  |
| feedback | () | 表项的反馈信息 | 2.24.0 |
| label | () | 标签内容 |  |