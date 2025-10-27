// index.js
const app = getApp();

Page({
  data: {
    currentChild: null,
    recentTransactions: [],
    loading: true
  },

  onLoad: function() {
    // 检查登录状态，如果未登录则跳转到登录页
    if (!app.globalData.isLoggedIn) {
      wx.redirectTo({
        url: '/pages/auth/login'
      });
      return;
    }
    
    this.loadData();
  },

  onShow: function() {
    // 每次页面显示时重新加载数据
    if (app.globalData.isLoggedIn) {
      this.loadData();
    }
  },

  // 加载首页数据
  loadData: function() {
    this.setData({
      loading: true
    });

    // 获取当前儿童信息
    const currentChild = app.globalData.currentChild;
    
    // 模拟最近交易数据
    const mockTransactions = [
      {
        id: '101',
        type: 'income',
        amount: 50,
        category: 'reward',
        categoryName: '奖励',
        description: '完成一周家务',
        date: '2023-09-15 18:30',
        icon: 'like'
      },
      {
        id: '102',
        type: 'expense',
        amount: 15,
        category: 'food',
        categoryName: '餐饮',
        description: '买冰淇淋',
        date: '2023-09-14 15:20',
        icon: 'coffee'
      },
      {
        id: '103',
        type: 'income',
        amount: 30,
        category: 'pocket_money',
        categoryName: '零花钱',
        description: '每周零花钱',
        date: '2023-09-10 09:00',
        icon: 'wallet'
      },
      {
        id: '104',
        type: 'expense',
        amount: 25,
        category: 'entertainment',
        categoryName: '娱乐',
        description: '看电影',
        date: '2023-09-08 19:30',
        icon: 'game'
      }
    ];

    setTimeout(() => {
      this.setData({
        currentChild: currentChild,
        recentTransactions: mockTransactions,
        loading: false
      });
    }, 500);
  },

  // 切换儿童
  onSwitchChild: function() {
    wx.navigateTo({
      url: '/pages/child/manage'
    });
  },

  // 添加交易记录
  onAddTransaction: function() {
    wx.navigateTo({
      url: '/pages/transaction/add'
    });
  },

  // 查看所有交易记录
  onViewAllTransactions: function() {
    wx.navigateTo({
      url: '/pages/transaction/list'
    });
  },

  // 查看统计报表
  onViewStatistics: function() {
    wx.navigateTo({
      url: '/pages/statistics/index'
    });
  },

  // 查看任务管理
  onViewTasks: function() {
    wx.navigateTo({
      url: '/pages/task/list'
    });
  }
})
