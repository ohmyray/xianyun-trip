// user store
export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  }
})

export const mutations = {
  // 保存用户信息到 state
  setUserInfo(state, data) {
    state.userInfo = data
  }
}

export const actions = {
  // 登录
  login({ commit }, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then((res) => {
      const data = res.data
      // 保存到state
      commit('setUserInfo', data)
      return data
    })
  },

  // 验证码校验
  captcha(store, data) {
    return this.$axios({
      url: `/captchas`,
      method: 'POST',
      data
    }).then((res) => {
      return res
    })
  },

  // 注册
  register({ commit }, data) {
    return this.$axios({
      url: '/accounts/register',
      method: 'POST',
      data
    })
  }
}
