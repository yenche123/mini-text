
// 解析器
// 返回一个数组，数组元素类型如下
// {textType: "URL / HASHTAG / AT / PHONE / PLAIN_TEXT / EMAIL", content: "纯文字"}


class MiniParser {

  /**
   * @param {String} txt 
   * @param {Object} option 
   */
  static parse(txt, {trim = true} = {}) {
    if(!txt) return []
    let myTxt = txt
    if(trim) myTxt = myTxt.trim()

    if(!myTxt) return []

    let resultList = [{textType: "PLAIN_TEXT", content: myTxt}]
    resultList = this._parseEmail(resultList)
    resultList = this._parseUrl(resultList)
    resultList = this._parseAt(resultList)      //如果不想高亮@，请把本行注释掉
    resultList = this._parseHashtag(resultList) //如果不想高亮#，请把本行注释掉
    resultList = this._parsePhone(resultList)
    return resultList
  }

  static _parseEmail(resultList) {
    let reg = /[\w\.-]{1,32}@[\w-]{1,32}\.\w{2,32}[\w\.-]*/g
    resultList = this._innerParse(resultList, "EMAIL", reg, {minLength: 6})
    return resultList
  }

  static _parseUrl(resultList) {
    let reg = /[\w\./:-]*\w{2,32}\.\w{2,6}\S*/g
    resultList = this._innerParse(resultList, "URL", reg, {minLength: 8})
    return resultList
  }

  static _parseAt(resultList) {
    let reg = /@[\w\.]{2,32}/g
    resultList = this._innerParse(resultList, "AT", reg, {minLength: 4})
    return resultList
  }

  static _parseHashtag(resultList) {
    let reg = /#[^\s\\/#][^\s\\/]+/g
    resultList = this._innerParse(resultList, "HASHTAG", reg, {minLength: 2})
    return resultList
  }

  static _parsePhone(resultList) {
    let reg = /\+*\d{7,15}/g
    resultList = this._innerParse(resultList, "PHONE", reg, {minLength: 7})
    return resultList
  }

  static _innerParse(resultList, textType, reg, {minLength = 8} = {}) {
    for(let i=0; i<resultList.length; i++) {

      let v1 = resultList[i]
      if(v1.textType !== "PLAIN_TEXT") continue

      let v1Text = v1.content
      let matches = v1Text.matchAll(reg)
      let tmpList = []
      let tmpEndIdx = 0

      for(let match of matches) {

        let mTxt = match[0]
        if(mTxt.length < minLength) continue

        let startIdx = match.index
        let endIdx = match.index + mTxt.length
        let obj = {textType, content: mTxt, miniID: this.getRandomId()}

        if(startIdx > 0) {
          //如果前面有字符串

          let prevLetter = v1Text[startIdx - 1]
          if(textType === "URL" && (prevLetter === "@" || prevLetter === "#")) {
            continue
          }

          let frontObj = {
            textType: "PLAIN_TEXT",
            content: v1Text.substring(tmpEndIdx, startIdx),
            miniID: this.getRandomId(),
          }
          tmpList.push(frontObj, obj)
        }
        else {
          tmpList.push(obj)
        }

        tmpEndIdx = endIdx

      }

      if(v1Text.length > tmpEndIdx) {
        let behindObj = {
          textType: "PLAIN_TEXT",
          content: v1Text.substring(tmpEndIdx),
          miniID: this.getRandomId()
        }
        tmpList.push(behindObj)
      }

      resultList.splice(i, 1)
      tmpList.forEach(v2 => {
        resultList.splice(i, 0, v2)
        i++
      })
      i--
    }

    return resultList
  }


  static getRandomId() {
    const ABC = "abcdefghijklmnopqrstuvwxyz0123456789"
    let now = Date.now()

    let sss = "miniID_"
    for(let i=0; i<9; i++) {
      let r = Math.floor(Math.random() * ABC.length)
      sss += ABC[r]
    }
    return sss
  }

}

export {MiniParser}