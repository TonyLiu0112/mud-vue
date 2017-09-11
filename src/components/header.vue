<template>
  <div>
    <header>
      <div id="content">
        <!-- 简单搜索栏 -->
        <label>
          <input v-model="searchVal" placeholder="请输入您好搜索的内容"/>
        </label>
        <button @click="doSearch">搜索</button>
        <button @click="goHome">Home</button>

        <div>
          <!-- 快速连接 -->
          <a href="javascript:void(0);" style="color: #7dacda">我的亚马逊</a>
          <a href="javascript:void(0);" style="color: #7dacda">Z秒杀</a>
          <a href="javascript:void(0);" style="color: #7dacda">礼品卡</a>
          <a href="javascript:void(0);" style="color: #7dacda">我要开店</a>
          <a href="javascript:void(0);" style="color: #7dacda">海外购</a>
          <a href="javascript:void(0);" style="color: #7dacda">帮助</a>
          <a href="javascript:void(0);" style="color: #7dacda">In English</a>

          <!-- 用户信息 -->
          <a v-if="isLogin">您好: {{ userName }}</a>
          <a v-else="isLogin">
            您好: {{ userName }}
            <button @click="goLogin">登录</button>
          </a>

          <!-- 购物车信息 -->
          <sci></sci>
        </div>
      </div>
      <br/>
    </header>
    <div id="contents">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
  import sci from '../pages/shoppingcard/sci.vue'

  export default {
    components: {sci},
    name: 'base_header',
    data () {
      return {
        searchVal: '',
        isLogin: false,
        userName: '游客'
      }
    },
    methods: {
      goLogin: function () {
        this.$router.push('/security/login')
      },
      goHome: function () {
        this.$router.push('/')
      },
      doSearch: function () {
        this.$router.push('/product/detail')
      }
    }
  }
</script>
