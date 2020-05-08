const app = getApp();

Page({
    data: {
        showLoading:true,
        tid: null,
        showData: null,
        YQShow: false,
        YQLoading: true,
        DCShow: false,
        DCLoading: true,
        cid: null,
        image: ''
    },
    onLoad: function(option){
        console.log(option)
        this.showLoading();
        this.setData({
            showLoading: true,
            tid: option.tid
        });
        if(this.data.tid === null || this.data.tid === undefined){
            wx.switchTab({
                url: '/pages/index/main',
                complete: () => {
                    this.cancelLoading();
                }
            })
        }
        this.refresh();
    },
    refresh(){
        if(wx.getStorageSync('token').trim() === ""){
            wx.switchTab({
                url: '/pages/login/login'
            });
        }
        const token = wx.getStorageSync('token');
        wx.showNavigationBarLoading();
        wx.request({
            url: app.globalData.api+"getTodo?tid="+this.data.tid,
            method: "GET",
            header:{
                "content-type":"application/json",
                "authorization": token
            },
            success:(res) => {
                if(res.data.status === 1){
                    this.setData({
                        showData: res.data.message.t
                    });
                    this.cancelLoading();
                }else{
                    wx.switchTab({
                        url: '/pages/index/main',
                    })
                }
            },
            fail(){
                wx.switchTab({
                    url: '/pages/index/main',
                })
            }
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },
    onShow(){
    },
    CloseYQ(){
        this.setData({
            YQShow: false,
            YQLoading: false,
        });
    },
    getYQCode(){
        var app = getApp();
        this.setData({
            YQShow: true,
            YQLoading: true,
        });
        if(wx.getStorageSync('token').trim() === ""){
            wx.switchTab({
                url: '/pages/login/login'
            });
        }
        const token = wx.getStorageSync('token');
        wx.showNavigationBarLoading();

        wx.request({
            url: app.globalData.api+'getCode?type=YQCode&tid='+this.data.tid,
            header:{
                "content-type":"application/json",
                "authorization": token
            },
            method: 'GET',
            success: (res) => {
                if(res.data.status === 1){
                    this.setData({
                        cid: res.data.message.cid
                    });
                }else{
                    wx.showToast({
                        title: `操作被拒绝，请重试`,
                        icon: 'none'
                    });
                }
                this.setData({
                    YQLoading: false,
                });
            },
            fail: function() {
                wx.showToast({
                    title: `请检查网络连接`,
                    icon: 'none'
                });
                this.setData({
                    YQShow: false,
                    YQLoading: false,
                });
            },
            complete:(res) => {
                if(res.statusCode === 401){
                    wx.removeStorageSync('token');
                    wx.redirectTo({
                        url: '/pages/index/login'
                    })
                }
            }
        })
    },
    CloseDC(){
        this.setData({
            DCShow: false,
            DCLoading: false,
        });
    },
    getDCCode(){
        var app = getApp();
        this.setData({
            DCShow: true,
            DCLoading: true,
        });
        if(wx.getStorageSync('token').trim() === ""){
            wx.switchTab({
                url: '/pages/login/login'
            });
        }
        const token = wx.getStorageSync('token');
        wx.showNavigationBarLoading();

        wx.request({
            url: app.globalData.api+'getCode?type=DCCode&tid='+this.data.tid,
            header:{
                "content-type":"application/json",
                "authorization": token
            },
            method: 'GET',
            success: (res) => {
                if(res.data.status === 1){
                    this.setData({
                        cid: res.data.message.cid
                    });
                }else{
                    wx.showToast({
                        title: `操作被拒绝，请重试`,
                        icon: 'none'
                    });
                }
                this.setData({
                    DCLoading: false,
                });
            },
            fail: function() {
                wx.showToast({
                    title: `请检查网络连接`,
                    icon: 'none'
                });
                this.setData({
                    DCShow: false,
                    DCLoading: false,
                });
            },
            complete:(res) => {
                if(res.statusCode === 401){
                    wx.removeStorageSync('token');
                    wx.redirectTo({
                        url: '/pages/index/login'
                    })
                }
            }
        })
    },
    onPullDownRefresh: function(){
        this.refresh();
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
    clickCopy(){
        wx.setClipboardData({
            data: this.data.cid.toString(),
            success (res) {
                wx.getClipboardData({
                    success (res) {
                        console.log(res.data) // data
                    },
                    fail(res){
                        console.log(res)
                    }
                })
            },
            fail(res){
                console.log(res)
            }
        })
    }
})