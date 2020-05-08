// pages/user/main.js
const app = getApp();
Page({
  data: {
    showLoading:true,
    api: app.globalData.api,
    result: null,
    checked: true
  },
  onLoad(){
    this.showLoading();
    this.getApi()
  },
  onShow(){

    this.cancelLoading();
  },
  onHide:function(){
  },
  showLoading:function(){
    this.setData({
      showLoading:true
    })
  },
  cancelLoading:function() {
    this.setData({
      showLoading: false
    })
  },
  onPullDownRefresh: function(){
    this.getApi();
    wx.stopPullDownRefresh();
  },
  getApi(){
    if(this.api === "https://api.lixworth.m78.co"){
      wx.request({
        url: this.api,
        data: {},
        method: 'GET',
        success: (res) => {
          if(res.data.status === 1){
            this.setData({
              result:res.data
            })
          }
        },
      });
    }else{
      this.setData({
        result:{
          GKD_TM_API_version: "内网访问不可用",
          memory_peak_usage: "内网访问不可用",
          req_processing_delay: "内网访问不可用"
        }
      });
    }
  }
})