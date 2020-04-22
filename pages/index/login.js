// pages/index/login.js
Page({
    data: {
        showLoading: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

    },
    onLoad: function (options) {
        wx.showNavigationBarLoading();
        wx.showLoading({
            title: '加载中',
        })
    },
    onShow: function (event) {
        if(wx.getStorageSync('token').trim() === ""){
            wx.getSetting({
                complete: settings => {
                    if (settings.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: res => {
                                this.login(res.userInfo);
                            }
                        })
                    }else{
                        wx.hideLoading();
                        this.cancelLoading();
                    }
                }
            });
        }else{
            wx.switchTab({
                url: '/pages/index/main'
            });
        }
        wx.hideNavigationBarLoading();
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
    bindGetUserInfo: function (e) {
        console.log(e.detail.userInfo)
        wx.getSetting({
            success: settings => {
                if (settings.authSetting['scope.userInfo']) {
                    this.login(e.detail.userInfo);
                }else{
                    wx.showModal({
                        title: '提示',
                        content: '请允许小程序获取用户信息',
                        showCancel: false,
                        success (res) {

                        }
                    })
                }
            }
        })
    },
    login: function (userInfo) {
        wx.login({
            success: res => {
                wx.request({
                    url: "http://192.168.3.3/login",
                    method: "POST",
                    data: {code:res.code,user:userInfo},
                    header:{"content-type":"application/json"},
                    success(res) {
                        if(new Boolean(res.data.success)){
                            try {
                                wx.setStorageSync('token', res.data.token);
                                wx.switchTab({
                                    url: '/pages/todo/list'
                                });
                                wx.hideLoading();
                            } catch (e) {
                                wx.hideLoading();
                                wx.showModal({
                                    title: '提示',
                                    content: '未知错误 请重试',
                                    showCancel: false,
                                    success (res) {
                                        wx.reLaunch({
                                            url: '/pages/todo/list'
                                        })
                                    }
                                })
                            }
                        }else{
                            wx.hideLoading();
                            wx.showModal({
                                title: '提示',
                                content: '登录失败 请重试',
                                showCancel: false,
                                success (res) {
                                    wx.reLaunch({
                                        url: '/pages/index/login'
                                    })
                                }
                            })
                        }

                    },
                    fail(res) {
                        wx.hideLoading();
                        wx.showModal({
                            title: '提示',
                            content: '登录失败 请重试',
                            showCancel: false,
                            success (res) {
                                wx.reLaunch({
                                    url: '/pages/index/login'
                                })
                            }
                        })
                    }
                })
            }
        });
    }
})