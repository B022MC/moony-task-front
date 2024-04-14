import Vue from 'vue'
import Vuex from 'vuex'
import member from './modules/member' // 确保路径正确

Vue.use(Vuex)
const baseUrl = 'http://47.108.74.228:50002'
const store = new Vuex.Store({
  state: {
	  isLogged: false,
    sysNav: {}, // 系统状态栏或导航栏高度
    currentCity: '', // 当前城市
	//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
	saveAllList:[],
	userInfo: {},
	agreementList: {
		user: baseUrl + '/h5/user.html', //服务协议 用户协议
		provacy: baseUrl + '/h5/provacy.html', //隐私政策
		sdk: baseUrl + '/h5/sdk_list.html', //SDK目录
		authority: baseUrl + '/h5/permission.html', //权限说明
	},
  },
  mutations: {
    // 设置导航栏高度
    SET_SYSTEM_NAV(state, value) {
      state.sysNav = value
    },
   
	// 新增 mutation 用于更新 userInfo
	SET_USER_INFO(state, userInfo) {
	  state.userInfo = userInfo;
	  state.isLogged = !!userInfo; // 如果 userInfo 不为空，则认为已登录
	},
	SET_USER_RESUME(state, resume) {
	    state.userResume = resume;
	},
	updateLoginState(state, isLogged) {
	       state.isLogged = isLogged;
	}
  },
  actions: {
	fetchUserResume({ commit }, data) {
	  // 调用封装在 $api 中的方法
	  this.$api.fetchUserResume(data).then(response => {
	    commit('SET_USER_RESUME', response.data); // response.data 是我们需要的简历信息
	  }).catch(error => {
	    console.error('请求用户简历失败:', error);
	  });
	},  
	loginSuccess({ commit }, userInfo) {
	      commit('SET_USER_INFO', userInfo);
	      commit('updateLoginState', true);
	      // 保存到本地存储
	      uni.setStorageSync('UserInfo', JSON.stringify(userInfo));
	      uni.setStorageSync('isLogged', true);
	    },
    /* 获取系统状态栏高度 */
    GetSystemInfo({ commit }) {
      const data = {}
      // #ifdef MP-WEIXIN
      const nav = uni.getMenuButtonBoundingClientRect()
      data.top = nav.top
      data.height = nav.height
      // #endif
      
      // #ifdef H5
      data.top = 0
      data.height = 0
      // #endif
      commit('SET_SYSTEM_NAV', data) // 设置设备类型
    },
    GetCurrentCity({ commit }) {
      uni.getStorage({
          key: 'location',
          success: (res) => {
              if (res.data) {
                  // 成功获取到位置信息，现在发送给后端
                  // this.getLocation(res.data);
      			this.currentCity = res.data.address_component.city
              } else {
                  console.error('位置信息不存在');
              }
          },
          fail: (err) => {
              console.error('获取存储的位置信息失败', err);
          }
      });
    }
  },
  getters: {
    sysNav: state => state.sysNav,
    city: state => state.currentCity,
  },
  modules: {
    member
  }
})

export default store;
