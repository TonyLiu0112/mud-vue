<template>
  <div id="login">
    <div>
      <h1>用户登录</h1>
    </div>
    <form>
      <div>
        <p>
          <label>用户名</label>
          <input type="text" placeholder="请输入用户名"/>
        </p>
        <p>
          <label>密 码</label>
          <input type="password" placeholder="请输入密码"/>
        </p>
      </div>
      <div>
        <button type="submit" @click.once="doLogin">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      doLogin: function () {
        console.log('doLogin...')
      }
    }
  }
</script>
