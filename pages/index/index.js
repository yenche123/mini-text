import { MiniParser } from "../../utils/mini-parser"

let plainText = `欢迎使用 mini-text 轻量富文本组件，使用本组件可以快速在小程序里实现

1. 标注人，比如 @yench123 （仅支持@字母、数字、.和下划线）
2. hasttag，比如 #hi这里有一条鱼 #lfz你负责了嘛# (单双 hashtag 皆支持)
3. 链接，比如本仓库地址 https://github.com/yenche123/mini-text
4. 手机号，比如 1333333333

就这样，enjoy!
`

const VERSION = "1.0.0"

Page({
  data: {
    contentList: []
  },

  onLoad() {
    let contentList = MiniParser.parse(plainText)
    this.setData({ contentList })

    console.log("============ 欢迎使用 mini-text ============")
    console.log(" ")
    console.log(`当前版本号: ${VERSION}`)
    console.log("项目地址: https://github.com/yenche123/mini-text")
    console.log(" ")
    console.log("============================================")
  },

  onTapFromMiniText(e) {
    let {content, textType} = e.detail

    console.log("点击的类型 textType: ", textType)
    console.log("点击的内容 content: ", content)
    console.log(" ")

    if(textType === "AT" || textType === "HASHTAG") {
      wx.showToast({title: content, icon: "none"})
    }

  }
})
