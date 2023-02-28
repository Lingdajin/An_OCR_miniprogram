// index.js
// 获取应用实例
const app = getApp()

const nameIndex = {
  address: 2,
  card_position: -1,
  card_property: -1,
  gender: 3,
  id: 1,
  image_height: -1,
  image_width: -1,
  name: 1,
  nationality: 4,
  type: -1
}


Page({
  data: {
    motto: '田晁旭-2022210164',
    filePath: '/images/idcard.jpg',
    resultList: [
      {
        name: "姓名",
        value: ""
      },
      {
        name: "身份证号码",
        value: ""
      },
      {
        name: "住址",
        value: ""
      },
      {
        name: "性别",
        value: ""
      },
      {
        name: "民族",
        value: ""
      },
    ]
  },
  getResult() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    /**
     * 使用此接口前，请先在这里购买微信OCR识别接口（免费）
     * https://fuwu.weixin.qq.com/service/detail/000ce4cec24ca026d37900ed551415
     * 接口文档参见该页面内容
     */
    console.log(this.__data__.filePath)
    wx.serviceMarket.invokeService({
      service: "wx79ac3de8be320b71",
      api: "OcrAllInOne",
      data: {
        img_url: new wx.serviceMarket.CDN({
          type: "filePath",
          filePath: this.__data__.filePath
        }),
        data_type: 3,
        ocr_type: 1
      }
      
    })
   
    .then(res => {
      console.log(res.data.idcard_res)
      let idcard_res = res.data.idcard_res;
      this.data.resultList[0].value = idcard_res.name.text;
      
      for (let key in idcard_res) {
        console.log(nameIndex[key])
        let num=nameIndex[key]
       
        if (nameIndex[key] >= 0) {
          
          console.log(this.data.resultList)
          console.log(key)
          let text = idcard_res[key].text;
          
          this.data.resultList[nameIndex[key]].value = text;
          console.log(this.data.resultList[num].value)
          console.log(text)
        }
      }
      this.setData({
        resultList: this.data.resultList
      })
    }).finally(() => {
      wx.hideLoading()
    })
  }
})
