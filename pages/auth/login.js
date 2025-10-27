// login.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loading: false
  },

  onLoad: function() {
    // 检查是否已经登录
    if (app.globalData.isLoggedIn) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  // 获取用户信息
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.setData({
        loading: true
      });

      // 保存用户信息到全局和本地存储
      const userInfo = {
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        gender: e.detail.userInfo.gender,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city,
        country: e.detail.userInfo.country
      };

      // 模拟登录请求
      setTimeout(() => {
        // 保存用户信息
        wx.setStorageSync('userInfo', userInfo);
        app.globalData.userInfo = userInfo;
        app.globalData.isLoggedIn = true;
        
        // 加载儿童信息
        app.loadChildrenInfo();

        // 登录成功，跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        });

        this.setData({
          loading: false
        });
      }, 1000);
    }
  },

  // 游客模式登录（模拟数据，用于演示）
  guestLogin: function() {
    this.setData({
      loading: true
    });

    // 模拟游客登录
    setTimeout(() => {
      const guestInfo = {
        nickName: '游客用户',
        avatarUrl: '',
        gender: 0,
        province: '',
        city: '',
        country: ''
      };

      // 保存游客信息
      wx.setStorageSync('userInfo', guestInfo);
      app.globalData.userInfo = guestInfo;
      app.globalData.isLoggedIn = true;
      
      // 加载儿童信息
      app.loadChildrenInfo();

      // 登录成功，跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });

      this.setData({
        loading: false
      });
    }, 1000);
  }
})