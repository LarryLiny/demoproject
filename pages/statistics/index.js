// index.js
const app = getApp();

Page({
  data: {
    currentChild: null,
    statistics: {
      income: 0,
      expense: 0,
      balance: 0
    },
    categoryData: [],
    timeRange: 'month', // day, week, month, year
    loading: true,
    chartWidth: 300,
    chartHeight: 200
  },

  onLoad: function() {
    // 获取屏幕宽度，设置图表尺寸
    const { windowWidth } = wx.getSystemInfoSync();
    this.setData({
      chartWidth: windowWidth - 32, // 减去左右padding
      chartHeight: 200
    });
    
    this.loadData();
  },

  onShow: function() {
    // 每次页面显示时重新加载数据
    this.setData({
      currentChild: app.globalData.currentChild
    });
    this.loadData();
  },

  // 加载统计数据
  loadData: function() {
    this.setData({
      loading: true,
      currentChild: app.globalData.currentChild
    });

    // 模拟统计数据
    setTimeout(() => {
      // 计算总收入、总支出和余额
      const mockStats = {
        income: 100,
        expense: 85,
        balance: this.data.currentChild?.balance || 0
      };

      // 模拟分类数据
      const mockCategoryData = [
        { name: '奖励', value: 50, color: '#52c41a' },
        { name: '零花钱', value: 30, color: '#1890ff' },
        { name: '餐饮', value: 15, color: '#ff4d4f' },
        { name: '娱乐', value: 25, color: '#faad14' },
        { name: '学习', value: 45, color: '#722ed1' }
      ];

      this.setData({
        statistics: mockStats,
        categoryData: mockCategoryData,
        loading: false
      });

      // 绘制图表
      this.drawCharts();
    }, 800);
  },

  // 绘制图表
  drawCharts: function() {
    // 注意：在实际应用中，应该使用wx-charts或echarts-for-weixin来绘制图表
    // 这里只是模拟图表功能，实际使用时需要集成相应的图表库
    console.log('绘制图表，分类数据:', this.data.categoryData);
  },

  // 切换时间范围
  changeTimeRange: function(e) {
    const timeRange = e.currentTarget.dataset.range;
    this.setData({
      timeRange: timeRange
    });
    this.loadData();
  },

  // 切换儿童
  switchChild: function() {
    wx.navigateTo({
      url: '/pages/child/manage'
    });
  },

  // 导出数据
  exportData: function() {
    wx.showToast({
      title: '导出功能开发中',
      icon: 'none'
    });
  },

  // 查看详细报表
  viewDetailedReport: function() {
    wx.showToast({
      title: '详细报表功能开发中',
      icon: 'none'
    });
  }
})