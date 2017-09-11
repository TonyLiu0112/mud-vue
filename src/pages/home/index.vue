<template>
  <div>
    <baseHeader>
      <div slot="content">
        <h2>{{ welcome }}！</h2>
      </div>
    </baseHeader>
    <button @click="getMsg">点我看美女</button>
    <div v-show="show">
      <img :src="img" />
    </div>
  </div>
</template>

<script>
  import baseHeader from '../../components/header.vue'

  const homeData = {
    welcome: '欢迎来到Microservice项目实战',
    img: '',
    show: false
  }

  export default {
    components: {baseHeader},
    name: 'home_index',
    data () {
      return homeData
    },
    methods: {
      goProduct: function () {
        this.$router.push('/product/detail')
      },
      getMsg: function () {
        fetch('http://localhost:18080/mud-web/m/ra/account/captcha')
          .then(res => res.json())
          .then(json => {
            homeData.show = true
            homeData.img = 'data:image/png;base64,' + json.data.base64Str
          })
      }
    }
  }
</script>
