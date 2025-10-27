// manage.js
const app = getApp();

Page({
  data: {
    children: [],
    currentChildId: '',
    showAddChildDialog: false,
    newChild: {
      name: '',
      age: '',
      gender: 'male'
    }
  },

  onLoad: function() {
    this.loadChildren();
  },

  // 加载儿童列表
  loadChildren: function() {
    const children = app.globalData.children || [];
    const currentChildId = app.globalData.currentChild ? app.globalData.currentChild.id : '';
    
    this.setData({
      children: children,
      currentChildId: currentChildId
    });
  },

  // 选择当前儿童
  selectChild: function(e) {
    const childId = e.currentTarget.dataset.id;
    const selectedChild = this.data.children.find(child => child.id === childId);
    
    if (selectedChild) {
      // 更新全局选中的儿童
      app.setCurrentChild(selectedChild);
      
      // 更新当前页面数据
      this.setData({
        currentChildId: childId
      });
      
      // 提示选择成功
      wx.showToast({
        title: '已切换至' + selectedChild.name,
        icon: 'success',
        duration: 1500
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 显示添加儿童对话框
  showAddChildDialog: function() {
    this.setData({
      showAddChildDialog: true,
      newChild: {
        name: '',
        age: '',
        gender: 'male'
      }
    });
  },

  // 关闭添加儿童对话框
  closeAddChildDialog: function() {
    this.setData({
      showAddChildDialog: false
    });
  },

  // 输入儿童信息
  inputChildInfo: function(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`newChild.${field}`]: value
    });
  },

  // 选择性别
  selectGender: function(e) {
    const { gender } = e.currentTarget.dataset;
    this.setData({
      'newChild.gender': gender
    });
  },

  // 添加新儿童
  addChild: function() {
    const { name, age, gender } = this.data.newChild;
    
    // 验证输入
    if (!name || !age) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    
    if (isNaN(age) || age < 1 || age > 18) {
      wx.showToast({
        title: '请输入有效年龄',
        icon: 'none'
      });
      return;
    }
    
    // 创建新儿童对象
    const newChild = {
      id: Date.now().toString(), // 临时ID，实际应从服务器获取
      name: name,
      age: parseInt(age),
      gender: gender,
      avatar: '',
      balance: 0
    };
    
    // 添加到儿童列表
    const updatedChildren = [...this.data.children, newChild];
    
    // 更新数据
    this.setData({
      children: updatedChildren,
      showAddChildDialog: false
    });
    
    // 更新全局数据
    app.globalData.children = updatedChildren;
    app.setCurrentChild(newChild);
    
    // 提示添加成功
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
  },

  // 编辑儿童信息
  editChild: function(e) {
    const childId = e.currentTarget.dataset.id;
    // 这里可以实现编辑功能，暂时简化处理
    wx.showToast({
      title: '编辑功能开发中',
      icon: 'none'
    });
  },

  // 删除儿童
  deleteChild: function(e) {
    const childId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '删除后将无法恢复，确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          // 过滤掉要删除的儿童
          const updatedChildren = this.data.children.filter(child => child.id !== childId);
          
          // 更新数据
          this.setData({
            children: updatedChildren
          });
          
          // 更新全局数据
          app.globalData.children = updatedChildren;
          
          // 如果删除的是当前选中的儿童，重新设置当前儿童
          if (childId === this.data.currentChildId && updatedChildren.length > 0) {
            app.setCurrentChild(updatedChildren[0]);
          }
          
          // 提示删除成功
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
})