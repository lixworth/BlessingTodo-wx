//app.js
App({
    onLaunch: function (event) {
        wx.showLoading({
            title: '加载中',
        })
        if(wx.getStorageSync('token').trim() === ""){
            wx.removeStorageSync('token');
            wx.redirectTo({
                url: '/pages/index/login'
            })
        }else{
            wx.checkSession({
                success () {
                    //session_key 未过期，并且在本生命周期一直有效
                    wx.hideLoading();
                },
                fail () {
                    wx.removeStorageSync('token');
                    wx.redirectTo({
                        url: '/pages/index/login'
                    })
                    wx.hideLoading();
                }
            })
        }
    },
    globalData: {
        userInfo: null
    }
})