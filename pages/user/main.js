// pages/user/main.js
Page({
  data: {
    showLoading:true,
  },
  onLoad: function (options) {
    this.showLoading();
  },
  onShow: function(){
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
  }
})