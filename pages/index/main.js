Page({
    data: {
        showLoading:true,
        option1: [
            { text: '全部事项', value: 0 },
            { text: '计划A', value: 1 },
            { text: '计划B', value: 2 }
        ],
        option2: [
            { text: '全部显示', value: 'a' },
            { text: '未完成', value: 'b' },
            { text: '已完成', value: 'c' }
        ],
        value1: 0,
        value2: 'a',
        calendarConfig: {
            multi: true, // 是否开启多选,
            theme: 'elegant', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
            showLunar: true, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
            inverse: false, // 单选模式下是否支持取消选中,
            chooseAreaMode: true, // 开启日期范围选择模式，该模式下只可选择时间段
            markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
            defaultDay: false, // 默认选中指定某天；当为 boolean 值 true 时则默认选中当天，非真值则在初始化时不自动选中日期，
            highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
            takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中），配合 onTapDay() 使用
            preventSwipe: false, // 是否禁用日历滑动切换月份
            firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
            onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
            hideHeadOnWeekMode: false, // 周视图模式是否隐藏日历头部
            showHandlerOnWeekMode: true, // 周视图模式是否显示日历头部操作栏，hideHeadOnWeekMode 优先级高于此配置
        }
    },
    onLoad: function (options) {
        this.showLoading();
        //Pull data

    },
    onShow: function(){
        this.cancelLoading();
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
    afterCalendarRender(e) {
        this.calendar.setTodoLabels({
            // 待办点标记设置
            pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
            dotColor: '#40', // 待办点标记颜色
            circle: true, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
            showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
            days: [
                {
                    year: 2020,
                    month: 4,
                    day: 1,
                    todoText: '待办'
                },
                {
                    year: 2020,
                    month: 4,
                    day: 15
                }
            ]
        });
    }
});
