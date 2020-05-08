import drawQrcode from '../../../utils/weapp.qrcode.js'

Component({
  behaviors: [],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    isDraw: {
      type: String,
      value: true,
      observer: function(newVal, oldVal) {
        console.log(newVal)
        drawQrcode({
          width: 130,
          height: 130,
          canvasId: 'qrcodePro',
          text: newVal.toString(),
          _this: this
        })
      }
    }
  },
  data: {
  },

  attached: function () {
  },
  ready: function () {
    /*drawQrcode({
      width: 80,
      height: 80,
      canvasId: 'qrcodePro',
      text: 'test drawQrcode in component',
      _this: this
    })*/
  },
  moved: function () {},
  detached: function () {},

  methods: {
    download: () => {
      wx.canvasToTempFilePath({
        canvasId: 'qrcodePro',
        success(res) {
          console.log('图片的临时路径为：', res.tempFilePath)
          let tempFilePath = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: function (res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (res) {
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      })
    },
  },

})
