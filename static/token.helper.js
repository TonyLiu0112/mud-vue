import router from '../src/router'

const token = {
  get: function () {
    const token = window.localStorage.token
    if (token) {
      return token
    }
    router.push('/security/login')
    throw new Error('您还未登录')
  }
}

export default {
  token
}
