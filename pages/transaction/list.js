// list.js
const app = getApp();

Page({
  data: {
    transactions: [],
    currentChild: null,
    loading: true,
    filter: {
      type: 'all', // all, income, expense
      category: 'all',
      dateRange: 'all' // all, today, week, month, year
    },
    showFilter: false
  },

  onLoad: function() {
    this.setData({
      currentChild: app.globalData.currentChild
    });
    this.loadTransactions();
  },

  onShow: function() {
    // 每次页面显示时重新加载数据
    this.setData({
      currentChild: app.globalData.currentChild
    });
    this.loadTransactions();
  },

  // 加载交易记录
  loadTransactions: function() {
    this.setData({
      loading: true
    });

    // 模拟交易数据
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
      },
      {
        id: '105',
        type: 'expense',
        amount: 45,
        category: 'study',
        categoryName: '学习',
        description: '购买学习资料',
        date: '2023-09-05 14:15',
        icon: 'book'
      },
      {
        id: '106',
        type: 'income',
        amount: 20,
        category: 'reward',
        categoryName: '奖励',
        description: '考试进步',
        date: '2023-09-01 10:30',
        icon: 'like'
      }
    ];

    // 应用过滤条件
    const filteredTransactions = this.filterTransactions(mockTransactions);

    // 按日期排序（最新的在前）
    filteredTransactions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    setTimeout(() => {
      this.setData({
        transactions: filteredTransactions,
        loading: false
      });
    }, 500);
  },

  // 过滤交易记录
  filterTransactions: function(transactions) {
    const { type, category, dateRange } = this.data.filter;
    let filtered = [...transactions];

    // 按类型过滤
    if (type !== 'all') {
      filtered = filtered.filter(t => t.type === type);
    }

    // 按分类过滤
    if (category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }

    // 按日期范围过滤
    if (dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        
        switch (dateRange) {
          case 'today':
            return transactionDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return transactionDate >= weekAgo;
          case 'month':
            return transactionDate.getFullYear() === now.getFullYear() &&
                  transactionDate.getMonth() === now.getMonth();
          case 'year':
            return transactionDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    return filtered;
  },

  // 显示过滤器
  showFilter: function() {
    this.setData({
      showFilter: true
    });
  },

  // 关闭过滤器
  closeFilter: function() {
    this.setData({
      showFilter: false
    });
  },

  // 切换交易类型过滤
  changeTypeFilter: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      'filter.type': type
    });
    this.loadTransactions();
  },

  // 切换日期范围过滤
  changeDateFilter: function(e) {
    const dateRange = e.currentTarget.dataset.range;
    this.setData({
      'filter.dateRange': dateRange
    });
    this.loadTransactions();
  },

  // 重置过滤器
  resetFilter: function() {
    this.setData({
      filter: {
        type: 'all',
        category: 'all',
        dateRange: 'all'
      }
    });
    this.loadTransactions();
  },

  // 添加交易记录
  addTransaction: function() {
    wx.navigateTo({
      url: '/pages/transaction/add'
    });
  },

  // 查看交易详情
  viewTransactionDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    // 这里可以实现查看交易详情的功能，暂时简化处理
    wx.showToast({
      title: '查看详情功能开发中',
      icon: 'none'
    });
  },

  // 编辑交易记录
  editTransaction: function(e) {
    const id = e.currentTarget.dataset.id;
    // 这里可以实现编辑交易记录的功能，暂时简化处理
    wx.navigateTo({
      url: `/pages/transaction/add?id=${id}`
    });
  },

  // 删除交易记录
  deleteTransaction: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          // 过滤掉要删除的记录
          const updatedTransactions = this.data.transactions.filter(t => t.id !== id);
          
          this.setData({
            transactions: updatedTransactions
          });
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 切换儿童
  switchChild: function() {
    wx.navigateTo({
      url: '/pages/child/manage'
    });
  }
})