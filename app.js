// app.js
App({
  onLaunch: function() {
    // 全局配置
    this.globalData = {
      userInfo: null,
      isLoggedIn: false,
      currentChild: null,
      children: [],
      // 交易分类配置
      categories: {
        income: [
          { id: 'pocket_money', name: '零花钱', icon: 'wallet' },
          { id: 'reward', name: '奖励', icon: 'like' },
          { id: 'gift', name: '礼金', icon: 'gift' },
          { id: 'other_income', name: '其他', icon: 'circle' }
        ],
        expense: [
          { id: 'food', name: '餐饮', icon: 'coffee' },
          { id: 'entertainment', name: '娱乐', icon: 'game' },
          { id: 'shopping', name: '购物', icon: 'cart' },
          { id: 'study', name: '学习', icon: 'book' },
          { id: 'other_expense', name: '其他', icon: 'circle' }
        ]
      }
    };

    // 检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
      // 如果已登录，加载儿童信息
      this.loadChildrenInfo();
    }
  },

  // 加载儿童信息
  loadChildrenInfo: function() {
    // 模拟数据，实际应从云数据库获取
    const mockChildren = [
      { id: '1', name: '小明', age: 8, gender: 'male', avatar: '', balance: 250.50 },
      { id: '2', name: '小红', age: 6, gender: 'female', avatar: '', balance: 180.75 }
    ];
    this.globalData.children = mockChildren;
    this.globalData.currentChild = mockChildren[0];
  },

  // 设置当前选中的儿童
  setCurrentChild: function(child) {
    this.globalData.currentChild = child;
  },

  // 全局错误处理
  onError: function(error) {
    console.error('小程序错误:', error);
    wx.showToast({
      title: '系统错误，请稍后重试',
      icon: 'none'
    });
  }
})
