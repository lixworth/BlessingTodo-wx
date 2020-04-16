// pages/index/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (event) {
        if(wx.getStorageSync('token').trim() === ""){
            wx.login({
                success: res => {
                    wx.request({
                        url: "http://192.168.3.3/login",
                        method: "POST",
                        data: {code:res.code},
                        header:{"content-type":"application/json"},
                        success(res) {
                            if(new Boolean(res.data.success)){
                                try {
                                    wx.setStorageSync('token', res.data.token);
                                    wx.switchTab({
                                        url: '/pages/index/main'
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
                                                url: '/pages/index/login'
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
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})