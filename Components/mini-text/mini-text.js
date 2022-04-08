/**
 * 
 * @author: yenche123
 * @createdAt: 2021-07-20
 */

Component({

  properties: {
    textList: Array,
    fontColor: {
      type: String,
      value: "#363a3e",
    },
    tapColor: {
      type: String,
      value: "#4269a5",
    },
    fontSize: {
      type: String,
      value: "30rpx",
    },
    lineHeight: {
      type: String,
      value: "60rpx",
    },

  },

  data: {},

  methods: {
    onTapLink(e) {
      let _this = this
      let {textType, content, idx} = e.currentTarget.dataset
      let send = { textType, content, idx }
      this.triggerEvent("tapminitext", send)

      if(textType === "SHORTLINK") {
        this.tapShortLink(content)
        return
      }

      wx.showActionSheet({
        alertText: content,
        itemList: ["复制"],
        success(res) {
          let i = res.tapIndex
          if(i === 0) _this.copy(content)
        },
      })
    },

    tapShortLink(content) {
      const d1 = Date.now()
      try {
        wx.navigateToMiniProgram({
          shortLink: content,
          fail(err) {
            const d2 = Date.now()
            const diff = d2 - d1
            if(diff < 900) wx.showToast({title: "跳转失败", icon: "none"})
          }
        })
      }
      catch(err) {}
    },

    copy(content) {
      wx.setClipboardData({data: content})
    },

    onTapTag(e) {
      let {textType, content, idx} = e.currentTarget.dataset
      let send = { textType, content, idx }
      this.triggerEvent("tapminitext", send)
    },

    onTapPhone(e) {
      let _this = this
      let {content, idx} = e.currentTarget.dataset
      let send = { textType: "PHONE", content, idx }
      this.triggerEvent("tapminitext", send)

      wx.showActionSheet({
        alertText: content,
        itemList: ["拨号", "复制"],
        success(res) {
          let i = res.tapIndex
          if(i === 0) _this.call(content)
          else if(i === 1) _this.copy(content)
        },
      })

    },


    call(content) {
      wx.makePhoneCall({
        phoneNumber: content,
      })
    }


  }
})
