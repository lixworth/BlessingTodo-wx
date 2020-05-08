const app = getApp();
const date = new Date();
Page({
    data: {
        yiyan: "用代码表达言语的魅力，用代码书写山河的壮丽。—— 『一言』",
        showLoading:true,
        activeNames: [],
        showData: [],
        show: false,
        new: false,
        error: false,
        newLoading: false,
        loadLoading: false,
        load_cid: null,
        newTodo: {
            title: null,
            content: null,
            todo: [
                {
                    content: null,
                    currentDate: null,
                    solar: null,
                    time: null,
                    show: false,
                }
            ]
        },
        new_btn: false,
    },
    onLoad: function (options) {
        wx.hideLoading();
        this.showLoading();
        var date = new Date();
        var minu = date.getMinutes()
        if (date.getMinutes() < 10) minu = "0" + minu;
        var todo = this.data.newTodo;
        todo.todo[0].currentDate = date.getHours()+":"+minu;
        this.setData({
            newTodo: todo
        });
        try {
            if (app.globalData.api && app.globalData.api != '') {
                this.refresh();
            }
        } catch(error) {

        }
    },
    onInput(event) {
        this.setData({
            currentDate: event.detail
        });
    },

    bindSolarChange(event){
        var data = this.data.newTodo;
        data.todo[event.target.id].solar = event.detail.value;
        this.setData({
            newTodo: data
        });
    },
    changeContent(event){
        var data = this.data.newTodo;
        data.content = event.detail;
        this.setData({
            newTodo: data
        });
    },
    changeCode(event){
        console.log("event.detail")
        this.setData({
            load_cid: event.detail
        });
    },
    loadCode(){
        this.setData({
            loadLoading: true
        });
        var app = getApp();
        if(wx.getStorageSync('token').trim() === ""){
            wx.switchTab({
                url: '/pages/login/login'
            });
        }
        const token = wx.getStorageSync('token');
        wx.showNavigationBarLoading();
        wx.request({
            url: app.globalData.api+"loadCode?cid="+this.data.load_cid,
            method: "GET",
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
                    wx.navigateTo({
                        url: '/pages/invite/index?cid='+this.data.load_cid
                    });
                }else{
                    wx.showToast({
                        title: '邀请码不可用',
                        icon: 'none',
                        duration: 2000
                    });
                    this.setData({
                        loadLoading: false,
                        show: false
                    });
                }
            },
            fail(res) {
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                    duration: 2000
                });
                this.setData({
                    loadLoading: false,
                    show: false
                });
            }
        });
    },
    changeTitle(event){
        console.log(event)
        var data = this.data.newTodo;
        data.title = event.detail;
        this.setData({
            newTodo: data
        });
    },
    changeTodoContent(event) {
        console.log(event)
        var data = this.data.newTodo;
        data.todo[event.target.id].content = event.detail;
        this.setData({
            newTodo: data
        });
        this.onCloseTime(event)
    },
    changeTodoTime(event) {
        if(event.detail == null){
            var data = this.data.newTodo;
            data.todo[event.target.id].time = event.detail;
            this.setData({
                newTodo: data
            });
        }else{
            if(event.detail > 1 && event.detail%1 === 0){
                var data = this.data.newTodo;
                data.todo[event.target.id].time = event.detail;
                this.setData({
                    newTodo: data
                });
            }else{
                wx.showToast({
                    title: '持续时间需为大于1的整数',
                    icon: 'none',
                    duration: 1000
                });
            }
        }

    },
    newTask(){
        var data = this.data.newTodo;
        var date = new Date();
        var minu = date.getMinutes()
        if (date.getMinutes() < 10) minu = "0" + minu;
        data.todo.push({
            content: null,
            currentDate: date.getHours()+":"+minu,
            solar: null,
            time: null,
            show: false
        });
        this.setData({
            newTodo: data
        });
    },
    onInputTime(event) {
        console.log(event)
        var data = this.data.newTodo;
        data.todo[event.target.id].currentDate = event.detail;
        this.setData({
            newTodo: data
        });
        this.onCloseTime(event)
    },
    onCloseTime(event){
        var data = this.data.newTodo;
        data.todo[event.target.id].show = false;
        this.setData({
            newTodo: data
        });
    },
    showTime(event){
        var data = this.data.newTodo;
        data.todo[event.target.id].show = true;
        this.setData({
            newTodo: data
        });
    },
    delectTask(event){
        console.log(event)
        var data = this.data.newTodo;
        console.log(event.target.id)
        data.todo.splice(event.target.id,1);
        this.setData({
            newTodo: data
        });
    },
    onShow: function(){
        // this.cancelLoading();
    },
    scanCode(){
        wx.scanCode({
            success: (res) => {
                this.setData({
                    loadLoading: true
                });
                var app = getApp();
                if(wx.getStorageSync('token').trim() === ""){
                    wx.switchTab({
                        url: '/pages/login/login'
                    });
                }
                const token = wx.getStorageSync('token');
                wx.showNavigationBarLoading();
                wx.request({
                    url: app.globalData.api+"loadCode?cid="+res.result,
                    method: "GET",
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
                            wx.navigateTo({
                                url: '/pages/invite/index?cid='+res.result
                            });
                        }else{
                            wx.showToast({
                                title: '邀请码不可用',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                loadLoading: false,
                                show: false
                            });
                        }
                    },
                    fail(res) {
                        wx.showToast({
                            title: '加载失败',
                            icon: 'none',
                            duration: 2000
                        });
                        this.setData({
                            loadLoading: false,
                            show: false
                        });
                    }
                });
            },
            fail(res) {
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                    duration: 2000
                });
                this.setData({
                    loadLoading: false,
                    show: false
                });
            }
        })


    },
    showPopup() {
        this.setData({ show: true });
    },
    showNew() {
        this.setData({ new: true });
    },
    onClose() {
        if(this.data.newLoading === true){
            this.setData({ show: false });
        }else{
            this.setData({ show: false,new: false });
        }
    },
    refresh(){
        var app = getApp();
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
                if(res.statusCode === 401){
                    wx.removeStorageSync('token');
                    wx.redirectTo({
                        url: '/pages/login/login'
                    })
                }
                this.setData({
                    showData: null
                });
                this.setData({
                    showData: res.data.message.all
                });
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
            }
        });
        this.cancelLoading();
        wx.request({
            url: app.globalData.api+"yiyan",
            method: 'GET',
            success: (res) => {
                if(res.data.from_who === null){
                    this.setData({
                        yiyan: "“"+res.data.hitokoto+"” ——『"+res.data.from+"』"
                    });
                }else{
                    this.setData({
                        yiyan: "“"+res.data.hitokoto+"” —— "+res.data.from_who+"『"+res.data.from+"』"
                    });
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
    onChange(event) {
        this.setData({
            activeNames: event.detail
        });
    },
    clickMore(tid){
        console.log(tid)
        wx.showLoading({
            title: '加载中',
        })
        wx.navigateTo({
            url: '/pages/todo/todo?tid='+tid.currentTarget.id,
            success: (res) => {
                wx.hideLoading();
            }
        })
    },
    newTodo(event){
        this.showLoading();
        console.log(this.data.newTodo)
        var newtodo = this.data.newTodo;
        this.setData({
            new_btn: true,
            newLoading: true,
        });
        /* 开始验证数据 */
        if(newtodo.title === null || newtodo.content === null){
            wx.showToast({
                title: "请全部填写完整",
                icon: 'none',
                duration: 2000
            });
            this.setData({
                new_btn: false,
                newLoading: false,
            });
        }else{
            var tasks = newtodo.todo;
            var error = false;
            tasks.forEach((item,index) => {
                if(item.content === null || item.solar === null || item.time === null){
                    error = true;
                }
                if(item.time > 1 && item.time%1 === 0){
                }else{
                    error = true;
                }
            });
            if(error === true){
                wx.showToast({
                    title: "所填信息有错误",
                    icon: 'none',
                    duration: 2000
                });
                this.setData({
                    new_btn: false,
                    newLoading: false,
                });
            }else{
                var app = getApp();
                if(wx.getStorageSync('token').trim() === ""){
                    wx.switchTab({
                        url: '/pages/login/login'
                    });
                }
                const token = wx.getStorageSync('token');
                wx.showNavigationBarLoading();
                wx.request({
                    url: app.globalData.api+"newTodo",
                    method: "POST",
                    header:{
                        "content-type":"application/json",
                        "authorization": token
                    },
                    data: {
                        new: newtodo
                    },
                    success:(res) => {
                        if(res.data.status === 1){
                            wx.showToast({
                                title: '添加成功',
                                icon: 'success',
                                duration: 2000
                            });
                            this.refresh();
                            this.setData({
                                new_btn: false,
                                newLoading: false,
                                new: false,
                                newTodo: {
                                    title: null,
                                    content: null,
                                    todo: [
                                        {
                                            content: null,
                                            currentDate: null,
                                            solar: null,
                                            time: null,
                                            show: false,
                                        }
                                    ]
                                }
                            });
                        }else{
                            wx.showToast({
                                title: '提交失败',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                new_btn: false,
                                newLoading: false,
                            });
                        }

                    },
                    fail:() => {
                        wx.showToast({
                            title: '加载失败',
                            icon: 'none',
                            duration: 2000
                        });
                        this.setData({
                            new_btn: false,
                            newLoading: false,
                        });
                    }
                });
            }
        }
    }
});
