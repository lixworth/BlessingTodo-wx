const app = getApp();
Page({
    data: {
        showLoading: true,
        option1: [{ text: '全部计划', value: 0 }],
        value1: 0, //MENU
        active: 0, //TAB
        data: [],
        showData: [],
        btn_loading: false
    },
    onLoad: function(){
        this.showLoading();
        this.refresh();
    },
    onShow: function(){
        // this.cancelLoading();
    },
    refresh(){
        var app = getApp();
        this.showLoading();
        if(wx.getStorageSync('token').trim() === ""){
            wx.switchTab({
                url: '/pages/login/login'
            });
        }
        const token = wx.getStorageSync('token');
        wx.showNavigationBarLoading();
        wx.request({
            url: app.globalData.api+"list",
            method: "GET",
            header:{
                "content-type":"application/json",
                "authorization": token
            },
            success:(res) => {
                console.log(res)
                if(res.statusCode === 401){
                    wx.removeStorageSync('token');
                    wx.redirectTo({
                        url: '/pages/login/login'
                    })
                }
                if(res.data.status === 1){
                    var option = [];
                    var showData = [];
                    option.push({ text: '全部计划', value: 0 });
                    res.data.message.t.forEach((item,index) => {
                        option.push({ text: item.TITLE, value: index+1 });
                    });
                    this.setData({
                        option1: option,
                        value1: 0,
                        data: res.data.message,
                    });
                    if(this.data.active === 0){ //待办
                        this.setData({
                            showData: this.data.data.todo
                        });
                    }
                    if(this.data.active === 1){ //全部
                        this.setData({
                            showData: this.data.data.all
                        });
                    }
                    if(this.data.active === 2){ //尚未开始
                        this.setData({
                            showData: this.data.data.waitTodo
                        });
                    }

                }else{
                    var option = [];
                    option.push({ text: '全部计划', value: 0 });
                    this.setData({
                        option1: option,
                        data: null,
                        showData: null
                    });
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 2000
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
        wx.hideNavigationBarLoading(); //完成停止加载图标
        wx.stopPullDownRefresh();
        this.cancelLoading();
    },
    TabChange(event) {
        this.showLoading();
        this.setData({
            value1: 0,
            active: event.detail.name
        });
        if(event.detail.name === 0){ //待办
            this.setData({
                showData: this.data.data.todo
            })
        }
        if(event.detail.name === 1){ //全部
            this.setData({
                showData: this.data.data.all
            });
        }
        if(event.detail.name === 2){ //尚未开始
            this.setData({
                showData: this.data.data.waitTodo
            });
        }
        this.cancelLoading();
    },
    SwitchMenu(event){
        this.showLoading();
        if(this.data.active === 0){ //待办
            this.setData({
                showData: this.data.data.todo
            });
        }
        if(this.data.active === 1){ //全部
            this.setData({
                showData: this.data.data.all
            });
        }
        if(this.data.active === 2){ //尚未开始
            this.setData({
                showData: this.data.data.waitTodo
            });
        }
        if(event.detail === 0){
        }else{
            var showData2 = [];
            this.data.showData.forEach((item,index) => {
                if(item.TITLE === this.data.option1[event.detail].text){
                    showData2.push(item);
                }
            })
            this.setData({
                showData: showData2
            });
        }
        this.cancelLoading();
    },
    onPullDownRefresh: function(){
        this.refresh();
    },
    makeSure(event){
        var app = getApp();
        if(this.data.btn_loading === true){
            wx.showToast({
                title: `请等待上次请求完成或尝试重新刷新页面`,
                icon: 'none'
            });
        }else{
            this.setData({
                btn_loading:true
            });
            if(wx.getStorageSync('token').trim() === ""){
                wx.switchTab({
                    url: '/pages/login/login'
                });
            }
            const token = wx.getStorageSync('token');
            wx.showNavigationBarLoading();
            wx.request({
                url: app.globalData.api+'sonComplete',
                header:{
                    "content-type":"application/json",
                    "authorization": token
                },
                data: {
                    mid: event.currentTarget.dataset.mid
                },
                method: 'POST',
                success: (res) => {
                    if(res.data.status === 1){
                        wx.hideNavigationBarLoading();
                        wx.showToast({
                            title: `已确认该事项`,
                            icon: 'success'
                        });
                        this.refresh();
                    }
                },
                fail: function() {
                    wx.showToast({
                        title: `请检查网络连接`,
                        icon: 'none'
                    });
                },
                complete:(res) => {
                    if(res.statusCode === 401){
                        wx.removeStorageSync('token');
                        wx.redirectTo({
                            url: '/pages/index/login'
                        })
                    }
                    this.setData({
                        btn_loading: false
                    });
                }
            })
        }
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
})