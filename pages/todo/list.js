// pages/about/todo/list.js
Page({
  data: {
    showLoading: true,
    option1: [
      { text: '全部计划', value: 1 }
    ],
    value1: 0,
    active: 1,
    data: [],
    showData: [],
  },
  onLoad: function(){
    if(wx.getStorageSync('token').trim() === ""){
      wx.switchTab({
        url: '/pages/index/login'
      });
    }
    const token = wx.getStorageSync('token');
    wx.request({
      url: "http://192.168.3.3/list",
      method: "GET",
      header:{
        "content-type":"application/json",
        "authorization": token
      },
      success:(res) => {
        if(res.statusCode === 401){
          wx.removeStorageSync('token');
          wx.redirectTo({
            url: '/pages/index/login'
          })
        }
        if(res.data.status === 1){
          var option = [];
          var showData = [];
          option.push({ text: '全部计划', value: 0 });
          res.data.message.t.forEach((item,index) => {
            option.push({ text: item.TITLE, value: index+1 });
          });
          console.log(option)
          this.setData({
            option1: option,
            data: res.data.message.t,
            showData: res.data.message.t
          });
        }
      },
      fail(res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  onShow: function(){

    this.cancelLoading();
    // this.cancelLoading()
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
    if(event.detail.name === 0){
      this.data.forEach((item,index) => {

      });
    }else if(event.detail.name === 1){

    }else if(event.detail.name === 2){

    }else{

    }
  },
  SwitchMenu(event){
    this.showLoading();
    console.log(event.detail)
    if(event.detail === 0){
      this.setData({
        showData: this.data.data
      });
    }else{
      console.log(this.data.data[event.detail-1])
      this.setData({
        showData: [this.data.data[event.detail-1]]
      });
      console.log(this.data.showData)
    }
    this.cancelLoading();
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
    this.showLoading();
    if(wx.getStorageSync('token').trim() === ""){
      wx.switchTab({
        url: '/pages/index/login'
      });
    }
    const token = wx.getStorageSync('token');
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    wx.request({
      url: "http://192.168.3.3/list",
      method: "GET",
      header:{
        "content-type":"application/json",
        "authorization": token
      },
      success:(res) => {
        console.log(res);
        if(res.statusCode === 401){
          wx.removeStorageSync('token');
          wx.redirectTo({
            url: '/pages/index/login'
          })
        }
        if(res.data.status === 1){
          var option = [];
          var showData = [];
          option.push({ text: '全部计划', value: 0 });
          res.data.message.t.forEach((item,index) => {
            option.push({ text: item.TITLE, value: index+1 });
          });
          console.log(option)
          this.setData({
            option1: option,
            data: res.data.message.t,
            showData: res.data.message.t
          });
        }
      },
      fail(res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        });
      },
      complete: (res) => {
        wx.hideNavigationBarLoading(); //完成停止加载图标
        wx.stopPullDownRefresh();
        this.cancelLoading();
      }
    });
  }
})