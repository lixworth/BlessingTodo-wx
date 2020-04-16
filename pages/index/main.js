Page({
    data: {
        showLoading:true

    },
    onLoad: function (options) {
        this.getTabBar().init();
        this.showLoading();
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
    }
});
