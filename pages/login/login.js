const app = getApp()
Page({
    data: {
        showLoading: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        disabled: false
    },
    onLoad(){
        wx.showNavigationBarLoading();
        if(wx.getStorageSync('token').trim() === ""){
            wx.removeStorageSync('token');
            wx.getSetting({
                complete: settings => {
                    if (settings.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: res => {
                                this.login(res.userInfo);
                            }
                        })
                    }else{
                        this.cancelLoading();
                    }
                }
            });
        }else{
            wx.checkSession({
                success () {
                    wx.switchTab({
                        url: '/pages/list/list'
                    })
                },
                fail () {
                    wx.removeStorageSync('token');
                    wx.reLaunch({
                        url: "/pages/login/login"
                    })
                }
            })
        }
        wx.hideLoading();
        wx.hideNavigationBarLoading();
    },
    onShow: function (event) {
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
    clickBtn(e){
        this.setData({
            disabled: true
        });
        this.showLoading();
    },
    bindGetUserInfo(e){
        wx.showLoading({
            title: '加载中',
        });
        this.showLoading();
        console.log(e.detail.userInfo)
        wx.getSetting({
            success: settings => {
                if (settings.authSetting['scope.userInfo']) {
                    this.login(e.detail.userInfo);
                }else{
                    wx.showModal({
                        title: '提示',
                        content: '请授权小程序获取用户信息',
                        showCancel: false,
                        success (res) {

                        },
                        complete: () => {
                            this.cancelLoading();
                            this.setData({
                                disabled: false
                            });
                        }
                    })
                }
            },
            complete: () => {
                wx.hideLoading();
            }
        })

    },
    login(userInfo) {
        this.showLoading();
        wx.login({
            success: res => {
                wx.request({
                    url: app.globalData.api+"login",
                    method: "POST",
                    data: {code:res.code,user:userInfo},
                    header:{"content-type":"application/json"},
                    success(res) {
                        if(res.data.success === true){
                            wx.setStorageSync('token', res.data.token);
                            wx.switchTab({
                                url: '/pages/list/list'
                            });
                        }else{
                            wx.showModal({
                                title: '提示',
                                content: '登录失败 请重试',
                                showCancel: false,
                                complete (res) {
                                    wx.hideLoading();
                                    this.setData({
                                        disabled: false
                                    });
                                }
                            })
                        }

                    },
                    fail(res) {
                        wx.hideLoading();
                        wx.showModal({
                            title: '提示',
                            content: '登录失败 请检查网络连接',
                            showCancel: false,
                            complete (res) {
                                this.setData({
                                    disabled: false
                                });
                            }
                        })
                    }
                })
            }
        });
    }
})