// pages/invite/index.js
Page({
    data: {
        showLoading: true,
        cid: null,
        data: null,
        dc_code: false
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            showLoading: true,
            cid: options.cid
        });
        if(this.data.cid === null || this.data.cid === undefined){
            wx.switchTab({
                url: '/pages/index/main',
                complete: () => {
                    this.cancelLoading();
                }
            })
        }
        var app = getApp();
        if(wx.getStorageSync('token').trim() === ""){
            wx.switchTab({
                url: '/pages/login/login'
            });
        }
        const token = wx.getStorageSync('token');
        wx.request({
            url: app.globalData.api+"loadCode?cid="+this.data.cid,
            method: "GET",
            header:{
                "content-type":"application/json",
                "authorization": token
            },
            success:(res) => {
                if(res.statusCode === 401){
                    wx.removeStorageSync('token');
                    setTimeout(function () {
                        wx.redirectTo({
                            url: '/pages/login/login'
                        })
                    }, 2000);
                }
                if(res.data.status === 1){
                    if(res.data.message.c.UID === null){
                        this.setData({
                            data: res.data.message,
                            dc_code: false
                        });
                    }else{
                        this.setData({
                            data: res.data.message,
                            dc_code: true
                        });
                    }
                    this.cancelLoading();
                }else{
                    wx.showToast({
                        title: '邀请码不可用',
                        icon: 'none',
                        duration: 2000
                    });
                    setTimeout(function () {
                        wx.switchTab({
                            url: '/pages/index/main'
                        })
                    }, 2000);
                }
            },
            fail(res) {
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                    duration: 2000
                });
                setTimeout(function () {
                    wx.switchTab({
                        url: '/pages/index/main'
                    })
                }, 2000);
            }
        });
    },
    onShow(){

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
    returnBack(){
        wx.switchTab({
            url: "/pages/index/main"
        })
    },
    makeSure(){
        var app = getApp();
        if(wx.getStorageSync('token').trim() === ""){
            wx.switchTab({
                url: '/pages/login/login'
            });
        }
        const token = wx.getStorageSync('token');
        if(this.data.dc_code === true){ //FA
            wx.request({
                url: app.globalData.api+"fatherJoin",
                method: "POST",
                data: {
                    tid: this.data.data.c.TID,
                    suid: this.data.data.c.UID
                },
                header:{
                    "content-type":"application/json",
                    "authorization": token
                },
                success:(res) => {
                    if(res.statusCode === 401){
                        wx.removeStorageSync('token');
                        wx.redirectTo({
                            url: '/pages/login/login'
                        })
                    }
                    if(res.data.status === 1){
                        wx.showToast({
                            title: "添加成功",
                            icon: 'success',
                            duration: 2000
                        });
                        setTimeout(function () {
                            wx.switchTab({
                                url: '/pages/index/main'
                            })
                        }, 2000);
                    }else if(res.data.status === 2) {
                        wx.showToast({
                            title: "你不能添加自己为自己的监督人哦",
                            icon: 'error',
                            duration: 2000
                        });
                        setTimeout(function () {
                            wx.switchTab({
                                url: '/pages/index/main'
                            })
                        }, 2000);
                    }else{
                        wx.showToast({
                            title: "请重试"+res.data.message.error,
                            icon: 'none',
                            duration: 2000
                        });
                    }
                },
                fail(res) {
                    wx.showToast({
                        title: "请重试",
                        icon: 'none',
                        duration: 2000
                    });
                    wx.switchTab({
                        url: '/pages/index/main'
                    })
                }
            });
        }else{
            wx.request({
                url: app.globalData.api+"sonJoin",
                method: "POST",
                data: {
                    tid: this.data.data.c.TID
                },
                header:{
                    "content-type":"application/json",
                    "authorization": token
                },
                success:(res) => {
                    if(res.statusCode === 401){
                        wx.removeStorageSync('token');
                        wx.redirectTo({
                            url: '/pages/login/login'
                        })
                    }
                    if(res.data.status === 1){
                        wx.showToast({
                            title: "添加成功",
                            icon: 'success',
                            duration: 2000
                        });
                        setTimeout(function () {
                            wx.switchTab({
                                url: '/pages/index/main'
                            })
                        }, 2000);
                    }else{
                        wx.showToast({
                            title: "请重试"+res.data.message.error,
                            icon: 'none',
                            duration: 2000
                        });
                    }
                },
                fail(res) {
                    wx.showToast({
                        title: "请重试",
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        }
    }
})