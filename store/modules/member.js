// store/modules/member.js
export default {
  namespaced: true,
  state: () => ({
    profile: JSON.parse(uni.getStorageSync('profile') || 'null'), // 从字符串解析回对象
  }),
  mutations: {
    SET_PROFILE(state, profile) {
      state.profile = profile;
      uni.setStorageSync('profile', JSON.stringify(profile)); // 将对象转换为字符串进行存储
    },
    CLEAR_PROFILE(state) {
      state.profile = null;
      uni.removeStorageSync('profile');
    }
  },
  actions: {
    setProfile({ commit }, profile) {
      commit('SET_PROFILE', profile);
    },
    clearProfile({ commit }) {
      commit('CLEAR_PROFILE');
    }
  },
  getters: {
    profile: (state) => state.profile,
  }
};
