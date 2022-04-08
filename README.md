# mini-text

基于微信小程序的轻量富文本组件

<br>

## 安装
- 运行命令 `git clone https://github.com/yenche123/mini-text.git`

<br>

## 使用方式

1. 拷贝 `/Components` 下的 `mini-text` 文件夹到你的项目中
2. 拷贝 `/utils` 下的 `mini-parser.js` 到你的项目中
3. 在页面或组件的 json 文件下引入 `mini-text`
```json
{
  "usingComponents": {
    "mini-text": "/path/to/mini-text/mini-text"
  }
}
```
4. 在逻辑层中使用
```javascript
import { MiniParser } from "/path/to/mini-parser"
Page({
  data: {
    contentList: [],
  },
  onLoad() {
    let contentList = MiniParser.parse("在这里填入你想要解析的纯文本")
    this.setData({ contentList })
  },
})
```
5. 在布局层 .wxml 中使用
```html
<mini-text text-list="{{contentList}}" />
```

<br>

## 注意事项
在布局层中使用 `<mini-text />` 时，其父节点建议包裹一个`<view />` 作为 container，并且声明这个盒子的宽度和样式 `position: relative;`

<br>

## API
`<mini-text />` 拥有的 attribute

| 属性 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| text-list | Array | Y | 调用 `MiniParser.parse()` 来生成 |
| font-color | String |  | 文字的颜色，默认为 `#363a3e` |
| tap-color | String |  | 高亮的颜色，默认为 `#4269a5` |
| font-size | String |  | 文字的大小，默认为 `30rpx` |
| line-height | String |  | 行高，默认为 `60rpx` |

<br>

## LICENSE
MIT