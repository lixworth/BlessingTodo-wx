//app.js
App({
    onLaunch: function (event) {
        wx.showLoading({
            title: '加载中',
        })
    },
    globalData:{
        version: "0.0.1-alpha-bugdhdj",
        api: "http://192.168.3.3/",
    },
})