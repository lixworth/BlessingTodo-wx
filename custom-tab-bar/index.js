Component({
    data: {
        active: 0,
        list: [
            {
                icon: 'calender-o',
                text: '近期待办',
                url: '/pages/index/main'
            },
            {
                icon: 'todo-list-o',
                text: '待办事项',
                url: '/pages/index/index'
            },
            {
                icon: 'user-o',
                text: '个人中心',
                url: '/pages/user/main'
            }
        ]
    },

    methods: {
        onChange(event) {
            this.setData({ active: event.detail });
            wx.switchTab({
                url: this.data.list[event.detail].url
            });
        },

        init() {
            const page = getCurrentPages().pop();
            this.setData({
                active: this.data.list.findIndex(item => item.url === `/${page.route}`)
            });
        }
    }
});
