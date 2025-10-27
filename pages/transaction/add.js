// add.js
const app = getApp();

Page({
  data: {
    transaction: {
      type: 'expense', // expense or income
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().substr(0, 16) // YYYY-MM-DD HH:MM format
    },
    currentChild: null,
    categories: {
      income: [],
      expense: []
    },
    editingId: null,
    loading: false
  },

  onLoad: function(options) {
    // 检查是否是编辑模式
    if (options.id) {
      this.setData({
        editingId: options.id
      });
      // 在实际应用中，这里应该从数据库获取要编辑的交易记录
    }

    this.setData({
      currentChild: app.globalData.currentChild,
      categories: app.globalData.categories
    });

    // 设置默认分类
    if (app.globalData.categories[this.data.transaction.type] && app.globalData.categories[this.data.transaction.type].length > 0) {
      this.setData({
        'transaction.category': app.globalData.categories[this.data.transaction.type][0].id
      });
    }
  },

  // 切换交易类型
  switchTransactionType: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      'transaction.type': type,
      'transaction.category': '' // 重置分类，需要重新选择
    });

    // 设置新类型的默认分类
    if (this.data.categories[type] && this.data.categories[type].length > 0) {
      this.setData({
        'transaction.category': this.data.categories[type][0].id
      });
    }
  },

  // 输入金额
  inputAmount: function(e) {
    let value = e.detail.value;
    // 只允许输入数字和小数点，且小数点后最多两位
    value = value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    this.setData({
      'transaction.amount': value
    });
  },

  // 选择分类
  selectCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      'transaction.category': category
    });
  },

  // 输入描述
  inputDescription: function(e) {
    this.setData({
      'transaction.description': e.detail.value
    });
  },

  // 选择日期时间
  selectDateTime: function(e) {
    this.setData({
      'transaction.date': e.detail.value
    });
  },

  // 保存交易记录
  saveTransaction: function() {
    const { type, amount, category, description, date } = this.data.transaction;
    
    // 验证输入
    if (!amount || parseFloat(amount) <= 0) {
      wx.showToast({
        title: '请输入有效的金额',
        icon: 'none'
      });
      return;
    }
    
    if (!category) {
      wx.showToast({
        title: '请选择分类',
        icon: 'none'
      });
      return;
    }
    
    if (!description.trim()) {
      wx.showToast({
        title: '请输入描述',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      loading: true
    });

    // 获取分类名称
    const categoryObj = this.data.categories[type].find(cat => cat.id === category);
    const categoryName = categoryObj ? categoryObj.name : '';
    
    // 构建交易记录对象
    const transactionRecord = {
      id: this.data.editingId || Date.now().toString(),
      type: type,
      amount: parseFloat(amount),
      category: category,
      categoryName: categoryName,
      description: description.trim(),
      date: date,
      childId: this.data.currentChild.id,
      createdAt: new Date().toISOString()
    };

    // 模拟保存操作
    setTimeout(() => {
      // 在实际应用中，这里应该保存到数据库
      
      // 更新儿童余额
      if (type === 'income') {
        this.data.currentChild.balance += parseFloat(amount);
      } else {
        this.data.currentChild.balance -= parseFloat(amount);
      }
      
      // 更新全局儿童数据
      app.globalData.currentChild = this.data.currentChild;
      
      // 显示成功提示
      wx.showToast({
        title: this.data.editingId ? '修改成功' : '添加成功',
        icon: 'success'
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1000);
  },

  // 取消操作
  cancel: function() {
    wx.navigateBack();
  }
})