<template>
  <div>
    <header>
      <div id="content">
        <!-- 简单搜索栏 -->
        <label>
          <input v-model="searchVal" placeholder="请输入您好搜索的内容"/>
        </label>
        <button @click="search">搜索</button>
        <button @click="goHome">Home</button>

        <div>
          <!-- 用户信息 -->
          <a v-if="isLogin">您好: {{ userName }}</a>
          <a v-else="isLogin">
            您好: {{ userName }}
            <button @click="goLogin">登录</button>
          </a>

          <!-- 购物车信息 -->
          <market></market>
        </div>
      </div>
      <br/>
    </header>
  </div>
</template>
<script>
  import market from '../pages/shoppingcard/market.vue'

  const headDate = {
    searchVal: '',
    isLogin: false,
    id: 0,
    userName: '游客'
  }
  export default {
    components: {market},
    name: 'base_header',
    data () {
      return headDate
    },
    methods: {
      goLogin: function () {
        this.$router.push('/security/login')
      },
      goHome: function () {
        this.$router.push('/')
      },
      search: function () {
        this.$router.push({path: '/product/list', query: {searchContent: this.searchVal}})
      },
      _initUserInfo: function () {
        const user = JSON.parse(window.localStorage.user)
        headDate.id = user.id
        headDate.userName = user.nickname
        headDate.isLogin = true
      }
    },
    mounted: function () {
      this._initUserInfo()
    }
  }
</script>
