// index.js
const app = getApp();

Page({
  data: {
    currentChild: null,
    tasks: [],
    completedTasks: [],
    activeTab: 'todo', // todo, completed
    loading: true,
    showAddModal: false,
    newTask: {
      title: '',
      reward: '',
      description: '',
      deadline: ''
    }
  },

  onLoad: function() {
    this.loadData();
  },

  onShow: function() {
    // 每次页面显示时重新加载数据
    this.setData({
      currentChild: app.globalData.currentChild
    });
    this.loadData();
  },

  // 加载任务数据
  loadData: function() {
    this.setData({
      loading: true,
      currentChild: app.globalData.currentChild
    });

    // 模拟任务数据
    setTimeout(() => {
      // 模拟待完成任务
      const mockTasks = [
        {
          id: '1',
          title: '完成作业',
          reward: 5,
          description: '完成本周全部家庭作业',
          deadline: '2023-12-25',
          status: 'todo',
          createTime: '2023-12-20'
        },
        {
          id: '2',
          title: '整理房间',
          reward: 3,
          description: '把自己的房间打扫干净，整理物品',
          deadline: '2023-12-26',
          status: 'todo',
          createTime: '2023-12-20'
        },
        {
          id: '3',
          title: '阅读30分钟',
          reward: 2,
          description: '每天阅读课外书30分钟',
          deadline: '2023-12-27',
          status: 'todo',
          createTime: '2023-12-20'
        }
      ];

      // 模拟已完成任务
      const mockCompletedTasks = [
        {
          id: '4',
          title: '洗碗',
          reward: 2,
          description: '帮忙洗碗并清理厨房',
          deadline: '2023-12-15',
          status: 'completed',
          createTime: '2023-12-10',
          completeTime: '2023-12-12'
        },
        {
          id: '5',
          title: '遛狗',
          reward: 1,
          description: '带狗狗出门散步15分钟',
          deadline: '2023-12-18',
          status: 'completed',
          createTime: '2023-12-16',
          completeTime: '2023-12-17'
        }
      ];

      this.setData({
        tasks: mockTasks,
        completedTasks: mockCompletedTasks,
        loading: false
      });
    }, 800);
  },

  // 切换标签页
  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  // 打开添加任务对话框
  openAddModal: function() {
    this.setData({
      showAddModal: true,
      newTask: {
        title: '',
        reward: '',
        description: '',
        deadline: ''
      }
    });
  },

  // 关闭添加任务对话框
  closeAddModal: function() {
    this.setData({
      showAddModal: false
    });
  },

  // 输入任务信息
  inputTaskInfo: function(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`newTask.${field}`]: value
    });
  },

  // 添加任务
  addTask: function() {
    const { title, reward, description, deadline } = this.data.newTask;
    
    // 验证输入
    if (!title || !reward || !deadline) {
      wx.showToast({
        title: '请填写必要信息',
        icon: 'none'
      });
      return;
    }

    // 添加新任务
    const newTask = {
      id: Date.now().toString(),
      title: title,
      reward: parseFloat(reward),
      description: description || '',
      deadline: deadline,
      status: 'todo',
      createTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      tasks: [newTask, ...this.data.tasks],
      showAddModal: false
    });

    wx.showToast({
      title: '任务添加成功',
      icon: 'success'
    });
  },

  // 完成任务
  completeTask: function(e) {
    const { id } = e.currentTarget.dataset;
    
    // 更新任务状态
    const updatedTasks = this.data.tasks.filter(task => task.id !== id);
    const completedTask = this.data.tasks.find(task => task.id === id);
    
    if (completedTask) {
      completedTask.status = 'completed';
      completedTask.completeTime = new Date().toISOString().split('T')[0];
      
      this.setData({
        tasks: updatedTasks,
        completedTasks: [completedTask, ...this.data.completedTasks]
      });
      
      // 模拟发放奖励（在实际应用中，这里应该调用API来更新余额）
      if (this.data.currentChild) {
        const newBalance = this.data.currentChild.balance + completedTask.reward;
        
        // 更新全局状态
        app.globalData.currentChild.balance = newBalance;
        
        // 显示奖励发放提示
        wx.showToast({
          title: `已发放${completedTask.reward}元奖励`,
          icon: 'success'
        });
      }
    }
  },

  // 删除任务
  deleteTask: function(e) {
    const { id } = e.currentTarget.dataset;
    const { tab } = e.currentTarget.dataset;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个任务吗？',
      success: (res) => {
        if (res.confirm) {
          if (tab === 'todo') {
            this.setData({
              tasks: this.data.tasks.filter(task => task.id !== id)
            });
          } else {
            this.setData({
              completedTasks: this.data.completedTasks.filter(task => task.id !== id)
            });
          }
          
          wx.showToast({
            title: '任务已删除',
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