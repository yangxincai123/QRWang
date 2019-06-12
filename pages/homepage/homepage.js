// pages/homepage/homepage.js
var app = getApp();

var cid, offset, limit, loadMoreView, title, statusLayout, scenes;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdt_list: [],
    getImgURL: function (img_name) {
      console.log(img_name);
      return app.globalData.network.baseFileURL + app.globalData.network.pdtPhotoImgPath + name;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    offset = 0;
    loadMoreView = this.selectComponent("#loadMoreView");
    statusLayout = this.selectComponent("#statusLayout");
    cid = options.cid;
    title = options.title;
    scenes = options.scenes;
    wx.setNavigationBarTitle({
      title: "首页"
    });
    this.loadData(false);
  },
  loadData: function (loadMore) {
    var self = this;
    if(!loadMore) {
      this.offset = 0;
    }
    var param = {
      "pdt_type": "RMD",
      "only_banner": 0,
      "offset": this.offset,
      "limit": this.limit
    };
    var success = function (res) {
      var items = res.data.pdt_list;
      if (loadMore) {
        if (items.length > 0) {
          self.offset = self.offset + items.length;
          loadMoreView.loadMoreComplete(true);
        } else {
          loadMoreView.loadMoreComplete(false);
        }
        items = pdt_list.concat(items);
      } else {
        loadMoreView.loadMoreComplete(false);
      }
      self.setData({
        pdt_list: items
      })
      if (self.data.pdt_list.length == 0) {
        statusLayout.showEmpty()
      } else {
        statusLayout.showContent()
      }
    };
    var fail = function (err) {
      loadMore ? loadMoreView.loadMoreFail() : statusLayout.showError();
    }
    app.globalData.network.req("getPdtList", param, success, fail);
  },
  loadMoreListener: function (e) {
    this.loadData()
  },
  clickLoadMore: function (e) {
    this.loadData()
  },
  reload: function () {
    statusLayout.showLoading()
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    loadMoreView.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})