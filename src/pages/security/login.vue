<template>
  <div id="login">
    <div>
      <h1>用户登录</h1>
    </div>
    <form>
      <div>
        <p>
          <label>用户名</label>
          <input type="text" v-model="loginReq.loginName" placeholder="请输入用户名"/>
        </p>
        <p>
          <label>密 码</label>
          <input type="password" v-model="loginReq.password" placeholder="请输入密码"/>
        </p>
      </div>
      <div id="msg" v-if="showMsg" style="color: red;">
        {{ errorMsg }}
      </div>
      <div>
        <input type="button" @click="doLogin" value="登录"/>
      </div>
    </form>
  </div>
</template>

<script>
  import _content from '../../../static/content'

  export default {
    name: 'login',
    data () {
      return {
        loginReq: {
          loginName: '',
          password: ''
        },
        showMsg: false,
        errorMsg: '用户名或密码错误'
      }
    },
    methods: {
      doLogin: function () {
        if (this.verify()) {
          alert('请输入信息')
          return
        }
        const ops = {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginReq)
        }
        fetch(_content.API_PATH.URI + 'security/tokens', ops)
          .then(response => {
            const status = response.status
            if (status === 201) {
              return response.json()
            }
            if (status === 501) {
              this.errorMsg = '用户名或密码错误!'
              this.showMsg = true
            }
            if (status === 500) {
              this.errorMsg = '服务不可用，请和管理员联系!'
              this.showMsg = true
            }
            throw Error(response.statusText)
          })
          .then(json => {
            window.localStorage.token = json.data.access_token
            this.$router.push('/')
          })
          .catch(error => {
            console.error(error)
          })
      },
      verify: function () {
        return this.loginReq.loginName.trim() === '' || this.loginReq.password.trim() === ''
      }
    }
  }
</script>
